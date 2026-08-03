import { StyleSheet, Text, View } from "react-native";
import React from "react";
import HomeScreenHeadercomp from "@/components/common/HomeScreenHeadercomp";
import BenefitsSection from "@/components/common/BenefitsSection";
import CatogeriesComp from "@/components/common/CatogeriesComp";

const index = () => {
  return (
    <View style={styles.container}>
      <HomeScreenHeadercomp />
      <BenefitsSection />
      <CatogeriesComp />
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
  },
});
