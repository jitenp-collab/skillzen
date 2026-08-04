import { memo, useEffect } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "react-native-linear-gradient";
import Animated, {
  Easing,
  Extrapolation,
  FadeInDown,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { theme } from "../../utils/theme/Theme";
import { Category } from "@/utils/types/Apptypes";
import { ChevronRightIcon } from "../../assets/svg/SvgIcons";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const BUTTON_WIDTH = 85;
const SHIMMER_WIDTH = 34;
const SHIMMER_TRAVEL = BUTTON_WIDTH + SHIMMER_WIDTH * 2;
const SWEEP_DURATION = 1100;
const HOLD_DURATION = 1400;
const CYCLE_DURATION = SWEEP_DURATION + HOLD_DURATION;
const SWEEP_FRACTION = SWEEP_DURATION / CYCLE_DURATION;

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
    const buttonPressed = useSharedValue(0);
    const shimmerProgress = useSharedValue(0);
    const iconNudge = useSharedValue(0);

    useEffect(() => {
      const startDelay = index * 60 + 400;
      shimmerProgress.value = withDelay(
        startDelay,
        withRepeat(
          withTiming(1, { duration: CYCLE_DURATION, easing: Easing.linear }),
          -1,
          false,
        ),
      );
    }, [index, shimmerProgress]);

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

    const startButtonStyle = useAnimatedStyle(() => ({
      transform: [
        {
          scale: buttonPressed.value
            ? withTiming(0.92, { duration: 90 })
            : withSpring(1, { damping: 6, stiffness: 250 }),
        },
      ],
    }));

    const iconChipStyle = useAnimatedStyle(() => ({
      transform: [{ scale: buttonPressed.value ? 1.12 : 1 }],
    }));
   
    const shimmerStyle = useAnimatedStyle(() => {
      const translateX = interpolate(
        shimmerProgress.value,
        [0, SWEEP_FRACTION],
        [0, SHIMMER_TRAVEL],
        Extrapolation.CLAMP,
      );
      const opacity = interpolate(
        shimmerProgress.value,
        [0, SWEEP_FRACTION * 0.15, SWEEP_FRACTION * 0.85, SWEEP_FRACTION],
        [0, 1, 1, 0],
        Extrapolation.CLAMP,
      );
      return { transform: [{ translateX }], opacity };
    });

    const chevronStyle = useAnimatedStyle(() => ({
      transform: [
        { translateX: withTiming(iconNudge.value, { duration: 150 }) },
      ],
    }));

    const handlePressIn = () => {
      buttonPressed.value = 1;
    };
    const handlePressOut = () => {
      buttonPressed.value = 0;
    };
    const handlePress = () => {
      iconNudge.value = withSequence(
        withTiming(4, { duration: 100 }),
        withTiming(0, { duration: 150 }),
      );
      onPress(item);
    };

    return (
      <Animated.View entering={FadeInDown.delay(index * 60).duration(300)}>
        <AnimatedPressable
          onPressIn={() => (pressed.value = 1)}
          onPressOut={() => (pressed.value = 0)}
          onPress={() => onPress(item)}
          style={[styles.cardWrap, cardStyle]}
        >
          <Animated.Image
            source={{ uri: item.image }}
            style={[styles.image, imageStyle]}
            resizeMode="cover"
          />
          <LinearGradient
            colors={["transparent", "rgba(0,0,0,0.15)", "rgba(0,0,0,0.70)"]}
            locations={[0, 0.5, 1]}
            style={StyleSheet.absoluteFill}
          />

          <View style={styles.badge}>
            <Text style={styles.badgeText}>Featured</Text>
          </View>

          <View style={styles.content}>
            <View style={styles.textCol}>
              <Text numberOfLines={1} style={styles.title}>
                {item.title}
              </Text>
              <Text numberOfLines={1} style={styles.description}>
                {item.description}
              </Text>
            </View>

            <AnimatedPressable
              hitSlop={8}
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              onPress={handlePress}
              style={startButtonStyle}
            >
              <View style={styles.startButton}>
                <Animated.View
                  style={[styles.shimmerWrap, shimmerStyle]}
                  pointerEvents="none"
                >
                  <LinearGradient
                    colors={[
                      "transparent",
                      "rgba(255,255,255,0.55)",
                      "transparent",
                    ]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={StyleSheet.absoluteFill}
                  />
                </Animated.View>

                <Animated.View style={[styles.startIconChip, iconChipStyle]}>
                  <Text style={styles.startButtonText}>Start</Text>
                  <Animated.View style={chevronStyle}>
                    <ChevronRightIcon color="#111318" size={15} />
                  </Animated.View>
                </Animated.View>
              </View>
            </AnimatedPressable>
          </View>
        </AnimatedPressable>
      </Animated.View>
    );
  },
);
CategoryCard.displayName = "CategoryCard";

export default CategoryCard;

const styles = StyleSheet.create({
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
  image: { ...StyleSheet.absoluteFill },
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
    width: BUTTON_WIDTH,
    height: 39,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.16)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.4)",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  shimmerWrap: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: -SHIMMER_WIDTH,
    width: SHIMMER_WIDTH,
  },
  startButtonText: {
    color: "#000000",
    fontSize: 11.5,
    fontWeight: "800",
    letterSpacing: 0.2,
    marginRight: 6,
  },
  startIconChip: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 99,
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    justifyContent: "center",
    shadowColor: theme.colors.primary,
    shadowOpacity: 0.5,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 0 },
    elevation: 4,
  },
});
