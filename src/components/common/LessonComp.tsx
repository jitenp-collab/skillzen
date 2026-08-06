import { Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useLocalSearchParams, useRouter } from "expo-router";

import { AppDispatch, RootState } from "@/redux/store";
import { theme } from "@/utils/theme/Theme";
import AppButton from "../reusableComponents/AppButton";
import {
  BackIcon,
  ChevronRightIcon,
  DoneIcon,
  QuestionIcon,
} from "../../assets/svg/SvgIcons";
import { useEffect, useState } from "react";
import { updateTopicProgress } from "@/redux/actions";

const LessonComp = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const { selectLessons, currentUser } = useSelector(
    (state: RootState) => state.global,
  );

  const { categoryTitle, topicId } = useLocalSearchParams<{
    categoryTitle: string;
    topicId: string;
  }>();

  // Find saved progress for this exact topic (if any)
  const savedProgress = currentUser?.userData?.find(
    (entry) =>
      entry.categoryTitle === categoryTitle && entry.topicId === topicId,
  );

  const [currentLessonIndex, setCurrentLessonIndex] = useState(
    savedProgress?.completed ? 0 : (savedProgress?.lastLessonIndex ?? 0),
  );
  // Safe array
  const lessons = selectLessons ?? [];
  const lesson = lessons[currentLessonIndex];
  const isLastLesson = currentLessonIndex === lessons.length - 1;

  // Save progress whenever the lesson index changes (Next / Previous)
  useEffect(() => {
    if (!categoryTitle || !topicId) return;

    dispatch(
      updateTopicProgress({
        categoryTitle,
        topicId,
        lastLessonIndex: currentLessonIndex,
        completed: isLastLesson,
      }),
    );
  }, [currentLessonIndex]);

  const handleDone = () => {
    if (categoryTitle && topicId) {
      dispatch(
        updateTopicProgress({
          categoryTitle,
          topicId,
          lastLessonIndex: currentLessonIndex,
          completed: true,
        }),
      );
    }
    router.back();
  };

  return (
    <View style={styles.container}>
      {/* ---------------- Header ---------------- */}

      <View style={styles.header}>
        <View style={styles.headerRow}>
          <AppButton
            onPress={() => router.back()}
            backgroundColor="transparent"
            icon={<BackIcon size={34} />}
            style={styles.backButton}
          />

          <Text style={styles.lessonTitle}>
            {lesson?.title ?? "Lesson Title"}
          </Text>

          {/* Spacer to balance the back button */}
          <View style={styles.headerSpacer} />
        </View>

        <Text style={styles.lessonCount}>
          Lesson {currentLessonIndex + 1} of {lessons.length}
        </Text>
      </View>

      {/* ---------------- Progress ---------------- */}

      <View style={styles.progressContainer}>
        <View style={styles.progressTrack}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${
                  lessons.length === 0
                    ? 0
                    : ((currentLessonIndex + 1) / lessons.length) * 100
                }%`,
              },
            ]}
          />
        </View>

        <Text style={styles.progressText}>
          {lessons.length === 0
            ? 0
            : Math.round(((currentLessonIndex + 1) / lessons.length) * 100)}
          %
        </Text>
      </View>

      {/* ---------------- Content ---------------- */}

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Overview */}

        <Text style={styles.sectionTitle}>Overview</Text>

        <Text style={styles.overviewText}>{lesson?.overview}</Text>

        {/* Example */}

        <Text style={styles.sectionTitle}>Example</Text>

        <View style={styles.exampleCard}>
          <Text style={styles.exampleTitle}>{lesson?.example?.title}</Text>

          <View style={styles.codeCard}>
            <Text selectable style={styles.codeText}>
              {lesson?.example?.content}
            </Text>
          </View>
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* ---------------- Footer ---------------- */}

      <View style={styles.footer}>
        {/* Left Button */}
        <AppButton
          icon={
            isLastLesson ? (
              <QuestionIcon color={theme.colors.white} />
            ) : (
              <BackIcon />
            )
          }
          iconPosition="left"
          title={isLastLesson ? "Quiz" : "Previous"}
          width="48%"
          disabled={!isLastLesson && currentLessonIndex === 0}
          onPress={() => {
            if (isLastLesson) {
              // Navigate to Quiz Screen
              router.navigate("/(stackScreens)/QuizScreen");
            } else {
              if (currentLessonIndex > 0) {
                setCurrentLessonIndex((prev) => prev - 1);
              }
            }
          }}
          backgroundColor={
            isLastLesson ? theme.colors.secondary : theme.colors.card
          }
          textColor={isLastLesson ? theme.colors.white : theme.colors.text}
          borderwidth={1}
          bordercolor={
            isLastLesson ? theme.colors.secondary : theme.colors.border
          }
        />

        {/* Right Button */}
        <AppButton
          icon={
            isLastLesson ? (
              <DoneIcon color={theme.colors.black} />
            ) : (
              <ChevronRightIcon color={theme.colors.black} />
            )
          }
          iconPosition="right"
          title={isLastLesson ? "Done" : "Next"}
          width="48%"
          onPress={() => {
            if (isLastLesson) {
              handleDone();
            } else {
              setCurrentLessonIndex((prev) => prev + 1);
            }
          }}
          backgroundColor={theme.colors.primary}
          textColor={theme.colors.black}
        />
      </View>
    </View>
  );
};

export default LessonComp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },

  header: {
    paddingHorizontal: theme.spacing.md,
    paddingBottom: theme.spacing.md,
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  backButton: {
    width: 40,
    height: 40,
  },

  headerSpacer: {
    width: 40,
  },

  lessonTitle: {
    flex: 1,
    textAlign: "center",
    color: theme.colors.text,
    fontSize: 24,
    fontWeight: "700",
    lineHeight: 32,
  },

  lessonCount: {
    marginTop: 6,
    color: theme.colors.muted,
    fontSize: 15,
    fontWeight: "500",
    textAlign: "left",
  },

  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },

  progressTrack: {
    flex: 1,
    height: 8,
    backgroundColor: theme.colors.border,
    borderRadius: theme.radius.round,
    overflow: "hidden",
    marginRight: 12,
  },

  progressFill: {
    width: "15%",
    height: "100%",
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.round,
  },

  progressText: {
    color: theme.colors.primary,
    fontSize: 14,
    fontWeight: "700",
  },

  scrollView: {
    flex: 1,
    paddingHorizontal: theme.spacing.md,
  },

  sectionTitle: {
    color: theme.colors.primary,
    fontSize: 21,
    fontWeight: "700",
    marginBottom: theme.spacing.sm,
    marginTop: theme.spacing.sm,
  },

  overviewText: {
    color: theme.colors.textSecondary,
    fontSize: 16,
    lineHeight: 28,
    marginBottom: theme.spacing.xl,
  },

  exampleCard: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.md,
  },

  exampleTitle: {
    color: theme.colors.primary,
    fontSize: 17,
    fontWeight: "700",
    marginBottom: theme.spacing.md,
  },
  codeCard: {
    backgroundColor: "#111827",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: 16,
    marginBottom: theme.spacing.lg,
  },

  codeText: {
    color: "#E5E7EB",
    fontSize: 15,
    lineHeight: 26,
    fontFamily: Platform.OS === "ios" ? "Menlo" : "monospace",
  },
  exampleContent: {
    color: theme.colors.textSecondary,
    fontSize: 16,
    lineHeight: 28,
  },

  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
  },
});
