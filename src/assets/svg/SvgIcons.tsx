import type { GetStartedIconProps } from "@/utils/types/Apptypes";

import Svg, { Circle, Line, Path, Polyline, Rect } from "react-native-svg";

export function AppLogo(props: any) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 58 52"
      width={200}
      height={200}
      {...props}
    >
      <Path
        d="M.08.08h57.84v51.84H.08V.08zM15.3 1.83c-2.56.34-3.27 2.81-3.56 5-.62 4.61-.14 8.95 1.19 13.36.38 1.22 1.74 5.74 3.56 5.46 1.18-.19.65-2.33.71-3.15.19-2.59 1.06-5.31 3.12-7.01 2.55-2.1 6.19-1.72 8.95-.28.68.35 1.54 1.48 2.25 1.62.59.11 2.15-.85 2.35-1.41.51-1.4-1.91-4.33-2.7-5.43C27.64 5 21.71.97 15.3 1.83zM31.83 19.5c2.89 1.42 6.69-.76 8.99 3.18 3.44 5.89-6.39 12.11-10.54 14.45-1.26.71-2.97 2.06-4.46 2.15-2 .11-7.52-6.76-8.72-8.53-.61-.89-1.52-3.48-2.62-3.76-1.28-.32-3.12 1.2-4.15 1.84-3.43 2.14-9.06 7.27-6.05 11.72 2.96 4.38 9.97 3.95 14.55 3.55 9.15-.79 20.29-5.41 27.73-10.72 3.16-2.26 6.77-5.32 8.28-9.02 1.92-4.68-.27-8.58-5.28-9.17-5.52-.65-13.53.38-17.73 4.31zM27.7 22.7C28.1 24.6 29.6 26 31.3 26 29.6 26 28.1 27.4 27.7 29.3 27.3 27.4 25.8 26 24.3 26 25.8 26 27.3 24.6 27.7 22.7zm-2.74 21.69c-1.55.97 1.51 2.88 2.19 3.34 2.84 1.96 11.69 5.65 13.4.63.21-.61.5-2.35-.37-2.6-.69-.2-1.69.69-2.31.9-1.5.51-3.46.38-4.98.06-1.37-.28-7.15-2.81-7.93-2.33z"
        fill="#18211a00"
        fillRule="evenodd"
        stroke="#18211a00"
        strokeWidth={0.25}
        strokeLinejoin="round"
      />
      <Path
        d="M15.3 1.83C21.71.97 27.64 5 31.17 9.99c.79 1.1 3.21 4.03 2.7 5.43-.2.56-1.76 1.52-2.35 1.41-.71-.14-1.57-1.27-2.25-1.62-2.76-1.44-6.4-1.82-8.95.28-2.06 1.7-2.93 4.42-3.12 7.01-.06.82.47 2.96-.71 3.15-1.82.28-3.18-4.24-3.56-5.46-1.33-4.41-1.81-8.75-1.19-13.36.29-2.19 1-4.66 3.56-5zM31.83 19.5c4.2-3.93 12.21-4.96 17.73-4.31 5.01.59 7.2 4.49 5.28 9.17-1.51 3.7-5.12 6.76-8.28 9.02-7.44 5.31-18.58 9.93-27.73 10.72-4.58.4-11.59.83-14.55-3.55-3.01-4.45 2.62-9.58 6.05-11.72 1.03-.64 2.87-2.16 4.15-1.84 1.1.28 2.01 2.87 2.62 3.76 1.2 1.77 6.72 8.64 8.72 8.53 1.49-.09 3.2-1.44 4.46-2.15 4.15-2.34 13.98-8.56 10.54-14.45-2.3-3.94-6.1-1.76-8.99-3.18zM27.7 22.7c.4 1.9 1.9 3.3 3.6 3.3-1.7 0-3.2 1.4-3.6 3.3-.4-1.9-1.9-3.3-3.6-3.3 1.7 0 3.2-1.4 3.6-3.3zm-2.74 21.69c.78-.48 6.56 2.05 7.93 2.33 1.52.32 3.48.45 4.98-.06.62-.21 1.62-1.1 2.31-.9.87.25.58 1.99.37 2.6-1.71 5.02-10.56 1.33-13.4-.63-.68-.46-3.74-2.37-2.19-3.34z"
        fill="#cff22e"
        fillRule="evenodd"
        stroke="#cff22e"
        strokeWidth={0.25}
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function PasswordshowIcon({ color = "#94A3B8", ...props }: any) {
  return (
    <Svg
      width="18px"
      height="18px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M1 12s4-8 11-8 11 8 11 8M1 12s4 8 11 8 11-8 11-8"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle
        cx={12}
        cy={12}
        r={3}
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function PasswordHideIcon(props: any) {
  return (
    <Svg
      width="20px"
      height="20px"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        clipRule="evenodd"
        d="M22.693 1.55a.794.794 0 00-1.093.297l-2.447 4.297c-1.667-.78-3.392-1.18-5.139-1.18-4.693 0-9.233 2.882-12.894 8.3l-.015.021-.012.019a.46.46 0 000 .552c2.7 4.013 5.884 6.641 9.255 7.746L8.4 25.022a.817.817 0 00.293 1.108l.347.203a.794.794 0 001.092-.297L23.332 2.86a.817.817 0 00-.293-1.108l-.346-.203zm-4.601 6.457c-1.357-.597-2.727-.888-4.078-.888-3.41 0-6.94 1.854-10.075 5.805-.3.38-.3.932 0 1.311 2.35 2.962 4.922 4.746 7.499 5.454l1.348-2.366c-1.54-.49-2.813-1.86-2.813-3.741 0-2.38 1.824-4.308 4.073-4.308 1.038 0 1.986.41 2.705 1.087l1.341-2.354zm-2.453 4.307c-.346-.537-.916-.886-1.593-.886-1.125 0-2.046.963-2.046 2.152 0 .786.843 1.705 1.902 1.782l1.737-3.048z"
        fill="#94A3B8"
        fillRule="evenodd"
      />
      <Path
        d="M14.687 22.176c4.444-.261 8.719-3.107 12.2-8.245A.605.605 0 0027 13.58a.571.571 0 00-.104-.335c-1.338-1.977-2.794-3.616-4.33-4.9l-1.06 1.86c.883.76 1.747 1.665 2.583 2.719.301.38.301.932 0 1.311-2.521 3.178-5.299 5-8.064 5.592l-1.338 2.35z"
        fill="#94A3B8"
      />
    </Svg>
  );
}
const getStrokeProps = (color: string, strokeWidth = 1.8) => ({
  stroke: color,
  strokeWidth,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
});

// Learn by building icon
export const BuildIcon = ({ size = 22, color }: GetStartedIconProps) => {
  const strokeProps = getStrokeProps(color);

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M14.5 5.5L18.5 9.5L9 19H5V15L14.5 5.5Z" {...strokeProps} />

      <Line x1="12.5" y1="7.5" x2="16.5" y2="11.5" {...strokeProps} />

      <Line x1="5" y1="19" x2="10" y2="19" {...strokeProps} />
    </Svg>
  );
};

// Track progress icon
export const ProgressIcon = ({ size = 22, color }: GetStartedIconProps) => {
  const strokeProps = getStrokeProps(color);

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Polyline points="3,17 9,11 13,15 21,7" {...strokeProps} />

      <Polyline points="15,7 21,7 21,13" {...strokeProps} />
    </Svg>
  );
};

