import { useCallback, useState } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
} from "react-native-reanimated";
import HomeScreenHeadercomp from "@/components/common/HomeScreenHeadercomp";
import BenefitsSection from "@/components/common/BenefitsSection";
import CategoriesComp from "@/components/common/CatogeriesComp";
import CustomeSearch from "@/components/reusableComponents/CustomeSearch";

const HomeComponent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const isSearching = isSearchFocused || searchQuery.length > 0;

  const handleClearSearch = useCallback(() => {
    setSearchQuery("");
    setIsSearchFocused(false);
  }, []);

  return (
    <View style={styles.container}>
      <HomeScreenHeadercomp />

      <CustomeSearch
        value={searchQuery}
        onChangeText={setSearchQuery}
        onClear={handleClearSearch}
        onFocusChange={setIsSearchFocused}
      />

      {!isSearching && (
        <Animated.View
          entering={FadeIn.duration(250)}
          exiting={FadeOut.duration(200)}
        >
          <BenefitsSection />
        </Animated.View>
      )}

      <Animated.View layout={LinearTransition.duration(250)}>
        <CategoriesComp searchQuery={searchQuery} />
      </Animated.View>
    </View>
  );
};

export default HomeComponent;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
  },
});
