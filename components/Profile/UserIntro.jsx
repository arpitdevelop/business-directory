import { View, Text, Image } from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-expo";
import { Colors } from "../../constants/Colors";

export default function UserIntro() {
  const { user } = useUser();
  return (
    <View
      style={{
        marginTop: 30,
        display: "flex",
        gap: 10,
        width: "100%",
        alignItems: "center",
      }}
    >
      <Image
        source={{ uri: user?.imageUrl }}
        style={{
          height: 100,
          width: 100,
          borderRadius: 99,
        }}
      />
      <Text
        style={{
          fontFamily: "primaryFont-bold",
          fontSize: 20,
        }}
      >
        {user?.fullName}
      </Text>
      <Text
        style={{
          fontFamily: "primaryFont-regular",
          fontSize: 16,
          color: Colors.GRAY,
        }}
      >
        {user?.primaryEmailAddress.emailAddress}
      </Text>
    </View>
  );
}
