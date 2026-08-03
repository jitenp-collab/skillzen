import React, { memo, useCallback } from "react";
import { ScrollView, StyleSheet, Text, View, Pressable } from "react-native";
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
    const btnPressed = useSharedValue(0);

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

    const btnStyle = useAnimatedStyle(() => ({
      transform: [
        { scale: withTiming(1 - btnPressed.value * 0.08, { duration: 100 }) },
      ],
      opacity: withTiming(1 - btnPressed.value * 0.15, { duration: 100 }),
    }));

    return (
      <Animated.View entering={FadeInDown.delay(index * 60).duration(300)}>
        <AnimatedPressable
          onPressIn={() => (pressed.value = 1)}
          onPressOut={() => (pressed.value = 0)}
          onPress={() => onPress(item)}
          style={[styles.cardWrap, cardStyle]}
        >
          <View style={styles.imageWrap}>
            <Animated.Image
              source={{ uri: item.image }}
              style={[styles.image, imageStyle]}
              resizeMode="cover"
            />

            <View style={styles.categoryBadge}>
              <Text style={styles.categoryBadgeText}>Featured</Text>
            </View>
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
              onPressIn={() => (btnPressed.value = 1)}
              onPressOut={() => (btnPressed.value = 0)}
              onPress={() => onPress(item)}
              style={[styles.bookButton, btnStyle]}
              hitSlop={6}
            >
              <Text style={styles.bookButtonText}>Start</Text>
              <Text style={styles.bookButtonArrow}>→</Text>
            </AnimatedPressable>
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

const DARK = "#111318";

const styles = StyleSheet.create({
  container: {
    paddingBottom: 350,
  },
  heading: {
    color: theme.colors.text,
    fontSize: theme.fontSize.title,
    fontWeight: "800",
    letterSpacing: -0.5,
    marginBottom: theme.spacing.md,
  },
  cardWrap: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.lg,
    marginBottom: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  imageWrap: {
    width: "100%",
    height: 150,
    backgroundColor: theme.colors.border,
    overflow: "hidden",
  },
  image: { width: "100%", height: "100%", resizeMode: "center" },
  categoryBadge: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "rgba(0,0,0,0.55)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
  },
  categoryBadgeText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.2,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: theme.spacing.md,
  },
  textCol: { flex: 1, marginRight: theme.spacing.sm },
  title: {
    color: theme.colors.text,
    fontSize: theme.fontSize.subtitle,
    fontWeight: "700",
    marginBottom: 3,
    letterSpacing: -0.3,
  },
  description: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSize.small,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  metaIcon: {
    fontSize: 11,
    color: theme.colors.textSecondary,
    marginRight: 4,
  },
  metaText: {
    color: theme.colors.textSecondary,
    fontSize: 11,
    fontWeight: "600",
  },
  bookButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: DARK,
    paddingHorizontal: 18,
    paddingVertical: 11,
    borderRadius: 999,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  bookButtonText: {
    color: "#fff",
    fontSize: theme.fontSize.small,
    fontWeight: "700",
  },
  bookButtonArrow: {
    color: "#fff",
    fontSize: theme.fontSize.small,
    fontWeight: "700",
    marginLeft: 5,
  },
});
