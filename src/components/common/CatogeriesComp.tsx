import { useCallback } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { theme } from "../../utils/theme/Theme";
import { Category } from "@/utils/types/Apptypes";
import CategoryCard from "./CategoryCard";

const CategoriesComp = () => {

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

      {categories?.map((cat: Category, i: number) => (
        <CategoryCard key={cat.id} item={cat} index={i} onPress={handlePress} />
      ))}
    </ScrollView>
  );
};

export default CategoriesComp;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 160,
  },
  heading: {
    color: theme.colors.text,
    fontSize: theme.fontSize.title,
    fontWeight: "800",
    letterSpacing: -0.5,
    marginBottom: theme.spacing.md,
  },
});