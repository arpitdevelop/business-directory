import { View, Text, FlatList, TouchableOpacity, Share } from "react-native";
import React from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Colors } from "./../../constants/Colors";
import { useRouter } from "expo-router";
import { SignedOut, useAuth } from "@clerk/clerk-expo";

export default function MenuList() {
  const { signOut } = useAuth();

  const menuList = [
    {
      id: 1,
      name: "Add Business",
      icon: "business",
      path: "/business/add-business",
      buttonBgColor: "#e6fde5",
      iconColor: "#48e243",
    },
    {
      id: 2,
      name: "My Businesses",
      icon: "add-business",
      path: "/business/my-business",
      buttonBgColor: "#fff8db",
      iconColor: "#ffd30c",
    },
    {
      id: 3,
      name: "Share App",
      icon: "share",
      path: "share",
      buttonBgColor: "#f4e5fd",
      iconColor: "#bc60f7",
    },
    {
      id: 4,
      name: "Logout",
      icon: "logout",
      path: "logout",
      buttonBgColor: "#ffe6e2",
      iconColor: "#fa4a2d",
    },
  ];

  const router = useRouter();

  const onMenuButtonPress = (item) => {
    if (item.path == "logout") {
      signOut();
      return;
    }
    if (item.path == "share") {
      Share.share({
        message:
          "Download the Business Directory app by Arpit Jaiswal, Download URL: ",
      });
      return;
    }

    router.push(item.path);
  };

  return (
    <View
      style={{
        marginTop: 20,
      }}
    >
      <FlatList
        data={menuList}
        scrollEnabled={false}
        numColumns={2}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => onMenuButtonPress(item)}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              flex: 1,
              borderColor: Colors.GRAY,
              borderWidth: 1,
              borderRadius: 15,
              margin: 10,
              padding: 10,
              backgroundColor: "#fff",
            }}
          >
            <View
              style={{
                backgroundColor: item.buttonBgColor,
                borderRadius: 15,
                padding: 10,
              }}
            >
              <MaterialIcons
                name={item.icon}
                size={24}
                color={item.iconColor}
              />
            </View>
            <Text
              style={{
                fontFamily: "primaryFont-bold",
                fontSize: 15,
                flex: 1,
              }}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
