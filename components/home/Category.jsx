import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../../constants/Colors";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../configs/FirebaseConfig";
import CategoryItem from "./CategoryItem";
import { useRouter } from "expo-router";

export default function Category() {
  const [categoryList, setCategoryList] = useState([]);
  const router = useRouter();

  useEffect(() => {
    GetCategoryList();
  }, []);

  const GetCategoryList = async () => {
    setCategoryList([]);
    const q = query(collection(db, "category"));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      setCategoryList((prev) => [...prev, doc.data()]);
    });
  };

  return (
    <View>
      {/* Heading */}
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          padding: 20,
          justifyContent: "space-between",
          marginTop: 10,
        }}
      >
        <Text
          style={{
            fontFamily: "primaryFont-bold",
            fontSize: 20,
          }}
        >
          Categories
        </Text>
        <Text
          style={{
            fontFamily: "primaryFont-regular",
            fontSize: 15,
            color: Colors.PRIMARY,
          }}
        >
          View All
        </Text>
      </View>

      {/* Category slider */}
      <FlatList
        data={categoryList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{
          marginLeft: 20,
        }}
        renderItem={({ item, index }) => (
          <CategoryItem
            category={item}
            key={index}
            onCategoryPress={(category) =>
              router.push("/businesslist/" + item.name)
            }
          />
        )}
      />
    </View>
  );
}
