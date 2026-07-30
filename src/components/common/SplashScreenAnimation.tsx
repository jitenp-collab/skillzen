import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import {
    Animated,
    Dimensions,
    Easing,
    StyleSheet,
    View
} from "react-native";
import { AppLogo } from "../../assets/svg/SvgIcons";
import { theme } from "../../utils/theme/Theme";

const { width, height } = Dimensions.get("window");
const TRACK_WIDTH = width * 0.6;
const LOADING_DURATION = 3000;
const FADE_DURATION = 600;

// Start well above the top edge of the screen so the logo is fully
// off-screen before it begins falling — guarantees it "enters" from
// the top no matter what screen size / logo resting position is.
const DROP_HEIGHT = height;

const SplashScreenAnimation = () => {
  const route = useRouter();
  const progress = useRef(new Animated.Value(0)).current;
  const screenOpacity = useRef(new Animated.Value(1)).current;

  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoTranslateY = useRef(new Animated.Value(-DROP_HEIGHT)).current;
  const logoSquash = useRef(new Animated.Value(1)).current; // scaleX/Y for a little "impact" squash

  const textOpacity = useRef(new Animated.Value(0)).current;
  const textTranslateY = useRef(new Animated.Value(8)).current;

  useEffect(() => {
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
        duration: 1600,
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
      }).start(() => {
        route.replace("/(stackScreens)/getStartedScreen");
      });
    });
  }, []);

  const progressWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, TRACK_WIDTH],
  });

  return (
    <Animated.View style={[styles.container, { opacity: screenOpacity }]}>
      <Animated.View
        style={[
          styles.logoWrapper,
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
