import { StyleSheet, Text, View } from "react-native";
import React from "react";
import LessonComp from "@/components/common/LessonComp";
import { SafeAreaView } from "react-native-safe-area-context";

const lessonScreen = () => {
  return (
    <SafeAreaView  style={styles.container}>
      <LessonComp />
    </SafeAreaView>
  );
};

export default lessonScreen;

const styles = StyleSheet.create({
  container:{
    flex:1
  }
});
