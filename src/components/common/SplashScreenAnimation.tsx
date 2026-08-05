import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import { Animated, Dimensions, Easing, StyleSheet, View } from "react-native";
import Svg, { Circle, Defs, RadialGradient, Stop } from "react-native-svg";
import { AppLogo } from "../../assets/svg/SvgIcons";
import { theme } from "../../utils/theme/Theme";

import { useDispatch } from "react-redux";
import { GetCategories, loadAppData } from "@/redux/actions";
import type { AppDispatch } from "@/redux/store";

const { width, height } = Dimensions.get("window");
const TRACK_WIDTH = width * 0.6;
const LOADING_DURATION = 3000;
const FADE_DURATION = 600;

// Start well above the top edge of the screen so the logo is fully
// off-screen before it begins falling — guarantees it "enters" from
// the top no matter what screen size / logo resting position is.
const DROP_HEIGHT = height;

// how long the drop + bounce animation takes before the logo settles
const DROP_DURATION = 1600;

// size of the radial glow square behind the icon — feathers out to nothing at the edge
const GLOW_SIZE = 100;

const SplashScreenAnimation = () => {
  const route = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const progress = useRef(new Animated.Value(0)).current;
  const screenOpacity = useRef(new Animated.Value(1)).current;

  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoTranslateY = useRef(new Animated.Value(-DROP_HEIGHT)).current;
  const logoSquash = useRef(new Animated.Value(1)).current; // scaleX/Y for a little "impact" squash

  // radial glow behind the icon — fades in once the bounce settles,
  // then shimmers very gently (low amplitude, slow, not a hard blink)
  const glowOpacity = useRef(new Animated.Value(0)).current;
  const glowShimmer = useRef(new Animated.Value(0)).current;

  const textOpacity = useRef(new Animated.Value(0)).current;
  const textTranslateY = useRef(new Animated.Value(8)).current;

  useEffect(() => {
    const appDataPromise = dispatch(loadAppData()).unwrap();
    Animated.parallel([
      // logo fades in fast — the drop itself is the star of the show
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 200,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      // the "ball drop" — falls from above the screen and bounces to a stop
      Animated.timing(logoTranslateY, {
        toValue: 0,
        duration: DROP_DURATION,
        easing: Easing.bounce,
        useNativeDriver: true,
      }),
      // squash/stretch pulse timed to the first impact for extra "weight"
      Animated.sequence([
        Animated.delay(1080), // roughly when it first touches down
        Animated.timing(logoSquash, {
          toValue: 1.18,
          duration: 90,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(logoSquash, {
          toValue: 1,
          duration: 200,
          easing: Easing.out(Easing.elastic(2)),
          useNativeDriver: true,
        }),
      ]),
      // radial glow: fades in softly right as the bounce settles,
      // then shimmers with a slow, small, continuous opacity breathe
      Animated.sequence([
        Animated.delay(DROP_DURATION - 100),
        Animated.timing(glowOpacity, {
          toValue: 1,
          duration: 500,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.loop(
          Animated.sequence([
            Animated.timing(glowShimmer, {
              toValue: 1,
              duration: 2200,
              easing: Easing.inOut(Easing.sin),
              useNativeDriver: true,
            }),
            Animated.timing(glowShimmer, {
              toValue: 0,
              duration: 2200,
              easing: Easing.inOut(Easing.sin),
              useNativeDriver: true,
            }),
          ]),
        ),
      ]),
      Animated.timing(textOpacity, {
        toValue: 1,
        duration: 600,
        delay: 1250,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(textTranslateY, {
        toValue: 0,
        duration: 600,
        delay: 1250,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start();

    Animated.timing(progress, {
      toValue: 1,
      duration: LOADING_DURATION,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false,
    }).start(() => {
      Animated.timing(screenOpacity, {
        toValue: 0,
        duration: FADE_DURATION,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start(async () => {
        const appData = await appDataPromise;
        // await dispatch(GetCategories()).unwrap();
        if (appData.currentUser) {
          route.replace("/(tabs)");
        } else if (appData.getStartedCompleted) {
          route.replace("/loginScreen");
        } else {
          route.replace("/(stackScreens)/getStartedScreen");
        }
      });
    });
  }, []);

  const progressWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, TRACK_WIDTH],
  });

  // shimmer stays subtle: opacity only breathes between 0.8 and 1 of the base glow
  const shimmerOpacity = glowShimmer.interpolate({
    inputRange: [0, 1],
    outputRange: [0.8, 1],
  });

  return (
    <Animated.View style={[styles.container, { opacity: screenOpacity }]}>
      <View style={styles.logoWrapper}>
        {/* true radial glow — soft feathered falloff, matches the reference image */}
        <Animated.View
          pointerEvents="none"
          style={[
            styles.glow,
            {
              opacity: Animated.multiply(glowOpacity, shimmerOpacity),
            },
          ]}
        >
          <Svg
            width={GLOW_SIZE}
            height={GLOW_SIZE}
            viewBox={`0 0 ${GLOW_SIZE} ${GLOW_SIZE}`}
          >
            <Defs>
              <RadialGradient id="glowGradient" cx="50%" cy="50%" r="50%">
                <Stop
                  offset="0%"
                  stopColor={theme.colors.primary}
                  stopOpacity={0.5}
                />
                <Stop
                  offset="45%"
                  stopColor={theme.colors.primary}
                  stopOpacity={0.22}
                />
                <Stop
                  offset="100%"
                  stopColor={theme.colors.primary}
                  stopOpacity={0}
                />
              </RadialGradient>
            </Defs>
            <Circle
              cx={GLOW_SIZE / 2}
              cy={GLOW_SIZE / 2}
              r={GLOW_SIZE / 2}
              fill="url(#glowGradient)"
            />
          </Svg>
        </Animated.View>

        <Animated.View
          style={[
            styles.logoInner,
            {
              opacity: logoOpacity,
              transform: [
                { translateY: logoTranslateY },
                { scaleX: logoSquash },
                {
                  scaleY: logoSquash.interpolate({
                    inputRange: [1, 1.18],
                    outputRange: [1, 0.82], // flattens vertically on impact
                  }),
                },
              ],
            },
          ]}
        >
          <AppLogo />
        </Animated.View>
      </View>

      <Animated.Text
        style={[
          styles.title,
          { opacity: textOpacity, transform: [{ translateY: textTranslateY }] },
        ]}
      >
        SkillZen
      </Animated.Text>
      <Animated.Text
        style={[
          styles.subtitle,
          { opacity: textOpacity, transform: [{ translateY: textTranslateY }] },
        ]}
      >
        Code. Learn. Master.
      </Animated.Text>

      <View style={styles.progressTrack}>
        <Animated.View
          style={[styles.progressFill, { width: progressWidth }]}
        />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: "center",
    alignItems: "center",
  },
  logoWrapper: {
    marginBottom: theme.spacing.lg,
    justifyContent: "center",
    alignItems: "center",
  },
  logoInner: {
    zIndex: 1,
  },
  glow: {
    position: "absolute",
    width: GLOW_SIZE,
    height: GLOW_SIZE,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: theme.colors.text,
    fontSize: theme.fontSize.heading,
    fontWeight: "700",
  },
  subtitle: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSize.small,
    marginTop: theme.spacing.xs,
    marginBottom: theme.spacing.xl,
  },
  progressTrack: {
    width: TRACK_WIDTH,
    height: 4,
    backgroundColor: theme.colors.divider,
    borderRadius: theme.radius.xs,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.xs,
  },
});

export default SplashScreenAnimation;
