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
  BenefitCardInternalProps,
  LoopedBenefitItem,
} from "@/utils/types/Apptypes";
import { BenefitVisual } from "./BenefitVisuals";

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

  const handleScrollSettle = useCallback(
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
          onScrollEndDrag={handleScrollSettle}
          onMomentumScrollEnd={handleScrollSettle}
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
  cardContent: {
    position: "absolute",
    right: 0,
    bottom: 0,
    left: 0,
    paddingHorizontal: 15,
    paddingBottom: 14,
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
