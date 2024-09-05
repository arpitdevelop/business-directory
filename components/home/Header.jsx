import { View, Text, Image, TextInput } from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-expo";
import { Colors } from "./../../constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Header() {
  const { user } = useUser();
  // A hook given by Clerk Authentication to fetch logged in user details

  return (
    <View
      style={{
        padding: 20,
        paddingTop: 40,
        backgroundColor: Colors.PRIMARY,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
      }}
    >
      {/* Profile pic and name */}
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
        }}
      >
        <Image
          source={{ uri: user?.imageUrl }}
          style={{
            width: 45,
            height: 45,
            borderRadius: 99,
          }}
        />
        <View>
          <Text
            style={{
              fontFamily: "primaryFont-regular",
              color: "#fff",
            }}
          >
            Welcome,
          </Text>
          <Text
            style={{
              fontFamily: "primaryFont-medium",
              fontSize: 19,
              color: "#fff",
            }}
          >
            {user?.fullName}
          </Text>
        </View>
      </View>
      {/* Search Bar */}
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 10,
          alignItems: "center",
          backgroundColor: "#fff",
          borderRadius: 10,
          padding: 8,
          marginVertical: 10,
          marginTop: 15,
        }}
      >
        <Ionicons name="search" size={24} color={Colors.PRIMARY} />
        <TextInput
          placeholder="Search..."
          style={{ fontFamily: "primaryFont-regular", fontSize: 16 }}
        />
      </View>
    </View>
  );
}
