import React from "react";
import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import AppButton from "@/components/reusableComponents/AppButton";

import { theme } from "@/utils/theme/Theme";
import type { User } from "@/utils/types/Apptypes";
import {
  PencilIcon,
  AchievementIcon,
  ChevronRightIcon,
  BookmarkIcon,
  DownloadIcon,
  SettingsIcon,
  HelpIcon,
  LogoutIcon,
  CameraIcon,
  GalleryIcon,
  DeleteIcon,
} from "../../assets/svg/SvgIcons";

type ProfileCompProps = {
  currentUser: User;
  isPhotoModalVisible: boolean;

  onOpenPhotoModal: () => void;
  onClosePhotoModal: () => void;

  onTakePhoto: () => void;
  onSelectFromGallery: () => void;
  onDeletePhoto: () => void;
  onLogout: () => void;
};

const ProfileComp = ({
  currentUser,
  isPhotoModalVisible,
  onOpenPhotoModal,
  onClosePhotoModal,
  onTakePhoto,
  onSelectFromGallery,
  onDeletePhoto,
  onLogout,
}: ProfileCompProps) => {
  const firstLetter = currentUser.fullName?.charAt(0).toUpperCase() || "U";

  const renderProfileImage = (size: number, style?: object) => {
    const profilePhoto = currentUser.photo || currentUser.googlePhoto;

    if (profilePhoto) {
      return (
        <Image
          source={{ uri: profilePhoto }}
          style={[
            {
              width: size,
              height: size,
              borderRadius: size / 2,
            },
            style,
          ]}
        />
      );
    }

    return (
      <View
        style={[
          styles.defaultImage,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
          },
          style,
        ]}
      >
        <Text style={styles.defaultImageText}>{firstLetter}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.headerTitle}>Profile</Text>

        <View style={styles.profileContainer}>
          <View style={styles.imageContainer}>
            {renderProfileImage(98, styles.profileImage)}

            <Pressable
              style={styles.editButton}
              onPress={onOpenPhotoModal}
              hitSlop={8}
            >
              <PencilIcon size={20} color={theme.colors.primary} />
            </Pressable>
          </View>

          <View style={styles.userDetails}>
            <Text style={styles.userName}>{currentUser.fullName}</Text>

            <Text style={styles.userEmail} numberOfLines={2}>
              {currentUser.email}
            </Text>

            {/* <View style={styles.badge}>
              <Text style={styles.badgeText}>★ Pro Learner</Text>
            </View> */}
          </View>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Lessons</Text>
            <Text style={styles.statValue}>0</Text>
          </View>

          <View style={styles.statDivider} />

          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Tasks</Text>
            <Text style={styles.statValue}>0</Text>
          </View>

          <View style={styles.statDivider} />

          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Quizzes</Text>
            <Text style={styles.statValue}>0</Text>
          </View>
        </View>

        <View style={styles.menuContainer}>
          <Pressable
            style={({ pressed }) => [
              styles.menuItem,
              pressed && styles.menuItemPressed,
            ]}
          >
            <AchievementIcon />

            <Text style={styles.menuText}>Achievements</Text>

            <ChevronRightIcon />
          </Pressable>

          <View style={styles.divider} />

          <Pressable
            style={({ pressed }) => [
              styles.menuItem,
              pressed && styles.menuItemPressed,
            ]}
          >
            <BookmarkIcon />

            <Text style={styles.menuText}>Bookmarks</Text>

            <ChevronRightIcon />
          </Pressable>

          <View style={styles.divider} />

          <Pressable
            style={({ pressed }) => [
              styles.menuItem,
              pressed && styles.menuItemPressed,
            ]}
          >
            <DownloadIcon />
            <Text style={styles.menuText}>Downloads</Text>
            <ChevronRightIcon />
          </Pressable>
        </View>

        <View style={styles.menuContainer}>
          <Pressable
            style={({ pressed }) => [
              styles.menuItem,
              pressed && styles.menuItemPressed,
            ]}
          >
            <SettingsIcon />
            <Text style={styles.menuText}>Settings</Text>
            <ChevronRightIcon />
          </Pressable>

          <View style={styles.divider} />

          <Pressable
            style={({ pressed }) => [
              styles.menuItem,
              pressed && styles.menuItemPressed,
            ]}
          >
            <HelpIcon />
            <Text style={styles.menuText}>Help & Support</Text>
            <ChevronRightIcon />
          </Pressable>
        </View>

        <AppButton
          title="Logout"
          icon={<LogoutIcon />}
          iconPosition="left"
          height={56}
          backgroundColor={theme.colors.surface}
          textColor="#FF4D67"
          borderRadius={15}
          borderwidth={1}
          bordercolor={theme.colors.border}
          fontSize={16}
          fontweight="500"
          onPress={onLogout}
          style={styles.logoutButton}
        />
      </ScrollView>

      <Modal
        visible={isPhotoModalVisible}
        transparent
        animationType="slide"
        onRequestClose={onClosePhotoModal}
      >
        <Pressable style={styles.modalBackground} onPress={onClosePhotoModal}>
          <Pressable style={styles.modalContent} onPress={() => {}}>
            <View style={styles.modalHandle} />

            <View style={styles.modalHeader}>
              <View style={styles.modalHeaderSpace} />

              <Text style={styles.modalTitle}>Change Profile Photo</Text>

              <Pressable
                style={styles.closeButton}
                onPress={onClosePhotoModal}
                hitSlop={8}
              >
                <Text style={styles.closeText}>×</Text>
              </Pressable>
            </View>

            <View style={styles.modalImageContainer}>
              {renderProfileImage(112, styles.modalProfileImage)}
            </View>

            <View style={styles.photoButtonsContainer}>
              <Pressable style={styles.photoOptionButton} onPress={onTakePhoto}>
                <CameraIcon />

                <Text style={styles.photoOptionText}>Take Photo</Text>
              </Pressable>

              <Pressable
                style={styles.photoOptionButton}
                onPress={onSelectFromGallery}
              >
                <GalleryIcon />

                <Text style={styles.photoOptionText}>Select from Gallery</Text>
              </Pressable>
            </View>

            <Pressable style={styles.deleteButton} onPress={onDeletePhoto}>
              <DeleteIcon />

              <Text style={styles.deleteButtonText}>Delete Photo</Text>
            </Pressable>

            <AppButton
              title="Cancel"
              height={52}
              backgroundColor={theme.colors.surface}
              textColor={theme.colors.text}
              borderRadius={14}
              borderwidth={1}
              bordercolor={theme.colors.border}
              fontSize={15}
              fontweight="700"
              onPress={onClosePhotoModal}
            />
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
};

