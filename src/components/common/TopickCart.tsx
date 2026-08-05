import { Pressable, StyleSheet, Text, View } from "react-native";
import { ICON_PALETTE, theme } from "@/utils/theme/Theme";
import type { TopicListItem } from "@/utils/types/Apptypes";
import { CheckIcon, ChevronRightIcon, TopicIcon } from "../../assets/svg/SvgIcons";

const TopickCart = ({
  item,
  index,
  isSelected,
  onPress,
}: {
  item: TopicListItem;
  index: number;
  isSelected: boolean;
  onPress: (item: TopicListItem) => void;
}) => {
  const accent = ICON_PALETTE[index % ICON_PALETTE.length];

  return (
    <Pressable
      onPress={() => onPress(item)}
      style={({ pressed }) => [
        styles.row,
        isSelected && styles.rowSelected,
        pressed && styles.rowPressed,
      ]}
    >
      <View
        style={[
          styles.iconChip,
          { backgroundColor: `${accent}26`, borderColor: `${accent}4D` },
        ]}
      >
        <TopicIcon color={accent} />
      </View>

      <View style={styles.textCol}>
        <Text numberOfLines={1} style={styles.title}>
          {item.title}
        </Text>
        <Text style={styles.meta}>{item.totalLessons} lessons</Text>
      </View>

      {isSelected ? (
        <View style={styles.checkBadge}>
          <CheckIcon color={theme.colors.background} size={14} />
        </View>
      ) : (
        <ChevronRightIcon color={theme.colors.disabled} size={27} />
      )}
    </Pressable>
  );
};

export default TopickCart;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingVertical: 10,
    paddingHorizontal: theme.spacing.sm + 2,
    gap: theme.spacing.sm + 2,
  },
  rowSelected: {
    borderColor: theme.colors.primary,
    borderWidth: 1.5,
  },
  rowPressed: {
    opacity: 0.75,
  },
  iconChip: {
    width: "16%",
    height: 55,
    borderRadius: theme.radius.sm,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  textCol: {
    flex: 1,
    gap: 2,
  },
  title: {
    color: theme.colors.text,
    fontSize: theme.fontSize.body,
    fontWeight: "700",
  },
  meta: {
    color: theme.colors.muted,
    fontSize: theme.fontSize.caption,
    fontWeight: "500",
  },
  checkBadge: {
    width: 26,
    height: 26,
    borderRadius: theme.radius.round,
    backgroundColor: theme.colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
});