import { View, Text } from "react-native";
import React from "react";
import UserIntro from "../../components/Profile/UserIntro";
import MenuList from "../../components/Profile/MenuList";
import { Colors } from "../../constants/Colors";

export default function profile() {
  return (
    <View
      style={{
        paddingTop: 60,
        marginHorizontal: 20,
      }}
    >
      <Text
        style={{
          fontFamily: "primaryFont-bold",
          fontSize: 30,
        }}
      >
        Profile
      </Text>

      {/* User Info */}
      <UserIntro />

      {/* Menu List */}
      <MenuList />

      {/* Credits */}
      <Text
        style={{
          fontFamily: "primaryFont-regular",
          fontSize: 15,
          color: Colors.GRAY,
          textAlign: "center",
          marginTop: 50,
        }}
      >
        Developed by Arpit Jaiswal @ 2024
      </Text>
    </View>
  );
}
