import { useCallback, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { useLocalSearchParams, useRouter } from "expo-router";
import { RootState } from "@/redux/store";
import { theme } from "@/utils/theme/Theme";
import type { TopicListItem } from "@/utils/types/Apptypes";
import { BackIcon } from "../../assets/svg/SvgIcons";
import CustomeSearch from "@/components/reusableComponents/CustomeSearch";
import AppButton from "../reusableComponents/AppButton";
import TopickCart from "./TopickCart";

const TopickeComp = () => {
  const router = useRouter();
  const { categoryTitle } = useLocalSearchParams<{ categoryTitle?: string }>();

  const { selectedCatogery } = useSelector((state: RootState) => state.global);
  const topics: TopicListItem[] = selectedCatogery ?? [];

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);

  const filteredTopics = topics.filter((t) =>
    t.title.toLowerCase().includes(searchQuery.trim().toLowerCase()),
  );

  const handleTopicPress = useCallback((item: TopicListItem) => {
    setSelectedTopicId(item.id);
    // router.navigate(`/lesson/${item.id}`)
  }, []);

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <AppButton
          onPress={() => router.back()}
          hitSlop={10}
          style={styles.backButton}
          icon={<BackIcon size={35} />}
          backgroundColor="#ffffff00"
        />
        <Text style={styles.headerTitle} numberOfLines={1}>
          {categoryTitle ?? "Topics"}
        </Text>
        <Text style={styles.headerSubtitle}>Choose a topic</Text>
      </View>

      {topics.length === 0 ? (
  <View style={styles.emptyContainer}>
    <Text style={styles.emptySubtitle}>
      Select a category from Home to see its topics
    </Text>
  </View>
) : (
  <>
    <CustomeSearch
      value={searchQuery}
      onChangeText={setSearchQuery}
      onClear={() => setSearchQuery("")}
      placeholder="Search topics"
      containerStyle={styles.searchContainer}
    />

    {filteredTopics.length === 0 ? (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>No topics found</Text>
        <Text style={styles.emptySubtitle}>
          Try searching for something else
        </Text>
      </View>
    ) : (
      <FlatList
        data={filteredTopics}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <TopickCart
            item={item}
            index={index}
            isSelected={item.id === selectedTopicId}
            onPress={handleTopicPress}
          />
        )}
        contentContainerStyle={styles.listContent}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      />
    )}
  </>
)}
    </View>
  );
};

export default TopickeComp;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingHorizontal: theme.spacing.md,
  },
  header: {
    marginVertical: 10,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: theme.radius.round,
    position: "absolute",
    left: 0,
    top: 5,
  },
  headerTitle: {
    color: theme.colors.text,
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
  },
  headerSubtitle: {
    color: theme.colors.muted,
    fontSize: 17,
    fontWeight: "400",
    marginTop: 1,
    textAlign: "center",
  },
  searchContainer: {
    marginBottom: 10,
  },
  listContent: {
    paddingTop: theme.spacing.sm,
    paddingBottom: theme.spacing.xxl,
    gap: theme.spacing.sm,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: theme.spacing.lg,
    gap: theme.spacing.xs,
  },
  emptyTitle: {
    color: theme.colors.text,
    fontSize: theme.fontSize.body,
    fontWeight: "700",
  },
  emptySubtitle: {
    color: theme.colors.muted,
    fontSize: theme.fontSize.small,
    textAlign: "center",
  },
});
