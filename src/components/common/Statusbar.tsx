import { StatusBar, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const StatusBarComponent = () => {
  const insets = useSafeAreaInsets();

  return (
    <>
      <StatusBar
        // backgroundColor="transparent"
        backgroundColor="#0B1020"
        translucent
        barStyle={"default"}
      />
      <View style={{ height: insets.top, backgroundColor: "#0B1020" }} />
    </>
  );
};

export default StatusBarComponent;