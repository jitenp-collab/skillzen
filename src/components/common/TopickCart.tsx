import { Pressable, StyleSheet, Text, View } from "react-native";
import { PieChart } from "react-native-gifted-charts";
import { ICON_PALETTE, theme } from "@/utils/theme/Theme";
import type { TopicListItem } from "@/utils/types/Apptypes";
import { CheckIcon, TopicIcon } from "../../assets/svg/SvgIcons";

const RING_SIZE = 46;

const TopickCart = ({
  item,
  index,
  isSelected,
  progressPercent,
  completed,
  onPress,
}: {
  item: TopicListItem;
  index: number;
  isSelected: boolean;
  progressPercent: number;
  completed: boolean;
  onPress: (item: TopicListItem) => void;
}) => {
  const accent = ICON_PALETTE[index % ICON_PALETTE.length];

  const clampedPercent = Math.max(0, Math.min(100, progressPercent));
  const ringColor = completed ? theme.colors.primary : accent;

  const pieData = [
    { value: clampedPercent, color: ringColor },
    { value: 100 - clampedPercent, color: theme.colors.border },
  ];

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

      <View style={styles.progressWrap}>
        <PieChart
          data={pieData}
          donut
          radius={RING_SIZE / 2}
          innerRadius={RING_SIZE / 2 - 5} // was -5, thicker ring at bigger size
          innerCircleColor={theme.colors.card}
          centerLabelComponent={() =>
            completed ? (
              <CheckIcon color={theme.colors.primary} size={18} />
            ) : (
              <Text style={styles.progressPercentText}>{clampedPercent}%</Text>
            )
          }
        />
      </View>
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
  progressWrap: {
    width: RING_SIZE,
    height: RING_SIZE,
    alignItems: "center",
    justifyContent: "center",
  },
  progressPercentText: {
    color: theme.colors.text,
    fontSize: 12,
    // fontWeight: "700",
  },
});
