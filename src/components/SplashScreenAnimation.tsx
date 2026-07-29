import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import { Animated, Dimensions, Easing, StyleSheet, Text, View } from "react-native";
import { AppLogo } from "../assets/svg/SvgIcons";
import { theme } from "../utils/theme/Theme"

const { width } = Dimensions.get("window");
const TRACK_WIDTH = width * 0.6;
const LOADING_DURATION = 3000;
const FADE_DURATION = 600;

const SplashScreenAnimation = () => {
  const route = useRouter();
  const progress = useRef(new Animated.Value(0)).current;
  const screenOpacity = useRef(new Animated.Value(1)).current;

  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(40)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const textTranslateY = useRef(new Animated.Value(8)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 900,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(logoScale, {
        toValue: 1,
        duration: 900,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(textOpacity, {
        toValue: 1,
        duration: 600,
        delay: 350,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(textTranslateY, {
        toValue: 0,
        duration: 600,
        delay: 350,
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
          { opacity: logoOpacity, transform: [{ scale: logoScale }] },
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
        SZ Learn
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
        <Animated.View style={[styles.progressFill, { width: progressWidth }]} />
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