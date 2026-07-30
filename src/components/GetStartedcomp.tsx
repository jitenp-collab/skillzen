import React, { useEffect, useRef, useState } from "react";

import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

import { Stack, useRouter } from "expo-router";
import { Feature } from "@/utils/types/Apptypes";

import { pages } from "../assets/data/GetStartedData";
import { theme } from "../utils/theme/Theme";
import { ArrowIcon, RocketIcon, AppLogo } from "../assets/svg/SvgIcons";

import AppButton from "@/components/common/AppButton";

const GetStartedAnimation = () => {
  const router = useRouter();
  const { width } = useWindowDimensions();

  const scrollViewRef = useRef<ScrollView>(null);
  const [currentPage, setCurrentPage] = useState(0);

  const isLastPage = currentPage === pages.length - 1;

  useEffect(() => {
    scrollViewRef.current?.scrollTo({
      x: currentPage * width,
      animated: false,
    });
  }, [width]);

  const handleScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const pageIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentPage(pageIndex);
  };

  const moveToPage = (pageIndex: number) => {
    scrollViewRef.current?.scrollTo({
      x: pageIndex * width,
      animated: true,
    });
    setCurrentPage(pageIndex);
  };

  const handleButtonPress = () => {
    if (isLastPage) {
      router.replace("/loginScreen");
    } else {
      moveToPage(currentPage + 1);
    }
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
          <FeatureIcon color={feature.iconColor} size={40} />
        </View>

        <View style={styles.featureTextContainer}>
          <Text style={styles.featureTitle}>{feature.title}</Text>

          <Text style={styles.featureDescription}>{feature.description}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* <Stack.Screen
    <View style={styles.safeArea}>
      <Stack.Screen
        options={{
          headerShown: false,
          animation: "fade",
        }}
      /> */}
      />
      <View style={styles.appHeader}>
        <AppLogo width={60} height={60} />

        <Text style={styles.appName}>SkillZen</Text>
      </View>

      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollView}
        horizontal
        pagingEnabled
        bounces={false}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScrollEnd}
      >
        {pages.map((item) => (
          <View key={item.id} style={[styles.page, { width }]}>
            <View style={styles.pageContent}>
              <View style={styles.headingContainer}>
                <Text style={styles.title}>{item.title}</Text>

                <Text style={styles.highlightedTitle}>
                  {item.highlightedTitle}
                </Text>

                <Text style={styles.description}>{item.description}</Text>
              </View>

              <View style={styles.featuresContainer}>
                {item.features.map(renderFeature)}
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <AppButton
          title={isLastPage ? "Get Started" : "Next"}
          onPress={handleButtonPress}
          icon={
            isLastPage ? (
              <RocketIcon color={theme.colors.background} size={20} />
            ) : (
              <ArrowIcon color={theme.colors.background} size={20} />
            )
          }
        />

        <View style={styles.dotsContainer}>
          {pages.map((page, index) => (
            <Pressable
              key={page.id}
              hitSlop={10}
              onPress={() => moveToPage(index)}
              style={[styles.dot, currentPage === index && styles.activeDot]}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

export default GetStartedAnimation;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingTop: 15,
    paddingBottom: 20,
    alignItems: "center",
  },
  appHeader: {
    paddingBottom: 15,
    width: "95%",
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
  },

  appName: {
    marginLeft: 10,
    color: theme.colors.text,
    fontSize: 30,
    fontWeight: "800",
  },

  scrollView: {
    flex: 1,
  },

  page: {
    flex: 1,
  },

  pageContent: {
    flex: 1,
    width: "95%",
    alignSelf: "center",
  },

  headingContainer: {
    marginBottom: 20,
  },

  title: {
    color: theme.colors.text,
    fontSize: 29,
    lineHeight: 35,
    fontWeight: "800",
  },

  highlightedTitle: {
    color: theme.colors.primary,
    fontSize: 35,
    lineHeight: 35,
    fontWeight: "800",
  },

  description: {
    marginTop: 5,
    color: theme.colors.muted,
    fontSize: 14,
  },

  featuresContainer: {
    flex: 1,
    justifyContent: "flex-start",
  },

  featureRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 15,
  },

  featureIconContainer: {
    width: 55,
    height: 55,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },

  featureTextContainer: {
    flex: 1,
    marginLeft: 14,
  },

  featureTitle: {
    color: theme.colors.text,
    fontSize: 18,
    lineHeight: 25,
    fontWeight: "700",
  },

  featureDescription: {
    marginTop: 3,
    color: theme.colors.muted,
    fontSize: 13,
    lineHeight: 17,
  },

  footer: {
    width: "95%",
    paddingTop: 10,
    paddingBottom: 14,
  },

  dotsContainer: {
    height: 30,
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: theme.colors.muted,
    opacity: 0.4,
  },

  activeDot: {
    width: 20,
    backgroundColor: theme.colors.primary,
    opacity: 1,
  },
});
