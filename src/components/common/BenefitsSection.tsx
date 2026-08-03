import { memo, useCallback, useEffect, useRef, useState } from "react";
import {
  FlatList,
  LayoutChangeEvent,
  ListRenderItemInfo,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { benefitsConfig } from "@/utils/constants/benefitsConfig";
import { theme } from "@/utils/theme/Theme";
import type { LoopedBenefitItem } from "@/utils/types/Apptypes";

const CARD_SIDE_PADDING = 0;
const AUTO_SCROLL_DELAY = 2500;
const RESUME_DELAY = 3500;
const LOOP_COPIES = 40;

const BENEFIT_COUNT = benefitsConfig.length;

const START_INDEX = Math.floor(LOOP_COPIES / 2) * BENEFIT_COUNT;

const loopedData: LoopedBenefitItem[] = Array.from(
  { length: LOOP_COPIES },
  (_, copyIndex) =>
    benefitsConfig.map((item) => ({
      ...item,
      uid: `${copyIndex}-${item.id}`,
    })),
).flat();

type BenefitCardProps = {
  title: string;
  description: string;

  icon: React.ComponentType<{
    size?: number;
    color: string;
    strokeWidth?: number;
  }>;
  cardWidth: number;
};

const BenefitCard = memo(
  ({ title, description, icon: Icon, cardWidth }: BenefitCardProps) => (
    <View style={[styles.card, { width: cardWidth }]}>
      <View style={styles.iconWrap}>
        <Icon size={22} color={theme.colors.primary} strokeWidth={2.2} />
      </View>
      <View style={styles.textCol}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.description} numberOfLines={2}>
          {description}
        </Text>
      </View>
    </View>
  ),
);
BenefitCard.displayName = "BenefitCard";

const BenefitsSection = () => {
  const [containerWidth, setContainerWidth] = useState(0);

  const listRef = useRef<FlatList<LoopedBenefitItem>>(null);
  const currentIndex = useRef(START_INDEX);
  const isPaused = useRef(false);
  const autoScrollTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cardWidth =
    containerWidth > 0 ? containerWidth - CARD_SIDE_PADDING * 2 : 0;
  const slideWidth = containerWidth;

  const handleContainerLayout = useCallback((event: LayoutChangeEvent) => {
    const measuredWidth = Math.round(event.nativeEvent.layout.width);
    setContainerWidth((prev) =>
      prev === measuredWidth ? prev : measuredWidth,
    );
  }, []);

  const clearResumeTimer = useCallback(() => {
    if (!resumeTimer.current) return;
    clearTimeout(resumeTimer.current);
    resumeTimer.current = null;
  }, []);

  const scheduleAutoScrollResume = useCallback(() => {
    clearResumeTimer();
    resumeTimer.current = setTimeout(() => {
      isPaused.current = false;
    }, RESUME_DELAY);
  }, [clearResumeTimer]);

  const scrollToIndex = useCallback(
    (index: number, animated = true) => {
      if (slideWidth === 0) return;
      currentIndex.current = index;
      listRef.current?.scrollToOffset({ offset: index * slideWidth, animated });
    },
    [slideWidth],
  );

  useEffect(() => {
    if (slideWidth === 0) return;
    const offset = currentIndex.current * slideWidth;
    const frameId = requestAnimationFrame(() => {
      listRef.current?.scrollToOffset({ offset, animated: false });
    });
    return () => cancelAnimationFrame(frameId);
  }, [slideWidth]);

  useEffect(() => {
    if (slideWidth === 0) return;

    autoScrollTimer.current = setInterval(() => {
      if (isPaused.current) return;

      const nextIndex = currentIndex.current + 1;
      const isNearEnd = nextIndex >= loopedData.length - BENEFIT_COUNT;
      scrollToIndex(isNearEnd ? START_INDEX : nextIndex, true);
    }, AUTO_SCROLL_DELAY);

    return () => {
      if (autoScrollTimer.current) {
        clearInterval(autoScrollTimer.current);
        autoScrollTimer.current = null;
      }
      clearResumeTimer();
    };
  }, [clearResumeTimer, slideWidth, scrollToIndex]);

  const handleScrollBeginDrag = useCallback(() => {
    isPaused.current = true;
    clearResumeTimer();
  }, [clearResumeTimer]);

  const handleScrollSettle = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      if (slideWidth === 0) return;
      const offsetX = event.nativeEvent.contentOffset.x;
      currentIndex.current = Math.round(offsetX / slideWidth);
      scheduleAutoScrollResume();
    },
    [slideWidth, scheduleAutoScrollResume],
  );

  // --- FlatList rendering ---
  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<LoopedBenefitItem>) => (
      <View style={{ width: slideWidth, alignItems: "center" }}>
        <BenefitCard
          title={item.title}
          description={item.description}
          icon={item.icon}
          cardWidth={cardWidth}
        />
      </View>
    ),
    [cardWidth, slideWidth],
  );

  const getItemLayout = useCallback(
    (
      _data: ArrayLike<LoopedBenefitItem> | null | undefined,
      index: number,
    ) => ({
      length: slideWidth,
      offset: slideWidth * index,
      index,
    }),
    [slideWidth],
  );

  if (BENEFIT_COUNT === 0) return null;

  return (
    <View style={styles.container} onLayout={handleContainerLayout}>
      {slideWidth > 0 && (
        <FlatList
          ref={listRef}
          data={loopedData}
          keyExtractor={(item) => item.uid}
          horizontal
          initialScrollIndex={START_INDEX}
          showsHorizontalScrollIndicator={false}
          bounces={false}
          overScrollMode="never"
          decelerationRate="fast"
          snapToInterval={slideWidth}
          snapToAlignment="start"
          disableIntervalMomentum
          onScrollBeginDrag={handleScrollBeginDrag}
          onScrollEndDrag={handleScrollSettle}
          onMomentumScrollEnd={handleScrollSettle}
          renderItem={renderItem}
          getItemLayout={getItemLayout}
          initialNumToRender={5}
          maxToRenderPerBatch={5}
          windowSize={7}
          onScrollToIndexFailed={({ index }) => {
            listRef.current?.scrollToOffset({
              offset: index * slideWidth,
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
  container: { marginTop: 15, marginBottom: 10 },
  card: {
    flexDirection: "row",
    alignItems: "center",
    height: 76,
    paddingHorizontal: 16,
    marginHorizontal: 4,
    borderRadius: 18,
    backgroundColor: theme.colors.card,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    // subtle shadow to lift the card off the background
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  iconWrap: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 14,
    backgroundColor: theme.colors.primarySoft,
    marginRight: 14,
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  textCol: { flex: 1 },
  title: {
    color: theme.colors.text,
    fontSize: 14.5,
    fontWeight: "700",
    marginBottom: 3,
    letterSpacing: 0.1,
  },
  description: {
    color: theme.colors.textSecondary,
    fontSize: 12,
    lineHeight: 16,
  },
});
