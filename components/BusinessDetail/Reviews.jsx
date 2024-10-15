import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  Image,
} from "react-native";
import React, { useState } from "react";
import { Rating } from "react-native-ratings";
import { Colors } from "./../../constants/Colors";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../../configs/FirebaseConfig";
import { useUser } from "@clerk/clerk-expo";

export default function Reviews({ business }) {
  const [rating, setRating] = useState(4);
  const [userInput, setUserInput] = useState();
  const { user } = useUser();

  const onSubmit = async () => {
    const docRef = doc(db, "businessList", business?.id);
    await updateDoc(docRef, {
      reviews: arrayUnion({
        rating: rating,
        comment: userInput,
        userName: user?.fullName,
        userImage: user?.imageUrl,
        userEmail: user?.primaryEmailAddress?.emailAddress,
      }),
    });
    ToastAndroid.show("Comment Added Successfully!", ToastAndroid.BOTTOM);
  };

  return (
    <View
      style={{
        padding: 20,
        backgroundColor: "#fff",
      }}
    >
      <Text
        style={{
          fontFamily: "primaryFont-bold",
          fontSize: 20,
        }}
      >
        Reviews
      </Text>

      <View>
        <Rating
          showRating={false}
          imageSize={20}
          onFinishRating={(rating) => {
            setRating(rating);
          }}
          style={{ paddingVertical: 10 }}
        />
        <TextInput
          placeholder="Write Your Comment"
          numberOfLines={4}
          onChangeText={(value) => {
            setUserInput(value);
          }}
          style={{
            borderWidth: 1,
            padding: 10,
            borderColor: Colors.GRAY,
            borderRadius: 10,
            textAlignVertical: "top",
          }}
        />
        <TouchableOpacity
          disabled={!userInput}
          onPress={() => onSubmit()}
          style={{
            backgroundColor: Colors.PRIMARY,
            padding: 10,
            marginTop: 10,
            borderRadius: 10,
          }}
        >
          <Text
            style={{
              fontFamily: "primaryFont-bold",
              color: "#fff",
              textAlign: "center",
            }}
          >
            Submit
          </Text>
        </TouchableOpacity>
      </View>

      {/* Display Reviews */}
      <View>
        {business?.reviews?.map((item, index) => (
          <View
            style={{
              borderWidth: 0.5,
              borderRadius: 15,
              padding: 10,
              marginVertical: 10,
              borderColor: Colors.GRAY,
            }}
            key={index}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 10,
                alignItems: "center",
              }}
            >
              <Image
                source={{ uri: item?.userImage }}
                style={{ width: 50, height: 50, borderRadius: 99 }}
              />
              <View style={{ display: "flex", gap: 5 }}>
                <Text
                  style={{
                    fontFamily: "primaryFont-medium",
                    fontSize: 15,
                  }}
                >
                  {item?.userName}
                </Text>
                <Rating
                  ratingCount={item?.rating}
                  imageSize={20}
                  style={{ alignItems: "flex-start" }}
                  readonly
                />
              </View>
            </View>

            <Text
              style={{
                fontFamily: "primaryFont-regular",
                marginVertical: 10,
              }}
            >
              {item?.comment}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}
