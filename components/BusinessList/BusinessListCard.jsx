import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "../../constants/Colors";
import { useRouter } from "expo-router";

export default function BusinessListCard({ business }) {
  const router = useRouter();
  return (
    <TouchableOpacity
      style={{
        display: "flex",
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
        padding: 10,
        margin: 10,
        borderRadius: 15,
        backgroundColor: "#fff",
      }}
      onPress={() => router.push("/businessdetail/" + business.id)}
    >
      <Image
        source={{ uri: business.imageUrl }}
        style={{
          width: 120,
          height: 120,
          borderRadius: 15,
        }}
      />
      <View
        style={{
          marginLeft: 10,
          display: "flex",
          flex: 1,
          gap: 7,
        }}
      >
        <Text
          style={{
            fontFamily: "primaryFont-bold",
            fontSize: 20,
          }}
        >
          {business.name}
        </Text>
        <Text
          style={{
            fontFamily: "primaryFont-regular",
            color: Colors.GRAY,
            fontSize: 15,
          }}
        >
          {business.address}
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Image
            source={require("./../../assets/images/star.png")}
            style={{
              width: 15,
              height: 15,
            }}
          />
          <Text
            style={{
              fontFamily: "primaryFont-regular",
              marginLeft: 5,
            }}
          >
            4.5
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