// Level up skills icon
export const SkillsIcon = ({ size = 22, color }: GetStartedIconProps) => {
  const strokeProps = getStrokeProps(color);

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect x="4" y="13" width="3.5" height="7" rx="1" {...strokeProps} />

      <Rect x="10.25" y="9" width="3.5" height="11" rx="1" {...strokeProps} />

      <Rect x="16.5" y="4" width="3.5" height="16" rx="1" {...strokeProps} />
    </Svg>
  );
};

// Lessons icon
export const LessonsIcon = ({ size = 22, color }: GetStartedIconProps) => {
  const strokeProps = getStrokeProps(color);

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M4 5.5C6.8 4.5 9.4 5 12 7V20C9.4 18 6.8 17.5 4 18.5V5.5Z"
        {...strokeProps}
      />

      <Path
        d="M20 5.5C17.2 4.5 14.6 5 12 7V20C14.6 18 17.2 17.5 20 18.5V5.5Z"
        {...strokeProps}
      />
    </Svg>
  );
};

// Practical tasks icon
export const TabTasksIcon = ({ size = 22, color }: GetStartedIconProps) => {
  const strokeProps = getStrokeProps(color);

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect x="5" y="4" width="14" height="16" rx="2" {...strokeProps} />

      <Path
        d="M9 4.5V3.5C9 2.7 9.7 2 10.5 2H13.5C14.3 2 15 2.7 15 3.5V4.5"
        {...strokeProps}
      />

      <Polyline points="8,11 10,13 14,9" {...strokeProps} />

      <Line x1="8" y1="16.5" x2="16" y2="16.5" {...strokeProps} />
    </Svg>
  );
};

