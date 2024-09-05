import { View, Text } from "react-native";
import React from "react";
import Header from "../../components/home/Header";
import Slider from "../../components/home/Slider";

export default function home() {
  return (
    <View>
      {/* {Header} */}
      <Header />

      {/* {Slider} */}
      <Slider />

      {/* {Category} */}
    </View>
  );
}
