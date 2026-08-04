import { useCallback, useMemo } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { theme } from "../../utils/theme/Theme";
import { CategoriesCompProps, Category } from "@/utils/types/Apptypes";
import CategoryCard from "./CategoryCard";
import { SelectCaogery } from "@/redux/actions";
import { router } from "expo-router";

const SECTION_ENTRY_DELAY = 0;

const CategoriesComp = ({ searchQuery = "" }: CategoriesCompProps) => {
  const { categories, selectedCatogery } = useSelector(
    (state: RootState) => state.global,
  );
  const dispatch = useDispatch<AppDispatch>();

  const handlePress = useCallback(
    async (cat: Category) => {
      try {
        await dispatch(SelectCaogery(cat.title)).unwrap();
        router.navigate("/(tabs)/topics");
      } catch (err) {
        console.log("Failed to select category:", err);
      }
    },
    [dispatch],
  );

  const filteredCategories = useMemo(() => {
    if (!categories) return [];
    const q = searchQuery.trim().toLowerCase();
    if (!q) return categories;
    return categories.filter(
      (cat: Category) =>
        cat?.title?.toLowerCase().includes(q) ||
        cat?.description?.toLowerCase().includes(q),
    );
  }, [categories, searchQuery]);

  const isSearchActive = searchQuery.trim().length > 0;
  const isEmpty = isSearchActive && filteredCategories.length === 0;

  return (
    <Animated.View
      entering={FadeInDown.delay(
        searchQuery ? 0 : SECTION_ENTRY_DELAY,
      ).duration(300)}
    >
      <Text style={styles.heading}>Categories</Text>

      {isEmpty ? (
        <Animated.View
          entering={FadeInDown.duration(250)}
          style={styles.emptyContainer}
        >
          <Text style={styles.emptyTitle}>No categories found</Text>
          <Text style={styles.emptySubtitle}>
            Try searching for something else
          </Text>
        </Animated.View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.ScrollCOntainer}
          scrollEventThrottle={30}
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps="handled"
        >
          {filteredCategories.map((cat: Category, i: number) => (
            <CategoryCard
              key={cat.id}
              item={cat}
              index={i}
              onPress={handlePress}
            />
          ))}
        </ScrollView>
      )}
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
  ScrollCOntainer: {
    paddingBottom: 600,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: theme.spacing.xl ?? 40,
    gap: 4,
  },
  emptyTitle: {
    color: theme.colors.text,
    fontSize: theme.fontSize.body,
    fontWeight: "700",
  },
  emptySubtitle: {
    color: theme.colors.muted,
    fontSize: theme.fontSize.body,
  },
});
