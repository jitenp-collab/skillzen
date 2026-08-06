import { StyleSheet } from "react-native";
import LessonComp from "@/components/common/LessonComp";
import { SafeAreaView } from "react-native-safe-area-context";

const lessonScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <LessonComp />
    </SafeAreaView>
  );
};

export default lessonScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
