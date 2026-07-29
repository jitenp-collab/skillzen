import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { AppLogo } from "../assets/svg/SvgIcons";

const { width } = Dimensions.get("window");

const SplashScreenAnimation = () => {
  const route = useRouter();

  useEffect(() => {
    setTimeout(() => {
      route.replace("/(stackScreens)/getStartedScreen");
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.logoWrapper}>
        <AppLogo />
      </View>

      <Text style={styles.title}>SZ Learn</Text>
      <Text style={styles.subtitle}>Code. Learn. Master.</Text>

      <View style={styles.progressTrack}>
        <View style={styles.progressFill} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B0F17",
    justifyContent: "center",
    alignItems: "center",
  },
  logoWrapper: {
    marginBottom: 24,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "700",
  },
  subtitle: {
    color: "#9AA0A6",
    fontSize: 14,
    marginTop: 4,
    marginBottom: 40,
  },
  progressTrack: {
    width: width * 0.6,
    height: 4,
    backgroundColor: "#2A2F3A",
    borderRadius: 2,
    overflow: "hidden",
  },
  progressFill: {
    width: "45%",
    height: "100%",
    backgroundColor: "#C6FF00",
    borderRadius: 2,
  },
});

export default SplashScreenAnimation;
