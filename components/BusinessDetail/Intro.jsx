import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  Platform,
} from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { Colors } from "../../constants/Colors";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../configs/FirebaseConfig";
import { useUser } from "@clerk/clerk-expo";

export default function Intro({ business }) {
  const router = useRouter();
  const { user } = useUser();
  const onDelete = () => {
    Alert.alert("Delete", "Do you really want to delete this business?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => deleteBusiness(),
      },
    ]);
  };

  const deleteBusiness = async () => {
    console.log("deleted now");
    await deleteDoc(doc(db, "businessList", business?.id));
    router.back();

    if (Platform.OS === "android") {
      // Android-specific code
      ToastAndroid.show("Business Deleted!", ToastAndroid.LONG);
    } else if (Platform.OS === "ios") {
      // iOS-specific code
      Alert.alert("Business Deleted!");
    }
  };

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
          marginTop: 50,
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
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 20,
          backgroundColor: "#fff",
          marginTop: -20,
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
        }}
      >
        <View>
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
              maxWidth: "94%",
            }}
          >
            {business.address}
          </Text>
        </View>
        {/* delete show only when the business is owned */}
        {user?.primaryEmailAddress?.emailAddress == business?.userEmail && (
          <TouchableOpacity onPress={() => onDelete()}>
            <Ionicons name="trash" size={30} color="red" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
