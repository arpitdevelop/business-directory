import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Linking,
} from "react-native";
import React from "react";

export default function ActionButton({ business }) {
  const actionButtonMenu = [
    {
      id: 1,
      name: "Call",
      icon: require("./../../assets/images/phone-call.png"),
      url: "tel:" + business?.contact,
    },
    {
      id: 2,
      name: "Location",
      icon: require("./../../assets/images/location.png"),
      url:
        "https://www.google.com/maps/search/?api=1&query=" + business?.address,
    },
    {
      id: 3,
      name: "Website",
      icon: require("./../../assets/images/website.png"),
      url: business?.website,
    },
    {
      id: 4,
      name: "Share",
      icon: require("./../../assets/images/share.png"),
      url: null,
    },
  ];

  const OnPressHandle = (item) => {
    if (item.name == "Share") {
      return;
    }
    Linking.openURL(item.url);
  };

  return (
    <View
      style={{
        backgroundColor: "#fff",
        padding: 20,
      }}
    >
      <FlatList
        data={actionButtonMenu}
        numColumns={4}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        renderItem={({ item, index }) => (
          <TouchableOpacity key={index} onPress={() => OnPressHandle(item)}>
            <Image
              source={item?.icon}
              style={{
                width: 60,
                height: 60,
                margin: 10,
              }}
            />
            <Text
              style={{
                fontFamily: "primaryFont-medium",
                textAlign: "center",
                marginTop: 3,
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
