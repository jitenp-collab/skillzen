import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Animated,
  FlatList,
  LayoutChangeEvent,
  ListRenderItemInfo,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  View,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { benefitsConfig } from "@/utils/constants/benefitsConfig";
import { theme } from "@/utils/theme/Theme";
import type {
  BenefitCardProps,
  BenefitVisualType,
  IconComponent,
} from "@/utils/types/Apptypes";

const CARD_HEIGHT = 210;
const CARD_SPACING = 16;
const AUTO_SCROLL_DELAY = 2000;
const RESUME_DELAY = 3500;

const INITIAL_LOOP_COPIES = 401;
const APPEND_LOOP_COPIES = 50;
const BENEFIT_COUNT = benefitsConfig.length;
const START_COPY = Math.floor(INITIAL_LOOP_COPIES / 2);
const START_INDEX = START_COPY * BENEFIT_COUNT;
const APPEND_THRESHOLD = BENEFIT_COUNT * 20;

type BenefitItem = (typeof benefitsConfig)[number];

type LoopedBenefitItem = BenefitItem & {
  uid: string;
};

type BenefitCardInternalProps = BenefitCardProps & {
  index: number;
  scrollX: Animated.Value;
  cardWidth: number;
  itemWidth: number;
};

type BenefitVisualProps = {
  visualType: BenefitVisualType;
  icon: IconComponent;
};

const createLoopCopies = (
  startingCopy: number,
  copyCount: number,
): LoopedBenefitItem[] =>
  Array.from({ length: copyCount }, (_, relativeCopyIndex) => {
    const copyIndex = startingCopy + relativeCopyIndex;
    return benefitsConfig.map((item) => ({
      ...item,
      uid: `${copyIndex}-${item.id}`,
    }));
  }).flat();

const getVisualColors = (visualType: BenefitVisualType) => {
  switch (visualType) {
    case "certificate":
      return {
        color: theme.colors.primary,
        softColor: theme.colors.primarySoft,
      };
    case "growth":
      return {
        color: theme.colors.secondary,
        softColor: theme.colors.secondarySoft,
      };
    case "time":
      return { color: theme.colors.accent, softColor: theme.colors.accentSoft };
    case "community":
      return {
        color: theme.colors.success,
        softColor: "rgba(53, 211, 154, 0.14)",
      };
    case "focus":
      return {
        color: theme.colors.warning,
        softColor: "rgba(255, 200, 87, 0.14)",
      };
    default:
      return {
        color: theme.colors.primary,
        softColor: theme.colors.primarySoft,
      };
  }
};

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
          return (
            <View
              key={`${height}-${index}`}
              style={[
                styles.growthBar,
                {
                  height,
                  backgroundColor: isHighlighted
                    ? index === 3
                      ? theme.colors.primary
                      : theme.colors.accent
                    : color,
                },
              ]}
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
      <View style={styles.timeLineRow}>
        <View
          style={[
            styles.timeLineDot,
            { backgroundColor: theme.colors.primary },
          ]}
        />
        <View style={styles.timeLineLong} />
      </View>
      <View style={styles.timeLineRow}>
        <View style={[styles.timeLineDot, { backgroundColor: color }]} />
        <View style={styles.timeLineMedium} />
      </View>
      <View style={styles.timeLineRow}>
        <View
          style={[
            styles.timeLineDot,
            { backgroundColor: theme.colors.secondary },
          ]}
        />
        <View style={styles.timeLineShort} />
      </View>
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

const BenefitVisual = memo(({ visualType, icon: Icon }: BenefitVisualProps) => {
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
        {visualType === "certificate" && (
          <CertificateVisual Icon={Icon} color={color} softColor={softColor} />
        )}
        {visualType === "growth" && <GrowthVisual color={color} />}
        {visualType === "time" && (
          <TimeVisual color={color} softColor={softColor} />
        )}
        {visualType === "community" && (
          <CommunityVisual Icon={Icon} color={color} softColor={softColor} />
        )}
        {visualType === "focus" && (
          <FocusVisual color={color} softColor={softColor} />
        )}
      </View>
    </View>
  );
});
BenefitVisual.displayName = "BenefitVisual";

