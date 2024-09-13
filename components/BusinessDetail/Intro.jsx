import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { Colors } from "../../constants/Colors";

export default function Intro({ business }) {
  const router = useRouter();
  return (
    <View>
      <View
        style={{
          position: "absolute",
          zIndex: 10,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
          padding: 20,
        }}
      >
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back-circle" size={40} color="white" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="heart-outline" size={40} color="red" />
        </TouchableOpacity>
      </View>
      <Image
        source={{ uri: business.imageUrl }}
        style={{
          width: "100%",
          height: 340,
        }}
      />

      <View
        style={{
          padding: 20,
          backgroundColor: "#fff",
          marginTop: -20,
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
        }}
      >
        <Text
          style={{
            fontSize: 26,
            fontFamily: "primaryFont-bold",
          }}
        >
          {business.name}
        </Text>
        <Text
          style={{
            fontSize: 18,
            fontFamily: "primaryFont-regular",
          }}
        >
          {business.address}
        </Text>
      </View>
    </View>
  );
}
