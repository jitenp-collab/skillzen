import { memo } from "react";
import { StyleSheet, Text, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { theme } from "@/utils/theme/Theme";
import type {
  BenefitVisualType,
  IconComponent,
  BenefitVisualProps,
  VisualColorMap,
  VisualRendererMap,
} from "@/utils/types/Apptypes";

const VISUAL_COLORS: VisualColorMap = {
  certificate: {
    color: theme.colors.primary,
    softColor: theme.colors.primarySoft,
  },
  growth: {
    color: theme.colors.secondary,
    softColor: theme.colors.secondarySoft,
  },
  time: { color: theme.colors.accent, softColor: theme.colors.accentSoft },
  community: {
    color: theme.colors.success,
    softColor: "rgba(53, 211, 154, 0.14)",
  },
  focus: {
    color: theme.colors.warning,
    softColor: "rgba(255, 200, 87, 0.14)",
  },
};

const getVisualColors = (visualType: BenefitVisualType) =>
  VISUAL_COLORS[visualType] ?? VISUAL_COLORS.certificate;

const CertificateVisual = ({
  Icon,
  color,
  softColor,
}: {
  Icon: IconComponent;
  color: string;
  softColor: string;
}) => (
  <View style={styles.certificateContainer}>
    <View style={styles.certificatePaper}>
      <View style={styles.certificateTopRow}>
        <View style={styles.certificateSmallLine} />
        <View style={[styles.certificateDot, { backgroundColor: color }]} />
      </View>
      <View style={styles.certificateLongLine} />
      <View
        style={[styles.certificateMediumLine, { backgroundColor: color }]}
      />
      <View style={styles.certificateShortLine} />
      <View
        style={[
          styles.certificateSeal,
          { backgroundColor: softColor, borderColor: color },
        ]}
      >
        <Icon size={17} color={color} strokeWidth={1.8} />
      </View>
    </View>
  </View>
);

const GrowthVisual = ({ color }: { color: string }) => {
  const barHeights = [25, 39, 33, 51, 43, 66];
  return (
    <View style={styles.growthContainer}>
      <View style={styles.growthHeader}>
        <Text style={styles.growthLabel}>Weekly progress</Text>
        <Text style={[styles.growthValue, { color }]}>86%</Text>
      </View>
      <View style={styles.growthBars}>
        {barHeights.map((height, index) => {
          const isHighlighted = index === 3 || index === 5;
          const barColor = isHighlighted
            ? index === 3
              ? theme.colors.primary
              : theme.colors.accent
            : color;
          return (
            <View
              key={`${height}-${index}`}
              style={[styles.growthBar, { height, backgroundColor: barColor }]}
            />
          );
        })}
      </View>
    </View>
  );
};

const TimeVisual = ({
  color,
  softColor,
}: {
  color: string;
  softColor: string;
}) => (
  <View style={styles.timeContainer}>
    <View
      style={[
        styles.clockOuter,
        { borderColor: color, backgroundColor: softColor },
      ]}
    >
      <View style={[styles.clockHandHour, { backgroundColor: color }]} />
      <View style={[styles.clockHandMinute, { backgroundColor: color }]} />
      <View style={[styles.clockCenter, { backgroundColor: color }]} />
    </View>
    <View style={styles.timeLines}>
      {[
        { style: styles.timeLineLong, color: theme.colors.primary },
        { style: styles.timeLineMedium, color },
        { style: styles.timeLineShort, color: theme.colors.secondary },
      ].map((line, index) => (
        <View key={index} style={styles.timeLineRow}>
          <View style={[styles.timeLineDot, { backgroundColor: line.color }]} />
          <View style={line.style} />
        </View>
      ))}
    </View>
  </View>
);

const CommunityVisual = ({
  Icon,
  color,
  softColor,
}: {
  Icon: IconComponent;
  color: string;
  softColor: string;
}) => (
  <View style={styles.communityContainer}>
    <View style={[styles.communityLine, styles.communityLineLeft]} />
    <View style={[styles.communityLine, styles.communityLineRight]} />
    <View
      style={[
        styles.communityNode,
        styles.communityNodeLeft,
        {
          borderColor: theme.colors.accent,
          backgroundColor: theme.colors.accentSoft,
        },
      ]}
    >
      <View
        style={[
          styles.communityPersonHead,
          { backgroundColor: theme.colors.accent },
        ]}
      />
      <View
        style={[
          styles.communityPersonBody,
          { backgroundColor: theme.colors.accent },
        ]}
      />
    </View>
    <View
      style={[
        styles.communityMainNode,
        { borderColor: color, backgroundColor: softColor },
      ]}
    >
      <Icon size={21} color={color} strokeWidth={1.8} />
    </View>
    <View
      style={[
        styles.communityNode,
        styles.communityNodeRight,
        {
          borderColor: theme.colors.secondary,
          backgroundColor: theme.colors.secondarySoft,
        },
      ]}
    >
      <View
        style={[
          styles.communityPersonHead,
          { backgroundColor: theme.colors.secondary },
        ]}
      />
      <View
        style={[
          styles.communityPersonBody,
          { backgroundColor: theme.colors.secondary },
        ]}
      />
    </View>
  </View>
);

const FocusVisual = ({
  color,
  softColor,
}: {
  color: string;
  softColor: string;
}) => (
  <View style={styles.focusContainer}>
    <View
      style={[
        styles.focusRingLarge,
        { borderColor: "rgba(255, 200, 87, 0.24)" },
      ]}
    >
      <View
        style={[
          styles.focusRingMedium,
          { borderColor: color, backgroundColor: softColor },
        ]}
      >
        <View
          style={[styles.focusRingSmall, { borderColor: theme.colors.primary }]}
        >
          <View
            style={[
              styles.focusCenter,
              { backgroundColor: theme.colors.primary },
            ]}
          />
        </View>
      </View>
    </View>
    <View style={styles.focusInfo}>
      <Text style={styles.focusLabel}>Daily target</Text>
      <Text style={[styles.focusValue, { color }]}>4 / 5</Text>
      <View style={styles.focusProgressTrack}>
        <View style={[styles.focusProgressValue, { backgroundColor: color }]} />
      </View>
    </View>
  </View>
);

const VISUAL_RENDERERS: VisualRendererMap = {
  certificate: ({ Icon, color, softColor }) => (
    <CertificateVisual Icon={Icon} color={color} softColor={softColor} />
  ),
  growth: ({ color }) => <GrowthVisual color={color} />,
  time: ({ color, softColor }) => (
    <TimeVisual color={color} softColor={softColor} />
  ),
  community: ({ Icon, color, softColor }) => (
    <CommunityVisual Icon={Icon} color={color} softColor={softColor} />
  ),
  focus: ({ color, softColor }) => (
    <FocusVisual color={color} softColor={softColor} />
  ),
};

export const BenefitVisual = memo(
  ({ visualType, icon: Icon }: BenefitVisualProps) => {
    const { color, softColor } = getVisualColors(visualType);
    return (
      <View style={styles.visualArea}>
        <LinearGradient
          colors={[softColor, theme.colors.card, theme.colors.background]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
        <View style={[styles.largeGlow, { backgroundColor: softColor }]} />
        <View style={[styles.smallGlow, { backgroundColor: color }]} />
        <View style={styles.visualPanel}>
          {VISUAL_RENDERERS[visualType]({ Icon, color, softColor })}
        </View>
      </View>
    );
  },
);
BenefitVisual.displayName = "BenefitVisual";

const styles = StyleSheet.create({
  visualArea: { flex: 1, overflow: "hidden" },
  largeGlow: {
    position: "absolute",
    top: -34,
    right: -24,
    width: 130,
    height: 130,
    borderRadius: 65,
  },
  smallGlow: {
    position: "absolute",
    top: 18,
    right: 22,
    width: 44,
    height: 44,
    borderRadius: 22,
    opacity: 0.14,
  },
  visualPanel: {
    position: "absolute",
    top: 18,
    right: 20,
    left: 20,
    height: 92,
    overflow: "hidden",
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: "rgba(248,250,252,0.11)",
    backgroundColor: "rgba(11,16,32,0.70)",
    padding: 12,
  },
  certificateContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  certificatePaper: {
    width: 120,
    height: 67,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(248,250,252,0.13)",
    backgroundColor: theme.colors.surface,
    padding: 10,
    transform: [{ rotate: "-2deg" }],
  },
  certificateTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  certificateSmallLine: {
    width: 30,
    height: 4,
    borderRadius: 4,
    backgroundColor: theme.colors.divider,
  },
  certificateDot: { width: 6, height: 6, borderRadius: 3 },
  certificateLongLine: {
    width: 65,
    height: 4,
    marginTop: 9,
    borderRadius: 4,
    backgroundColor: theme.colors.divider,
  },
  certificateMediumLine: {
    width: 50,
    height: 4,
    marginTop: 6,
    borderRadius: 4,
  },
  certificateShortLine: {
    width: 35,
    height: 4,
    marginTop: 6,
    borderRadius: 4,
    backgroundColor: theme.colors.divider,
  },
  certificateSeal: {
    position: "absolute",
    right: 8,
    bottom: 7,
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    borderWidth: 1,
  },
  growthContainer: { flex: 1 },
  growthHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  growthLabel: { color: theme.colors.muted, fontSize: 9, fontWeight: "600" },
  growthValue: { fontSize: 16, fontWeight: "800" },
  growthBars: { flex: 1, flexDirection: "row", alignItems: "flex-end", gap: 7 },
  growthBar: {
    flex: 1,
    maxWidth: 15,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    opacity: 0.84,
  },
  timeContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 18,
  },
  clockOuter: {
    width: 62,
    height: 62,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 31,
    borderWidth: 2,
  },
  clockHandHour: {
    position: "absolute",
    width: 3,
    height: 17,
    borderRadius: 2,
    transform: [{ translateY: -7 }, { rotate: "25deg" }],
  },
  clockHandMinute: {
    position: "absolute",
    width: 3,
    height: 23,
    borderRadius: 2,
    transform: [{ translateY: -10 }, { rotate: "110deg" }],
  },
  clockCenter: { width: 7, height: 7, borderRadius: 4 },
  timeLines: { flex: 1, gap: 9 },
  timeLineRow: { flexDirection: "row", alignItems: "center", gap: 7 },
  timeLineDot: { width: 6, height: 6, borderRadius: 3 },
  timeLineLong: {
    width: "82%",
    height: 5,
    borderRadius: 5,
    backgroundColor: theme.colors.divider,
  },
  timeLineMedium: {
    width: "64%",
    height: 5,
    borderRadius: 5,
    backgroundColor: theme.colors.divider,
  },
  timeLineShort: {
    width: "48%",
    height: 5,
    borderRadius: 5,
    backgroundColor: theme.colors.divider,
  },
  communityContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  communityLine: {
    position: "absolute",
    width: 65,
    height: 2,
    backgroundColor: theme.colors.border,
  },
  communityLineLeft: { left: 30, transform: [{ rotate: "-13deg" }] },
  communityLineRight: { right: 30, transform: [{ rotate: "13deg" }] },
  communityNode: {
    position: "absolute",
    width: 38,
    height: 38,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    borderWidth: 1,
  },
  communityNodeLeft: { left: 4, bottom: 7 },
  communityNodeRight: { right: 4, top: 7 },
  communityMainNode: {
    width: 46,
    height: 46,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    borderWidth: 1.2,
  },
  communityPersonHead: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginBottom: 3,
  },
  communityPersonBody: {
    width: 15,
    height: 8,
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
  },
  focusContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  focusRingLarge: {
    width: 67,
    height: 67,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 34,
    borderWidth: 2,
  },
  focusRingMedium: {
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 24,
    borderWidth: 2,
  },
  focusRingSmall: {
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 14,
    borderWidth: 2,
  },
  focusCenter: { width: 9, height: 9, borderRadius: 5 },
  focusInfo: { flex: 1 },
  focusLabel: { color: theme.colors.muted, fontSize: 9, fontWeight: "600" },
  focusValue: { marginTop: 4, fontSize: 18, fontWeight: "800" },
  focusProgressTrack: {
    width: "100%",
    height: 5,
    marginTop: 8,
    overflow: "hidden",
    borderRadius: 5,
    backgroundColor: theme.colors.divider,
  },
  focusProgressValue: { width: "80%", height: "100%", borderRadius: 5 },
});