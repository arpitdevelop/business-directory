import { View, Text, ScrollView } from "react-native";
import React from "react";
import Header from "../../components/home/Header";
import Slider from "../../components/home/Slider";
import Category from "../../components/home/Category";
import PopularBusiness from "../../components/home/PopularBusiness";

export default function home() {
  return (
    <ScrollView>
      {/* {Header} */}
      <Header />

      {/* {Slider} */}
      <Slider />

      {/* {Category} */}
      <Category />

      {/* {Popular Business} */}
      <PopularBusiness />

      {/* {Bottom Margin} */}
      <View style={{ height: 50 }} />
    </ScrollView>
  );
}
