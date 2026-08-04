import { useCallback } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { theme } from "../../utils/theme/Theme";
import { Category } from "@/utils/types/Apptypes";
import CategoryCard from "./CategoryCard";

const SECTION_ENTRY_DELAY = 1500;

const CategoriesComp = () => {
  const { categories } = useSelector((state: RootState) => state.global);

  const handlePress = useCallback((cat: Category) => {
    // router.push(`/category/${cat.id}`)
  }, []);

  return (
    <Animated.View entering={FadeInDown.delay(SECTION_ENTRY_DELAY).duration(300)}>
      <Text style={styles.heading}>Categories</Text>

      {categories?.map((cat: Category, i: number) => (
        <CategoryCard
          key={cat.id}
          item={cat}
          index={i}
          onPress={handlePress}
        />
      ))}
    </Animated.View>
  );
};

export default CategoriesComp;

const styles = StyleSheet.create({
  heading: {
    color: theme.colors.text,
    fontSize: theme.fontSize.title,
    fontWeight: "800",
    letterSpacing: -0.5,
    marginBottom: theme.spacing.md,
  },
});