const BenefitCard = memo(
  ({
    title,
    description,
    icon: Icon,
    visualType,
    index,
    scrollX,
    cardWidth,
    itemWidth,
  }: BenefitCardInternalProps) => {
    const centerPosition = index * itemWidth;
    const cardInputRange = [
      centerPosition - itemWidth,
      centerPosition,
      centerPosition + itemWidth,
    ];

    const scale = scrollX.interpolate({
      inputRange: cardInputRange,
      outputRange: [0.91, 1, 0.91],
      extrapolate: "clamp",
    });
    const translateY = scrollX.interpolate({
      inputRange: cardInputRange,
      outputRange: [12, 0, 12],
      extrapolate: "clamp",
    });
    const opacity = scrollX.interpolate({
      inputRange: cardInputRange,
      outputRange: [0.42, 1, 0.42],
      extrapolate: "clamp",
    });
    const visualTranslateX = scrollX.interpolate({
      inputRange: cardInputRange,
      outputRange: [12, 0, -12],
      extrapolate: "clamp",
    });

    const focusInputRange = [
      centerPosition - itemWidth,
      centerPosition - itemWidth * 0.35,
      centerPosition,
      centerPosition + itemWidth * 0.35,
      centerPosition + itemWidth,
    ];

    const focus = scrollX.interpolate({
      inputRange: focusInputRange,
      outputRange: [0, 0.25, 1, 0.25, 0],
      extrapolate: "clamp",
    });
    const iconScale = scrollX.interpolate({
      inputRange: focusInputRange,
      outputRange: [0.88, 0.95, 1, 0.95, 0.88],
      extrapolate: "clamp",
    });
    const accentScale = scrollX.interpolate({
      inputRange: focusInputRange,
      outputRange: [0.5, 0.72, 1, 0.72, 0.5],
      extrapolate: "clamp",
    });

    return (
      <View style={[styles.cardSlot, { width: itemWidth }]}>
        <Animated.View
          renderToHardwareTextureAndroid
          style={[
            styles.cardAnimatedContainer,
            { opacity, transform: [{ translateY }, { scale }] },
          ]}
        >
          <View style={[styles.card, { width: cardWidth }]}>
            <Animated.View
              style={[
                styles.animatedVisual,
                {
                  transform: [
                    { translateX: visualTranslateX },
                    { scale: 1.05 },
                  ],
                },
              ]}
            >
              <BenefitVisual visualType={visualType} icon={Icon} />
            </Animated.View>

            <LinearGradient
              colors={[
                "rgba(11,16,32,0)",
                "rgba(11,16,32,0.18)",
                "rgba(11,16,32,0.96)",
                theme.colors.background,
              ]}
              locations={[0, 0.34, 0.69, 1]}
              style={StyleSheet.absoluteFill}
            />

            <View style={styles.cardContent}>
              <Text style={styles.title} numberOfLines={1}>
                {title}
              </Text>
              <Text style={styles.description} numberOfLines={2}>
                {description}
              </Text>
              <View style={styles.accentTrack}>
                <Animated.View
                  style={[
                    styles.accentBar,
                    { opacity: focus, transform: [{ scaleX: accentScale }] },
                  ]}
                />
              </View>
            </View>

            <Animated.View
              pointerEvents="none"
              style={[
                StyleSheet.absoluteFill,
                styles.activeBorder,
                { opacity: focus },
              ]}
            />
          </View>
        </Animated.View>
      </View>
    );
  },
);
BenefitCard.displayName = "BenefitCard";

