import React from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { useDispatch, useSelector } from "react-redux";

import AppButton from "@/components/reusableComponents/AppButton";

import { logoutUser } from "@/redux/actions";
import type { AppDispatch, RootState } from "@/redux/store";

const Profile = () => {
  const dispatch = useDispatch<AppDispatch>();

  const currentUser = useSelector(
    (state: RootState) => state.global.currentUser
  );

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();

      router.replace("/loginScreen");
    } catch (error) {
      console.log("Logout error:", error);

      Alert.alert("Logout failed", "Unable to logout");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>

      {currentUser ? (
        <>
          <Text>Name: {currentUser.fullName}</Text>
          <Text>Email: {currentUser.email}</Text>

          <AppButton
            title="Logout"
            onPress={handleLogout}
            style={styles.logoutButton}
          />
        </>
      ) : (
        <Text>No user is logged in</Text>
      )}
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20,
  },

  logoutButton: {
    marginTop: 30,
  },
});