export default ProfileComp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },

  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 18,
    paddingBottom: 30,
  },

  headerTitle: {
    color: theme.colors.text,
    fontSize: 23,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 24,
  },

  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 4,
    marginBottom: 22,
  },

  imageContainer: {
    width: 98,
    height: 98,
    position: "relative",
  },

  profileImage: {
    borderWidth: 3,
    borderColor: "#C8FF00",
  },

  defaultImage: {
    backgroundColor: theme.colors.card,
    alignItems: "center",
    justifyContent: "center",
  },

  defaultImageText: {
    color: theme.colors.text,
    fontSize: 38,
    fontWeight: "800",
  },

  editButton: {
    position: "absolute",
    right: 0,
    bottom: 3,
    width: 30,
    height: 30,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
  },

  userDetails: {
    flex: 1,
    marginLeft: 16,
  },

  userName: {
    color: theme.colors.text,
    fontSize: 22,
    fontWeight: "800",
  },

  userEmail: {
    color: theme.colors.muted,
    fontSize: 14,
    marginTop: 5,
  },

  badge: {
    alignSelf: "flex-start",
    marginTop: 11,
    paddingHorizontal: 11,
    paddingVertical: 7,
    borderRadius: 9,
    backgroundColor: "#2D176A",
  },

  badgeText: {
    color: theme.colors.text,
    fontSize: 13,
    fontWeight: "700",
  },

  statsContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 17,
    paddingVertical: 17,
    marginBottom: 14,
  },

  statItem: {
    flex: 1,
    alignItems: "center",
  },

  statLabel: {
    color: theme.colors.muted,
    fontSize: 12,
    marginBottom: 6,
  },

  statValue: {
    color: theme.colors.text,
    fontSize: 24,
    fontWeight: "800",
  },

  statDivider: {
    width: 1,
    height: 35,
    backgroundColor: theme.colors.divider,
  },

  menuContainer: {
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 17,
    overflow: "hidden",
    marginBottom: 12,
  },

  menuItem: {
    minHeight: 60,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },

  menuItemPressed: {
    opacity: 0.6,
    backgroundColor: theme.colors.card,
  },

  menuText: {
    flex: 1,
    color: theme.colors.text,
    fontSize: 15,
    fontWeight: "600",
    marginLeft: 12,
  },

  divider: {
    height: 1,
    marginLeft: 51,
    backgroundColor: theme.colors.divider,
  },

  logoutButton: {
    //     marginTop: 2,
    justifyContent: "flex-start",
    paddingHorizontal: 16,
  },

  modalBackground: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(1, 7, 18, 0.76)",
  },

  modalContent: {
    backgroundColor: theme.colors.surface,
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 22,
  },

  modalHandle: {
    width: 52,
    height: 5,
    borderRadius: 3,
    backgroundColor: theme.colors.muted,
    alignSelf: "center",
    opacity: 0.6,
    marginBottom: 16,
  },

  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },

  modalHeaderSpace: {
    width: 34,
  },

  modalTitle: {
    flex: 1,
    color: theme.colors.text,
    fontSize: 19,
    fontWeight: "800",
    textAlign: "center",
  },

  closeButton: {
    width: 34,
    height: 34,
    alignItems: "center",
    justifyContent: "center",
  },

  closeText: {
    color: theme.colors.text,
    fontSize: 28,
    lineHeight: 30,
  },

  modalImageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },

  modalProfileImage: {
    borderWidth: 2,
    borderColor: theme.colors.primary,
  },

  photoButtonsContainer: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 12,
  },

  photoOptionButton: {
    flex: 1,
    minHeight: 96,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.card,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 14,
    paddingHorizontal: 8,
  },

  photoOptionText: {
    color: theme.colors.text,
    fontSize: 14,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 8,
  },

  deleteButton: {
    height: 52,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 77, 103, 0.55)",
    borderRadius: 14,
    backgroundColor: theme.colors.card,
    marginBottom: 12,
  },

  deleteButtonText: {
    color: "#FF4D67",
    fontSize: 15,
    fontWeight: "800",
    marginLeft: 10,
  },
});