const BenefitsSection = () => {
  const [containerWidth, setContainerWidth] = useState(0);
  const [loopedData, setLoopedData] = useState<LoopedBenefitItem[]>(() =>
    createLoopCopies(0, INITIAL_LOOP_COPIES),
  );

  const listRef = useRef<FlatList<LoopedBenefitItem>>(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const currentIndex = useRef(START_INDEX);
  const currentDataLength = useRef(loopedData.length);
  const isPaused = useRef(false);
  const isAppending = useRef(false);
  const nextCopyIndex = useRef(INITIAL_LOOP_COPIES);
  const autoScrollTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { cardWidth, itemWidth, sidePadding } = useMemo(() => {
    if (containerWidth === 0) {
      return { cardWidth: 0, itemWidth: 0, sidePadding: 0 };
    }
    const calculatedCardWidth = Math.min(268, containerWidth * 0.73);
    const calculatedItemWidth = calculatedCardWidth + CARD_SPACING;
    return {
      cardWidth: calculatedCardWidth,
      itemWidth: calculatedItemWidth,
      sidePadding: (containerWidth - calculatedItemWidth) / 2,
    };
  }, [containerWidth]);

  const handleContainerLayout = useCallback((event: LayoutChangeEvent) => {
    const measuredWidth = Math.round(event.nativeEvent.layout.width);
    setContainerWidth((previousWidth) =>
      previousWidth === measuredWidth ? previousWidth : measuredWidth,
    );
  }, []);

  const clearResumeTimer = useCallback(() => {
    if (!resumeTimer.current) return;
    clearTimeout(resumeTimer.current);
    resumeTimer.current = null;
  }, []);

  const appendMoreCopies = useCallback(() => {
    if (isAppending.current) return;
    isAppending.current = true;

    const additionalItems = createLoopCopies(
      nextCopyIndex.current,
      APPEND_LOOP_COPIES,
    );
    nextCopyIndex.current += APPEND_LOOP_COPIES;
    currentDataLength.current += additionalItems.length;
    setLoopedData((previousData) => [...previousData, ...additionalItems]);

    requestAnimationFrame(() => {
      isAppending.current = false;
    });
  }, []);

  const scheduleAutoScrollResume = useCallback(() => {
    clearResumeTimer();
    resumeTimer.current = setTimeout(() => {
      isPaused.current = false;
    }, RESUME_DELAY);
  }, [clearResumeTimer]);

  const scrollToCard = useCallback(
    (index: number, animated = true) => {
      if (itemWidth === 0) return;
      currentIndex.current = index;
      listRef.current?.scrollToOffset({ offset: index * itemWidth, animated });
    },
    [itemWidth],
  );

  useEffect(() => {
    if (itemWidth === 0) return;

    const offset = currentIndex.current * itemWidth;
    scrollX.setValue(offset);

    const frameId = requestAnimationFrame(() => {
      listRef.current?.scrollToOffset({ offset, animated: false });
    });

    return () => cancelAnimationFrame(frameId);
  }, [itemWidth, scrollX]);

  useEffect(() => {
    if (itemWidth === 0) return;

    autoScrollTimer.current = setInterval(() => {
      if (isPaused.current) return;

      const nextIndex = currentIndex.current + 1;
      if (nextIndex >= currentDataLength.current - APPEND_THRESHOLD) {
        appendMoreCopies();
      }
      scrollToCard(nextIndex, true);
    }, AUTO_SCROLL_DELAY);

    return () => {
      if (autoScrollTimer.current) {
        clearInterval(autoScrollTimer.current);
        autoScrollTimer.current = null;
      }
      clearResumeTimer();
    };
  }, [appendMoreCopies, clearResumeTimer, itemWidth, scrollToCard]);

  const updateCurrentIndex = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      if (itemWidth === 0) return;
      const offsetX = event.nativeEvent.contentOffset.x;
      const nearestIndex = Math.round(offsetX / itemWidth);
      currentIndex.current = nearestIndex;
      if (nearestIndex >= currentDataLength.current - APPEND_THRESHOLD) {
        appendMoreCopies();
      }
    },
    [appendMoreCopies, itemWidth],
  );

  const handleScrollBeginDrag = useCallback(() => {
    isPaused.current = true;
    clearResumeTimer();
  }, [clearResumeTimer]);

  const handleScrollEndDrag = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      updateCurrentIndex(event);
      scheduleAutoScrollResume();
    },
    [scheduleAutoScrollResume, updateCurrentIndex],
  );

  const handleMomentumScrollEnd = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      updateCurrentIndex(event);
      scheduleAutoScrollResume();
    },
    [scheduleAutoScrollResume, updateCurrentIndex],
  );

  const renderItem = useCallback(
    ({ item, index }: ListRenderItemInfo<LoopedBenefitItem>) => (
      <BenefitCard
        title={item.title}
        description={item.description}
        icon={item.icon}
        visualType={item.visualType}
        index={index}
        scrollX={scrollX}
        cardWidth={cardWidth}
        itemWidth={itemWidth}
      />
    ),
    [cardWidth, itemWidth, scrollX],
  );

  const getItemLayout = useCallback(
    (
      _data: ArrayLike<LoopedBenefitItem> | null | undefined,
      index: number,
    ) => ({
      length: itemWidth,
      offset: itemWidth * index,
      index,
    }),
    [itemWidth],
  );

  if (BENEFIT_COUNT === 0) return null;

  return (
    <View style={styles.container} onLayout={handleContainerLayout}>
      {containerWidth > 0 && itemWidth > 0 && (
        <Animated.FlatList
          ref={listRef}
          data={loopedData}
          keyExtractor={(item) => item.uid}
          horizontal
          initialScrollIndex={START_INDEX}
          showsHorizontalScrollIndicator={false}
          bounces={false}
          overScrollMode="never"
          decelerationRate="fast"
          snapToInterval={itemWidth}
          snapToAlignment="start"
          disableIntervalMomentum
          contentContainerStyle={[
            styles.listContent,
            { paddingHorizontal: sidePadding },
          ]}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: true },
          )}
          scrollEventThrottle={16}
          onScrollBeginDrag={handleScrollBeginDrag}
          onScrollEndDrag={handleScrollEndDrag}
          onMomentumScrollEnd={handleMomentumScrollEnd}
          onEndReached={appendMoreCopies}
          onEndReachedThreshold={2}
          renderItem={renderItem}
          getItemLayout={getItemLayout}
          removeClippedSubviews={false}
          initialNumToRender={7}
          maxToRenderPerBatch={7}
          updateCellsBatchingPeriod={30}
          windowSize={9}
          onScrollToIndexFailed={({ index }) => {
            listRef.current?.scrollToOffset({
              offset: index * itemWidth,
              animated: false,
            });
          }}
        />
      )}
    </View>
  );
};

