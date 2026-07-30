import React, { useEffect, useRef, useState } from "react";

import {
  FlatList,
  type ListRenderItemInfo,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

import { Stack, type Href, useRouter } from "expo-router";

import { SafeAreaView } from "react-native-safe-area-context";

import type { Feature, OnboardingPage } from "@/utils/types/Apptypes";

import {
  GET_STARTED_COLORS as COLORS,
  pages,
} from "../assets/data/GetStartedData";

import { ArrowIcon, RocketIcon } from "../assets/svg/SvgIcons";

const LOGIN_ROUTE = "/loginScreen";

const BASE_WIDTH = 390;
const BASE_HEIGHT = 844;

const clamp = (value: number, minimum: number, maximum: number) => {
  return Math.min(Math.max(value, minimum), maximum);
};

const GetStartedAnimation = () => {
  const router = useRouter();

  const { width, height } = useWindowDimensions();

  const flatListRef = useRef<FlatList<OnboardingPage>>(null);

  const currentPageRef = useRef(0);

  const [currentPage, setCurrentPage] = useState(0);

  const responsiveScale = clamp(
    Math.min(width / BASE_WIDTH, height / BASE_HEIGHT),
    0.75,
    1.35
  );

  const styles = createStyles(width, height, responsiveScale);

  const featureIconSize = clamp(21 * responsiveScale, 18, 30);

  const buttonIconSize = clamp(20 * responsiveScale, 18, 28);

  const isLastPage = currentPage === pages.length - 1;

  useEffect(() => {
    const timeout = setTimeout(() => {
      flatListRef.current?.scrollToOffset({
        offset: currentPageRef.current * width,
        animated: false,
      });
    }, 50);

    return () => clearTimeout(timeout);
  }, [width]);

  const updateCurrentPage = (index: number) => {
    currentPageRef.current = index;
    setCurrentPage(index);
  };

  const handleScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const pageIndex = Math.round(event.nativeEvent.contentOffset.x / width);

    const validPageIndex = Math.max(0, Math.min(pageIndex, pages.length - 1));

    updateCurrentPage(validPageIndex);
  };

  const moveToPage = (index: number) => {
    const validPageIndex = Math.max(0, Math.min(index, pages.length - 1));

    flatListRef.current?.scrollToOffset({
      offset: validPageIndex * width,
      animated: true,
    });

    updateCurrentPage(validPageIndex);
  };

  const handleGetStarted = () => {
    router.replace(LOGIN_ROUTE);
  };

  const handleButtonPress = () => {
    if (isLastPage) {
      handleGetStarted();
      return;
    }

    moveToPage(currentPage + 1);
  };

  const renderFeature = (feature: Feature) => {
    const FeatureIcon = feature.icon;

    return (
      <View key={feature.id} style={styles.featureRow}>
        <View
          style={[
            styles.featureIconContainer,
            {
              backgroundColor: feature.iconBackground,
            },
          ]}
        >
          <FeatureIcon color={feature.iconColor} size={featureIconSize} />
        </View>

        <View style={styles.featureTextContainer}>
          <Text style={styles.featureTitle}>{feature.title}</Text>

          <Text style={styles.featureDescription}>{feature.description}</Text>
        </View>
      </View>
    );
  };

  const renderPage = ({ item }: ListRenderItemInfo<OnboardingPage>) => {
    return (
      <View style={[styles.page, { width }]}>
        <View style={styles.pageContent}>
          <View style={styles.headingContainer}>
            <Text style={styles.title}>{item.title}</Text>

            <Text style={styles.highlightedTitle}>{item.highlightedTitle}</Text>

            <Text style={styles.description}>{item.description}</Text>
          </View>

          <View style={styles.featuresContainer}>
            {item.features.map(renderFeature)}
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* <Stack.Screen
        options={{
          headerShown: false,
          animation: "fade",
        }}
      /> */}

      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />

      <FlatList
        ref={flatListRef}
        data={pages}
        renderItem={renderPage}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        bounces={false}
        overScrollMode="never"
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScrollEnd}
        style={styles.flatList}
        getItemLayout={(_, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
      />

      <View style={styles.footer}>
        <Pressable
          onPress={handleButtonPress}
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
          ]}
        >
          <Text style={styles.buttonText}>
            {isLastPage ? "Get Started" : "Next"}
          </Text>

          {isLastPage ? (
            <RocketIcon color={COLORS.background} size={buttonIconSize} />
          ) : (
            <ArrowIcon color={COLORS.background} size={buttonIconSize} />
          )}
        </Pressable>

        <View style={styles.dotsContainer}>
          {pages.map((page, index) => {
            const isActive = currentPage === index;

            return (
              <Pressable
                key={page.id}
                hitSlop={10}
                accessibilityRole="button"
                accessibilityLabel={`Go to onboarding page ${index + 1}`}
                onPress={() => moveToPage(index)}
                style={[styles.dot, isActive && styles.activeDot]}
              />
            );
          })}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default GetStartedAnimation;

const createStyles = (width: number, height: number, scale: number) => {
  const contentWidth = Math.min(width * 0.85, 640);

  const topPadding = clamp(height * 0.052, 28, 70);

  const footerBottomPadding = clamp(height * 0.021, 14, 28);

  const headingFontSize = clamp(29 * scale, 22, 42);

  const headingLineHeight = clamp(35 * scale, 28, 50);

  const descriptionFontSize = clamp(14 * scale, 12, 19);

  const descriptionLineHeight = clamp(21 * scale, 17, 27);

  const featureTitleFontSize = clamp(14 * scale, 12, 19);

  const featureTitleLineHeight = clamp(19 * scale, 16, 26);

  const featureDescriptionFontSize = clamp(11.5 * scale, 10, 16);

  const featureDescriptionLineHeight = clamp(17 * scale, 14, 23);

  const iconContainerSize = clamp(42 * scale, 34, 58);

  const buttonHeight = clamp(52 * scale, 44, 68);

  const buttonFontSize = clamp(14 * scale, 12, 19);

  const dotSize = clamp(7 * scale, 6, 10);

  const activeDotSize = clamp(8 * scale, 7, 11);

  return StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: COLORS.background,
    },

    flatList: {
      flex: 1,
    },

    page: {
      flex: 1,
    },

    pageContent: {
      flex: 1,
      width: contentWidth,
      alignSelf: "center",
      paddingTop: topPadding,
    },

    headingContainer: {
      marginBottom: clamp(35 * scale, 24, 48),
    },

    title: {
      color: COLORS.text,
      fontSize: headingFontSize,
      lineHeight: headingLineHeight,
      fontWeight: "800",
    },

    highlightedTitle: {
      color: COLORS.primary,
      fontSize: headingFontSize,
      lineHeight: headingLineHeight,
      fontWeight: "800",
    },

    description: {
      marginTop: clamp(13 * scale, 9, 18),
      color: COLORS.muted,
      fontSize: descriptionFontSize,
      lineHeight: descriptionLineHeight,
      fontWeight: "400",
    },

    featuresContainer: {
      gap: clamp(23 * scale, 16, 32),
    },

    featureRow: {
      flexDirection: "row",
      alignItems: "center",
    },

    featureIconContainer: {
      width: iconContainerSize,
      height: iconContainerSize,
      borderRadius: clamp(11 * scale, 9, 15),
      alignItems: "center",
      justifyContent: "center",
    },

    featureTextContainer: {
      flex: 1,
      marginLeft: clamp(14 * scale, 10, 20),
    },

    featureTitle: {
      color: COLORS.text,
      fontSize: featureTitleFontSize,
      lineHeight: featureTitleLineHeight,
      fontWeight: "700",
    },

    featureDescription: {
      marginTop: clamp(3 * scale, 2, 5),
      color: COLORS.muted,
      fontSize: featureDescriptionFontSize,
      lineHeight: featureDescriptionLineHeight,
    },

    footer: {
      width: contentWidth,
      alignSelf: "center",
      paddingTop: clamp(12 * scale, 8, 18),
      paddingBottom: footerBottomPadding,
    },

    button: {
      height: buttonHeight,
      borderRadius: clamp(8 * scale, 7, 12),
      backgroundColor: COLORS.primary,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: clamp(9 * scale, 7, 13),
    },

    buttonPressed: {
      opacity: 0.85,
    },

    buttonText: {
      color: COLORS.background,
      fontSize: buttonFontSize,
      fontWeight: "800",
    },

    dotsContainer: {
      height: clamp(31 * scale, 24, 42),
      marginTop: clamp(10 * scale, 7, 14),
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: clamp(8 * scale, 6, 12),
    },

    dot: {
      width: dotSize,
      height: dotSize,
      borderRadius: dotSize / 2,
      backgroundColor: COLORS.muted,
      opacity: 0.4,
    },

    activeDot: {
      width: activeDotSize,
      height: activeDotSize,
      borderRadius: activeDotSize / 2,
      backgroundColor: COLORS.primary,
      opacity: 1,
    },
  });
};