// Growth icon
export const GrowthIcon = ({ size = 22, color }: GetStartedIconProps) => {
  const strokeProps = getStrokeProps(color);

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M8 4H16V8C16 11 14.2 13 12 13C9.8 13 8 11 8 8V4Z"
        {...strokeProps}
      />

      <Path d="M8 6H5V8C5 10 6.3 11.5 8.2 11.8" {...strokeProps} />

      <Path d="M16 6H19V8C19 10 17.7 11.5 15.8 11.8" {...strokeProps} />

      <Line x1="12" y1="13" x2="12" y2="17" {...strokeProps} />

      <Line x1="9" y1="20" x2="15" y2="20" {...strokeProps} />

      <Path d="M10 17H14V20H10V17Z" {...strokeProps} />
    </Svg>
  );
};

// Next button arrow
export const ArrowIcon = ({
  size = 22,
  color,
  strokeWidth = 3,
}: GetStartedIconProps) => {
  const strokeProps = getStrokeProps(color, strokeWidth);

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Line x1="4" y1="12" x2="20" y2="12" {...strokeProps} />

      <Polyline points="14,6 20,12 14,18" {...strokeProps} />
    </Svg>
  );
};

// Get Started rocket icon
export const RocketIcon = ({
  size = 22,
  color,
  strokeWidth = 2,
}: GetStartedIconProps) => {
  const strokeProps = getStrokeProps(color, strokeWidth);

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M14 4C17 2.5 20 3 21 3C21 4 21.5 7 20 10L14 16L8 10L14 4Z"
        {...strokeProps}
      />

      <Circle cx="16.5" cy="7.5" r="1.5" {...strokeProps} />

      <Path d="M8 10L5 11L3 14L9 15" {...strokeProps} />

      <Path d="M14 16L13 19L10 21L9 15" {...strokeProps} />

      <Path d="M7 17C5 18 4 20 4 20C4 20 6 19 7 17Z" {...strokeProps} />
    </Svg>
  );
};

export function GoogleIcon(props: any) {
  return (
    <Svg
      width="23px"
      height="23px"
      viewBox="-3 0 262 262"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid"
      {...props}
    >
      <Path
        d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
        fill="#4285F4"
      />
      <Path
        d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
        fill="#34A853"
      />
      <Path
        d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
        fill="#FBBC05"
      />
      <Path
        d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
        fill="#EB4335"
      />
    </Svg>
  );
}

// Home icon - simple house outline
export const HomeIcon = ({
  size = 24,
  color = "#8E8E93",
  strokeWidth = 2,
}: GetStartedIconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M4 11L12 4L20 11V19C20 19.55 19.55 20 19 20H15V14H9V20H5C4.45 20 4 19.55 4 19V11Z"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinejoin="round"
    />
  </Svg>
);

