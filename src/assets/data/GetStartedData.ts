import type { OnboardingPage } from "@/utils/types/Apptypes";

import {
  BuildIcon,
  GrowthIcon,
  LessonsIcon,
  ProgressIcon,
  SkillsIcon,
  TasksIcon,
} from "../svg/SvgIcons";

export const GET_STARTED_COLORS = {
  background: "#0B1020",
  surface: "#12192B",
  card: "#18233A",
  border: "#243047",

  primary: "#D7FF3F",
  secondary: "#8B5CF6",
  accent: "#22D3EE",

  text: "#F8FAFC",
  muted: "#94A3B8",
} as const;

export const pages: OnboardingPage[] = [
  {
    id: "page-1",
    title: "Code better.",
    highlightedTitle: "Learn smarter.",
    description: "Master React Native with\nhands-on learning.",
    features: [
      {
        id: "build",
        title: "Learn by building",
        description: "Practical, real-world projects.",
        icon: BuildIcon,
        iconColor: GET_STARTED_COLORS.primary,
        iconBackground: "rgba(215, 255, 63, 0.12)",
      },
      {
        id: "progress",
        title: "Track progress",
        description: "Analytics to keep you on track.",
        icon: ProgressIcon,
        iconColor: GET_STARTED_COLORS.secondary,
        iconBackground: "rgba(139, 92, 246, 0.14)",
      },
      {
        id: "skills",
        title: "Level up skills",
        description: "Quizzes, tasks and challenges.",
        icon: SkillsIcon,
        iconColor: GET_STARTED_COLORS.accent,
        iconBackground: "rgba(34, 211, 238, 0.12)",
      },
    ],
  },
  {
    id: "page-2",
    title: "Practice daily.",
    highlightedTitle: "Build confidently.",
    description:
      "Turn your knowledge into real skills\nwith practical exercises.",
    features: [
      {
        id: "lessons",
        title: "Easy-to-follow lessons",
        description: "Understand each concept step by step.",
        icon: LessonsIcon,
        iconColor: GET_STARTED_COLORS.primary,
        iconBackground: "rgba(215, 255, 63, 0.12)",
      },
      {
        id: "tasks",
        title: "Complete practical tasks",
        description: "Practice JavaScript, TypeScript and React Native.",
        icon: TasksIcon,
        iconColor: GET_STARTED_COLORS.secondary,
        iconBackground: "rgba(139, 92, 246, 0.14)",
      },
      {
        id: "growth",
        title: "Grow your knowledge",
        description: "Complete topics and achieve your goals.",
        icon: GrowthIcon,
        iconColor: GET_STARTED_COLORS.accent,
        iconBackground: "rgba(34, 211, 238, 0.12)",
      },
    ],
  },
];
