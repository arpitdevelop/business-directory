import { View, Text, FlatList, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-expo";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../configs/FirebaseConfig";
import BusinessListCard from "./../../components/BusinessList/BusinessListCard";
import { useNavigation } from "expo-router";
import { Colors } from "../../constants/Colors";

export default function Mybusiness() {
  const { user } = useUser();
  const navigation = useNavigation();
  const [businessList, setBusinessList] = useState([]);
  const [loading, setLoading] = useState(false);

  // Get user business list only when user available
  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: "My Business Listings",
    });
    user && GetUserBusinessList();
  }, [user]);

  // Get Business List By user email.
  const GetUserBusinessList = async () => {
    setLoading(true);
    setBusinessList([]);
    const q = query(
      collection(db, "businessList"),
      where("userEmail", "==", user?.primaryEmailAddress?.emailAddress)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setBusinessList((prev) => [...prev, { id: doc.id, ...doc.data() }]);
    });
    setLoading(false);
  };

  return (
    <View>
      {businessList?.length > 0 && loading == false ? (
        <FlatList
          data={businessList}
          onRefresh={GetUserBusinessList}
          refreshing={loading}
          renderItem={({ item, index }) => (
            <BusinessListCard business={item} key={index} />
          )}
        />
      ) : loading ? (
        <ActivityIndicator
          size={"large"}
          color={Colors.PRIMARY}
          style={{
            marginTop: "70%",
          }}
        />
      ) : (
        <Text
          style={{
            fontSize: 25,
            fontFamily: "primaryFont-bold",
            color: Colors.GRAY,
            textAlign: "center",
            marginTop: "40%",
          }}
        >
          No Businesses Found!
        </Text>
      )}
    </View>
  );
}