export default BenefitsSection;

const styles = StyleSheet.create({
  container: {
    marginTop: theme.spacing.lg,
    overflow: "hidden",
    backgroundColor: theme.colors.background,
  },
  listContent: { paddingVertical: 18 },
  cardSlot: { alignItems: "center", justifyContent: "center" },
  cardAnimatedContainer: {
    borderRadius: theme.radius.lg,
    shadowColor: theme.colors.primary,
    shadowOpacity: 0.14,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },
  card: {
    height: CARD_HEIGHT,
    overflow: "hidden",
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.card,
  },
  animatedVisual: {
    position: "absolute",
    top: 0,
    right: -10,
    left: -10,
    height: 145,
  },
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
  cardContent: {
    position: "absolute",
    right: 0,
    bottom: 0,
    left: 0,
    paddingHorizontal: 15,
    paddingBottom: 14,
  },
  iconWrapper: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 9,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(215,255,63,0.28)",
    backgroundColor: "rgba(213, 255, 63, 0.06)",
    position: "absolute",
    right: 20,
    top: -20,
  },
  title: {
    color: theme.colors.text,
    fontSize: 17,
    fontWeight: "800",
    letterSpacing: -0.3,
    marginBottom: 5,
  },
  description: {
    color: theme.colors.textSecondary,
    fontSize: 11.5,
    lineHeight: 17,
  },
  accentTrack: {
    width: 56,
    height: 3,
    overflow: "hidden",
    marginTop: 11,
    borderRadius: 2,
    backgroundColor: theme.colors.primarySoft,
  },
  accentBar: {
    width: 56,
    height: 3,
    borderRadius: 2,
    backgroundColor: theme.colors.primary,
  },
  activeBorder: {
    borderRadius: theme.radius.lg,
    borderWidth: 1.4,
    borderColor: theme.colors.primary,
  },
});