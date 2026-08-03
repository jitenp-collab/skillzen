import React, { memo, useCallback } from "react";
import { ScrollView, StyleSheet, Text, View, Pressable } from "react-native";
import { LinearGradient } from "react-native-linear-gradient";
import Animated, {
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { theme } from "../../utils/theme/Theme";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type Category = {
  id: string;
  title: string;
  description: string;
  image: string;
  meta?: string;
};

const CategoryCard = memo(
  ({
    item,
    index,
    onPress,
  }: {
    item: Category;
    index: number;
    onPress: (c: Category) => void;
  }) => {
    const pressed = useSharedValue(0);

    // Whole card gently scales down + image zooms in slightly on press —
    // gives a soft "tap" feel without a separate button animation.
    const cardStyle = useAnimatedStyle(() => ({
      transform: [
        { scale: withTiming(1 - pressed.value * 0.02, { duration: 120 }) },
      ],
    }));

    const imageStyle = useAnimatedStyle(() => ({
      transform: [
        { scale: withTiming(1 + pressed.value * 0.06, { duration: 250 }) },
      ],
    }));

    return (
      <Animated.View entering={FadeInDown.delay(index * 60).duration(300)}>
        <AnimatedPressable
          onPressIn={() => (pressed.value = 1)}
          onPressOut={() => (pressed.value = 0)}
          onPress={() => onPress(item)}
          style={[styles.cardWrap, cardStyle]}
        >
          {/* Full-bleed image */}
          <Animated.Image
            source={{ uri: item.image }}
            style={[styles.image, imageStyle]}
            resizeMode="cover"
          />

          {/* Dark gradient so text stays readable over any photo */}
          <LinearGradient
            colors={["transparent", "rgba(0,0,0,0.15)", "rgba(0,0,0,0.70)"]}
            locations={[0, 0.5, 1]}
            style={StyleSheet.absoluteFill}
          />

          <View style={styles.badge}>
            <Text style={styles.badgeText}>Featured</Text>
          </View>

          {/* Text + button sit directly on the image */}
          <View style={styles.content}>
            <View style={styles.textCol}>
              <Text numberOfLines={1} style={styles.title}>
                {item.title}
              </Text>
              <Text numberOfLines={1} style={styles.description}>
                {item.description}
              </Text>
            </View>

            <View style={styles.startButton}>
              <Text style={styles.startButtonText}>Start</Text>
              <Text style={styles.startButtonArrow}>→</Text>
            </View>
          </View>
        </AnimatedPressable>
      </Animated.View>
    );
  },
);
CategoryCard.displayName = "CategoryCard";

const CatogeriesComp = () => {
  const { categories } = useSelector((state: RootState) => state.global);

  const handlePress = useCallback((cat: Category) => {
    // router.push(`/category/${cat.id}`)
  }, []);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
      overScrollMode="never"
      bounces
    >
      <Text style={styles.heading}>Categories</Text>

      {categories?.map((cat: any, i: number) => (
        <CategoryCard key={cat.id} item={cat} index={i} onPress={handlePress} />
      ))}
    </ScrollView>
  );
};

export default CatogeriesComp;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 180,
  },
  heading: {
    color: theme.colors.text,
    fontSize: theme.fontSize.title,
    fontWeight: "800",
    letterSpacing: -0.5,
    marginBottom: theme.spacing.md,
  },
  cardWrap: {
    height: 210,
    borderRadius: 22,
    marginBottom: 20,
    overflow: "hidden",
    backgroundColor: theme.colors.border,
    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 0,
  },
  image: {
    ...StyleSheet.absoluteFill,
  },
  badge: {
    position: "absolute",
    top: 14,
    left: 14,
    backgroundColor: "rgba(255,255,255,0.18)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.35)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  badgeText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.3,
    textTransform: "uppercase",
  },
  content: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    padding: 16,
  },
  textCol: { flex: 1, marginRight: 12 },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "800",
    letterSpacing: -0.4,
    marginBottom: 4,
  },
  description: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 13,
    fontWeight: "500",
  },
  startButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 999,
  },
  startButtonText: {
    color: "#111318",
    fontSize: 13,
    fontWeight: "800",
  },
  startButtonArrow: {
    color: "#111318",
    fontSize: 13,
    fontWeight: "800",
    marginLeft: 5,
  },
});
