import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { theme } from "@/utils/theme/Theme";
import type { TopicListItem } from "@/utils/types/Apptypes";
import { ChevronRightIcon } from "../../assets/svg/SvgIcons";

const IMAGE_SIZE = 56;

const TopicRow = ({
  item,
  onPress,
}: {
  item: TopicListItem;
  onPress: (item: TopicListItem) => void;
}) => {
  const isCompleted =
    item.totalLessonsOfTopic > 0 && item.progress >= item.totalLessonsOfTopic;

  return (
    <Pressable
      onPress={() => onPress(item)}
      style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}
    >
      <Image source={{ uri: item.image }} style={styles.image} />

      <View style={styles.textCol}>
        <Text numberOfLines={1} style={styles.title}>
          {item.title}
        </Text>
        <Text style={styles.meta}>
          {isCompleted
            ? "Completed"
            : item.progress > 0
              ? `${item.progress} of ${item.totalLessonsOfTopic} lessons`
              : `${item.totalLessonsOfTopic} lessons`}
        </Text>
      </View>

      <ChevronRightIcon color={theme.colors.disabled} size={16} />
    </Pressable>
  );
};

const TopickeComp = () => {
  const { selectedCatogery } = useSelector((state: RootState) => state.global);

  const topics: TopicListItem[] = selectedCatogery ?? [];

  const handleTopicPress = (item: TopicListItem) => {
    console.log("Selected topic:", item.id);
  };

  if (topics.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>No topics found</Text>
        <Text style={styles.emptySubtitle}>
          Select a category from Home to see its topics
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={topics}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TopicRow item={item} onPress={handleTopicPress} />
      )}
      contentContainerStyle={styles.listContent}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default TopickeComp;

const styles = StyleSheet.create({
  listContent: {
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.sm,
    paddingBottom: theme.spacing.xxl,
  },
  separator: {
    height: 1,
    backgroundColor: theme.colors.divider,
    marginLeft: IMAGE_SIZE + theme.spacing.md,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: theme.spacing.md,
    gap: theme.spacing.md,
  },
  rowPressed: {
    opacity: 0.6,
  },
  image: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderWidth: 4,
    borderColor:"#fff"
  },
  textCol: {
    flex: 1,
    gap: 4,
  },
  title: {
    color: theme.colors.text,
    fontSize: theme.fontSize.body,
    fontWeight: "700",
    letterSpacing: -0.2,
  },
  meta: {
    color: theme.colors.muted,
    fontSize: theme.fontSize.small,
    fontWeight: "500",
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