// Topics icon - open book outline
export const TopicsIcon = ({
  size = 24,
  color = "#8E8E93",
  strokeWidth = 2,
}: GetStartedIconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 6C10.5 4.8 8.5 4 6 4C5 4 4 4.2 4 4.2V17.2C4 17.2 5 17 6 17C8.5 17 10.5 17.8 12 19"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12 6C13.5 4.8 15.5 4 18 4C19 4 20 4.2 20 4.2V17.2C20 17.2 19 17 18 17C15.5 17 13.5 17.8 12 19V6Z"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// Tasks icon - checkmark
export const TasksIcon = ({
  size = 24,
  color = "#8E8E93",
  strokeWidth = 2.2,
}: GetStartedIconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M4 12.5L9 17.5L20 6.5"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// Analytics icon - simple bar chart
export const AnalyticsIcon = ({
  size = 24,
  color = "#8E8E93",
  strokeWidth = 2,
}: GetStartedIconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Rect
      x="4"
      y="13"
      width="3"
      height="7"
      rx="1"
      stroke={color}
      strokeWidth={strokeWidth}
    />
    <Rect
      x="10.5"
      y="8"
      width="3"
      height="12"
      rx="1"
      stroke={color}
      strokeWidth={strokeWidth}
    />
    <Rect
      x="17"
      y="4"
      width="3"
      height="16"
      rx="1"
      stroke={color}
      strokeWidth={strokeWidth}
    />
  </Svg>
);

// Profile icon - person outline
export const ProfileIcon = ({
  size = 24,
  color = "#8E8E93",
  strokeWidth = 2,
}: GetStartedIconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="8" r="4" stroke={color} strokeWidth={strokeWidth} />
    <Path
      d="M4 20C4 16.5 7.5 14 12 14C16.5 14 20 16.5 20 20"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
  </Svg>
);

export const NotificationIcon = ({
  size = 24,
  color = "#8E8E93",
  strokeWidth = 2,
}: GetStartedIconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M6 9C6 6.2 8.2 4 11 4H13C15.8 4 18 6.2 18 9V13L20 17H4L6 13V9Z"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M9.5 17C9.5 18.4 10.6 19.5 12 19.5C13.4 19.5 14.5 18.4 14.5 17"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const HiIcon = ({
  size = 24,
  color = "#8E8E93",
  strokeWidth = 2,
}: GetStartedIconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M9 12V6.5C9 5.7 9.7 5 10.5 5C11.3 5 12 5.7 12 6.5V11"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12 11V5.5C12 4.7 12.7 4 13.5 4C14.3 4 15 4.7 15 5.5V11"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M15 11V6.5C15 5.7 15.7 5 16.5 5C17.3 5 18 5.7 18 6.5V13"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M9 12V9C9 8.2 8.3 7.5 7.5 7.5C6.7 7.5 6 8.2 6 9V15C6 18.3 8.7 21 12 21H13C16.3 21 18 18.3 18 15V13"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const CertificateIcon = ({
  size = 24,
  color = "#8E8E93",
  strokeWidth = 2,
}: GetStartedIconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="9" r="6" stroke={color} strokeWidth={strokeWidth} />
    <Path
      d="M9 14L7 21L12 18L17 21L15 14"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const CartGrowthIcon = ({
  size = 24,
  color = "#8E8E93",
  strokeWidth = 2,
}: GetStartedIconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M4 18L9 12L13 15L20 6"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M14 6H20V12"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const ClockIcon = ({
  size = 24,
  color = "#8E8E93",
  strokeWidth = 2,
}: GetStartedIconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="8" stroke={color} strokeWidth={strokeWidth} />
    <Path
      d="M12 8V12L15 14"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const TeacherIcon = ({
  size = 24,
  color = "#8E8E93",
  strokeWidth = 2,
}: GetStartedIconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="7" r="3" stroke={color} strokeWidth={strokeWidth} />
    <Path
      d="M5 20C5 16.5 8 14 12 14C16 14 19 16.5 19 20"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
    <Path
      d="M2 9L2 6M2 6L4.5 4.5M2 6L4.5 7.5"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const CommunityIcon = ({
  size = 24,
  color = "#8E8E93",
  strokeWidth = 2,
}: GetStartedIconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="8" cy="9" r="3" stroke={color} strokeWidth={strokeWidth} />
    <Circle cx="16" cy="9" r="3" stroke={color} strokeWidth={strokeWidth} />
    <Path
      d="M2 19C2 16 4.5 14 8 14C9.5 14 10.8 14.4 11.8 15.1"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
    <Path
      d="M12.2 15.1C13.2 14.4 14.5 14 16 14C19.5 14 22 16 22 19"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
  </Svg>
);

export const TargetIcon = ({
  size = 24,
  color = "#8E8E93",
  strokeWidth = 2,
}: GetStartedIconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="8" stroke={color} strokeWidth={strokeWidth} />
    <Circle cx="12" cy="12" r="4" stroke={color} strokeWidth={strokeWidth} />
    <Circle cx="12" cy="12" r="1" fill={color} />
  </Svg>
);

export const PencilIcon = ({
  color = "#FFFFFF",
  size = 18,
}: {
  color?: string;
  size?: number;
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M4 20H8L19 9C20.1 7.9 20.1 6.1 19 5C17.9 3.9 16.1 3.9 15 5L4 16V20Z"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <Path
        d="M13.5 6.5L17.5 10.5"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
};

export const LogoutIcon = ({
  color = "#FF4D67",
  size = 24,
}: {
  color?: string;
  size?: number;
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M10 5H6C4.9 5 4 5.9 4 7V17C4 18.1 4.9 19 6 19H10"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />

      <Path
        d="M13 8L17 12L13 16"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <Path d="M8 12H17" stroke={color} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
};

export const CameraIcon = ({
  color = "#D7FF3F",
  size = 28,
}: {
  color?: string;
  size?: number;
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M4 7H7L8.5 5H15.5L17 7H20V19H4V7Z"
        stroke={color}
        strokeWidth={2}
        strokeLinejoin="round"
      />

      <Circle cx={12} cy={13} r={3.5} stroke={color} strokeWidth={2} />
    </Svg>
  );
};

export const GalleryIcon = ({
  color = "#D7FF3F",
  size = 28,
}: {
  color?: string;
  size?: number;
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect
        x={3}
        y={4}
        width={18}
        height={16}
        rx={2}
        stroke={color}
        strokeWidth={2}
      />

      <Circle cx={9} cy={9} r={1.5} fill={color} />

      <Path
        d="M5 18L10 13L13 16L15 14L19 18"
        stroke={color}
        strokeWidth={2}
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export const DeleteIcon = ({
  color = "#FF4D67",
  size = 22,
}: {
  color?: string;
  size?: number;
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M4 7H20" stroke={color} strokeWidth={2} strokeLinecap="round" />

      <Path
        d="M9 7V4H15V7"
        stroke={color}
        strokeWidth={2}
        strokeLinejoin="round"
      />

      <Path
        d="M6 7L7 21H17L18 7"
        stroke={color}
        strokeWidth={2}
        strokeLinejoin="round"
      />

      <Path
        d="M9 10V17M12 10V17M15 10V17"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
};

export const ChevronRightIcon = ({
  color = "#94A3B8",
  size = 20,
}: {
  color?: string;
  size?: number;
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M9 6L15 12L9 18"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export const AchievementIcon = ({
  color = "#F8FAFC",
  size = 23,
}: {
  color?: string;
  size?: number;
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M8 4H16V9C16 11.2 14.2 13 12 13C9.8 13 8 11.2 8 9V4Z"
        stroke={color}
        strokeWidth={2}
      />

      <Path
        d="M8 6H4V8C4 10.2 5.8 12 8 12"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />

      <Path
        d="M16 6H20V8C20 10.2 18.2 12 16 12"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />

      <Path
        d="M12 13V17M9 21H15M10 17H14"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
};

export const BookmarkIcon = ({
  color = "#F8FAFC",
  size = 23,
}: {
  color?: string;
  size?: number;
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M6 4H18V20L12 16L6 20V4Z"
        stroke={color}
        strokeWidth={2}
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export const DownloadIcon = ({
  color = "#F8FAFC",
  size = 23,
}: {
  color?: string;
  size?: number;
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M5 8H19V20H5V8Z" stroke={color} strokeWidth={2} />

      <Path d="M9 8V5H15V8" stroke={color} strokeWidth={2} />

      <Path
        d="M12 11V16M9.5 13.5L12 16L14.5 13.5"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export const SettingsIcon = ({
  color = "#F8FAFC",
  size = 23,
}: {
  color?: string;
  size?: number;
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx={12} cy={12} r={3} stroke={color} strokeWidth={2} />

      <Path
        d="M19 13.5V10.5L17 9.7L16.3 8L17.2 6L15.1 3.9L13.1 4.8L11.4 4.1L10.6 2H7.6L6.8 4.1L5.1 4.8L3.1 3.9L1 6L1.9 8L1.2 9.7L-0.8 10.5V13.5L1.2 14.3L1.9 16L1 18L3.1 20.1L5.1 19.2L6.8 19.9L7.6 22H10.6L11.4 19.9L13.1 19.2L15.1 20.1L17.2 18L16.3 16L17 14.3L19 13.5Z"
        stroke={color}
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export const HelpIcon = ({
  color = "#F8FAFC",
  size = 23,
}: {
  color?: string;
  size?: number;
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx={12} cy={12} r={9} stroke={color} strokeWidth={2} />

      <Path
        d="M9.8 9C9.8 7.7 10.8 6.8 12.2 6.8C13.6 6.8 14.6 7.7 14.6 9C14.6 10.2 13.9 10.8 13 11.4C12.3 11.9 12 12.3 12 13.2"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />

      <Circle cx={12} cy={17} r={1} fill={color} />
    </Svg>
  );
};
