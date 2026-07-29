import { Stack, useRouter } from "expo-router";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { Link } from "expo-router";

const NotFoundPage = () => {
  const route = useRouter();

  return (
    <>
      <Stack.Screen options={{ title: "Opps! not found page" }} />
      <View style={styles.container}>
        <TouchableOpacity onPress={() => route.dismissAll()}>
          <Text style={styles.button}> Go back to Home screen!</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default NotFoundPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    justifyContent: "center",
    alignItems: "center",
  },

  button: {
    fontSize: 20,
    textDecorationLine: "underline",
    color: "#fff",
  },
});
