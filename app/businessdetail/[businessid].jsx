import { View, Text, ActivityIndicator, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../configs/FirebaseConfig";
import { Colors } from "../../constants/Colors";
import Intro from "../../components/BusinessDetail/Intro";
import ActionButton from "../../components/BusinessDetail/ActionButton";
import About from "../../components/BusinessDetail/About";
import Reviews from "../../components/BusinessDetail/Reviews";

export default function BusinessDetail() {
  const { businessid } = useLocalSearchParams();
  const [business, setBusiness] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    GetBusinessDetailById();
  }, []);

  // Used to get businessDetail by Id

  const GetBusinessDetailById = async () => {
    setLoading(true);
    const docRef = doc(db, "businessList", businessid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setBusiness({ id: docSnap.id, ...docSnap.data() });
      setLoading(false);
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No Such Document!");
      setLoading(false);
    }
  };

  return (
    <ScrollView>
      {loading ? (
        <ActivityIndicator
          style={{
            marginTop: "70%",
          }}
          color={Colors.PRIMARY}
          size={"large"}
        />
      ) : (
        <View>
          {/* Intro */}
          <Intro business={business} />

          {/* Action Buttons */}
          <ActionButton business={business} />

          {/* About Section */}
          <About business={business} />

          {/* Reviews Section */}
          <Reviews business={business} />
        </View>
      )}
    </ScrollView>
  );
}
