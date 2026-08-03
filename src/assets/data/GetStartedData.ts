import { OnboardingPage } from "@/utils/types/Apptypes";

import {
  BuildIcon,
  GrowthIcon,
  LessonsIcon,
  ProgressIcon,
  SkillsIcon,
  TasksIcon,
} from "../svg/SvgIcons";
import { theme } from "@/utils/theme/Theme";

export const pages: OnboardingPage[] = [
  {
    id: "page-1",
    title: "Code better.",
    highlightedTitle: "Learn smarter.",
    description: "Master React Native with hands\non learning.",
    features: [
      {
        id: "build",
        title: "Learn by building",
        description: "Practical, real-world projects.",
        icon: BuildIcon,
        iconColor: theme.colors.primary,
        iconBackground: theme.colors.primarySoft,
      },
      {
        id: "progress",
        title: "Track progress",
        description: "Analytics to keep you on track.",
        icon: ProgressIcon,
        iconColor: theme.colors.secondary,
        iconBackground: theme.colors.secondarySoft,
      },
      {
        id: "skills",
        title: "Level up skills",
        description: "Quizzes, tasks and challenges.",
        icon: SkillsIcon,
        iconColor: theme.colors.accent,
        iconBackground: theme.colors.accentSoft,
      },
    ],
  },
  {
    id: "page-2",
    title: "Practice daily.",
    highlightedTitle: "Build confidently.",
    description:
      "Turn your knowledge into real skills with\npractical exercises.",
    features: [
      {
        id: "lessons",
        title: "Easy-to-follow lessons",
        description: "Understand each concept step by step.",
        icon: LessonsIcon,
        iconColor: theme.colors.primary,
        iconBackground: theme.colors.primarySoft,
      },
      {
        id: "tasks",
        title: "Complete practical tasks",
        description: "Practice JavaScript, TypeScript and React Native.",
        icon: TasksIcon,
        iconColor: theme.colors.secondary,
        iconBackground: theme.colors.secondarySoft,
      },
      {
        id: "growth",
        title: "Grow your knowledge",
        description: "Complete topics and achieve your goals.",
        icon: GrowthIcon,
        iconColor: theme.colors.accent,
        iconBackground: theme.colors.accentSoft,
      },
    ],
  },
];