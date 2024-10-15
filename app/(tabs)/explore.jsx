import { View, Text, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "../../constants/Colors";
import Category from "../../components/home/Category";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../configs/FirebaseConfig";
import ExploreBusinessList from "../../components/Explore/ExploreBusinessList";

export default function explore() {
  const [businessList, setBusinessList] = useState([]);
  const [allBusinessList, setAllBusinessList] = useState([]);
  const [allCategoryShow, setAllCategoryShow] = useState(true);

  useEffect(() => {
    GetAllBusiness();
  }, []);

  const GetAllBusiness = async () => {
    setAllBusinessList([]);
    const q = query(collection(db, "businessList"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setAllBusinessList((prev) => [...prev, { id: doc.id, ...doc.data() }]);
    });
  };

  const GetBusinessByCategory = async (category) => {
    setBusinessList([]);
    const q = query(
      collection(db, "businessList"),
      where("category", "==", category)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setBusinessList((prev) => [...prev, { id: doc.id, ...doc.data() }]);
    });
  };

  return (
    <View
      style={{
        paddingTop: 60,
      }}
    >
      {/* Heading */}
      <Text
        style={{
          fontFamily: "primaryFont-bold",
          fontSize: 30,
          marginHorizontal: 20,
        }}
      >
        Explore More
      </Text>

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
          marginHorizontal: 20,
          margin: 10,
          marginTop: 15,
          borderWidth: 1,
          borderColor: Colors.PRIMARY,
        }}
      >
        <Ionicons name="search" size={24} color={Colors.PRIMARY} />
        <TextInput
          placeholder="Search..."
          style={{ fontFamily: "primaryFont-regular", fontSize: 16 }}
        />
      </View>

      {/* Category */}
      <Category
        explore={true}
        onCategorySelect={(category) => {
          setAllCategoryShow(false);
          GetBusinessByCategory(category);
        }}
      />

      {/* Business List */}
      {allCategoryShow ? (
        <ExploreBusinessList businessList={allBusinessList} />
      ) : (
        <ExploreBusinessList businessList={businessList} />
      )}
    </View>
  );
}
