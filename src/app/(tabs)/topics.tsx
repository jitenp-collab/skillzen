import { StyleSheet, View } from "react-native";
import TopickeComp from "@/components/common/TopickeComp";

const topics = () => {
  return (
    <View style={styles.container}>
      <TopickeComp />
    </View>
  );
};

export default topics;

const styles = StyleSheet.create({
  container: { flex: 1 },
});