import type { ComponentType } from "react";

export type GetStartedIconProps = {
  size?: number;
  color: string;
};

export type IconComponent = ComponentType<GetStartedIconProps>;

export type Feature = {
  id: string;
  title: string;
  description: string;
  icon: IconComponent;
  iconColor: string;
  iconBackground: string;
};

export type OnboardingPage = {
  id: string;
  title: string;
  highlightedTitle: string;
  description: string;
  features: Feature[];
};
