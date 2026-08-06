import { ComponentType, ReactElement, ReactNode } from "react";
import {
  DimensionValue,
  StyleProp,
  TextInputProps,
  TextStyle,
  ViewStyle,
} from "react-native";

export type GetStartedIconProps = {
  size?: number;
  color: string;
  strokeWidth?: number;
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

export type AppButtonProp = {
  title?: string;
  onPress?: () => void;
  width?: DimensionValue;
  height?: number;
  backgroundColor?: string;
  textColor?: string;
  borderRadius?: number;
  fontSize?: number;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  borderwidth?: number;
  bordercolor?: string;
  textStyle?: StyleProp<TextStyle>;
  fontweight?: TextStyle["fontWeight"];
  hitSlop?: number;
};

export type CustomTextInputProps = TextInputProps & {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  isPassword?: boolean;
  inputContainerStyle?: StyleProp<ViewStyle>;
};

export type RegistrationFormValues = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type RegistrationCompProps = {
  onRegister?: (data: {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => void;
  onLoginPress?: () => void;
  onGooglePress?: () => void;
};

export type LoginFormValues = {
  email: string;
  password: string;
};

export type LoginErrorsProps = {
  email?: string;
  password?: string;
};

export type BenefitVisualType =
  | "certificate"
  | "growth"
  | "time"
  | "community"
  | "focus";

export type TopicProgress = {
  categoryTitle: string;
  topicId: string;
  lastLessonIndex: number;
  completed: boolean;
};

export type User = {
  id: string;
  fullName: string;
  email: string;
  password?: string;
  photo?: string;
  googlePhoto?: string;
  loginType: "email" | "google";
  userData: TopicProgress[];
};

export type ProfileCompProps = {
  currentUser: User;
  isPhotoModalVisible: boolean;

  onOpenPhotoModal: () => void;
  onClosePhotoModal: () => void;
  onTakePhoto: () => void;
  onSelectFromGallery: () => void;
  onDeletePhoto: () => void;
  onLogout: () => void;
};

export type TopicListItem = {
  id: string;
  title: string;
  icon: string;
  totalLessons: number;
};

export type GlobalState = {
  currentUser: User | null;
  getStartedCompleted: boolean;
  isLoading: boolean;
  error: string | null;

  // content selection
  categories?: Category[];
  topics?: Topic[];
  selectedCategoryId?: string | null;
  view?: ContentView;
  selectedCatogery?: TopicListItem[] | null;
  selectLessons?: any[];
};

export type BenefitCardProps = {
  title: string;
  description: string;

  icon: React.ComponentType<{
    size?: number;
    color: string;
    strokeWidth?: number;
  }>;
  cardWidth: number;
};

export type VisualColors = { color: string; softColor: string };

export type VisualColorMap = {
  certificate: VisualColors;
  growth: VisualColors;
  time: VisualColors;
  community: VisualColors;
  focus: VisualColors;
};

export type VisualRendererProps = {
  Icon: IconComponent;
  color: string;
  softColor: string;
};

export type VisualRenderer = (props: VisualRendererProps) => ReactElement;

export type VisualRendererMap = {
  certificate: VisualRenderer;
  growth: VisualRenderer;
  time: VisualRenderer;
  community: VisualRenderer;
  focus: VisualRenderer;
};

export type LoopedBenefitItem = BenefitItem & { uid: string };

export type ContentBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "code"; code: string; language?: string }
  | { type: "list"; items: string[] }
  | { type: "note"; text: string };

export type Topic = {
  id: string;
  categoryId: string;
  order: number;
  title: string;
  content: ContentBlock[];
};

export type Category = {
  id: string;
  title: string;
  description?: string;
  image: string;
  meta?: string;
};

export type ContentData = {
  categories: Category[];
  topics: Topic[];
};

export type ContentView = "categories" | "topics";

export type BenefitItem = {
  id: string;
  title: string;
  description: string;
  icon: (props: GetStartedIconProps) => ReactElement;
  visualType: string;
};

export type SearchBarProps = {
  value: string;
  onChangeText: (text: string) => void;
  onClear?: () => void;
  placeholder?: string;
  containerStyle?: StyleProp<ViewStyle>;
  autoFocus?: boolean;
  onFocusChange?: (focused: boolean) => void;
};

export type CategoriesCompProps = {
  searchQuery?: string;
};
