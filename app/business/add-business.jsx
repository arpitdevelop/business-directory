import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ToastAndroid,
  ActivityIndicator,
  Alert,
  ScrollView,
  Platform,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useNavigation } from "expo-router";
import { Colors } from "../../constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";
import RNPickerSelect from "react-native-picker-select";
import { collection, doc, getDocs, query, setDoc } from "firebase/firestore";
import { db, storage } from "./../../configs/FirebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useUser } from "@clerk/clerk-expo";

export default function AddBusiness() {
  const navigation = useNavigation();

  const [image, setImage] = useState(null);
  const [categoryList, setCategoryList] = useState([]);
  const { user } = useUser();
  const [name, setName] = useState();
  const [address, setAddress] = useState();
  const [contact, setContact] = useState();
  const [website, setWebsite] = useState();
  const [about, setAbout] = useState();
  const [category, setCategory] = useState();
  const [loading, setLoading] = useState(false);

  // Reference to all the input fields
  const nameRef = useRef(null);
  const addressRef = useRef(null);
  const contactRef = useRef(null);
  const websiteRef = useRef(null);
  const aboutRef = useRef(null);
  const categoryRef = useRef(null);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Add Business",
      headerShown: true,
    });
    GetCategoryList();
  }, []);

  const onImagePick = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    setImage(result?.assets[0].uri);
    console.log(result);
  };

  const GetCategoryList = async () => {
    setCategoryList([]);
    const q = query(collection(db, "category"));
    const snapShot = await getDocs(q);
    snapShot.forEach((doc) => {
      console.log(doc.data());
      setCategoryList((prev) => [
        ...prev,
        {
          label: doc.data().name,
          value: doc.data().name,
        },
      ]);
    });
  };

  const onSubmit = async () => {
    setLoading(true);

    if (image && name && address && contact && website && about && category) {
      const fileName = Date.now().toString() + ".jpg";
      const resp = await fetch(image);
      const blob = await resp.blob();

      const imageRef = ref(storage, "AddBusinessImages/" + fileName);

      uploadBytes(imageRef, blob)
        .then((snapshot) => {
          console.log("File Uploaded!");
        })
        .then((resp) => {
          getDownloadURL(imageRef).then(async (downloadUrl) => {
            console.log(downloadUrl);
            saveBusinessDetails(downloadUrl);
          });
        });
    } else {
      console.log("Fill Fields");
      showAlert();
    }

    setLoading(false);
  };

  const saveBusinessDetails = async (imageUrl) => {
    await setDoc(doc(db, "businessList", Date.now().toString()), {
      name: name,
      address: address,
      contact: contact,
      website: website,
      about: about,
      category: category,
      username: user?.fullName,
      userEmail: user?.primaryEmailAddress?.emailAddress,
      userImage: user?.imageUrl,
      imageUrl: imageUrl,
    });

    if (Platform.OS === "android") {
      // Android-specific code
      ToastAndroid.show("New Business Added...", ToastAndroid.LONG);
    } else if (Platform.OS === "ios") {
      // iOS-specific code
      Alert.alert("New Business Added");
    }
    emptyFields();
  };

  // empty every field
  const emptyFields = () => {
    setImage(null);
    setName(null);
    nameRef.current.clear();
    setAddress(null);
    addressRef.current.clear();
    setContact(null);
    contactRef.current.clear();
    setWebsite(null);
    websiteRef.current.clear();
    setAbout(null);
    aboutRef.current.clear();
    setCategory(null);
  };

  const showAlert = () => {
    Alert.alert("Warning", "Please fill all the fields before submitting!", [
      {
        text: "cancel",
        onPress: () => console.log("cancel Pressed"),
        style: "cancel",
      },
    ]);
  };

  return (
    <ScrollView
      style={{
        padding: 20,
      }}
    >
      <Text
        style={{
          fontFamily: "primaryFont-bold",
          fontSize: 25,
        }}
      >
        Add New Business
      </Text>
      <Text
        style={{
          fontFamily: "primaryFont-regular",
          color: Colors.GRAY,
          marginTop: 10,
        }}
      >
        Fill all the required fields to add a new business.
      </Text>

      {/* Image Pick */}
      <TouchableOpacity
        onPress={() => onImagePick()}
        style={{
          marginTop: 20,
          backgroundColor: "#dddddd",
          borderRadius: 20,
          alignItems: "center",
          alignSelf: "center",
        }}
      >
        {image ? (
          <Image
            source={{ uri: image }}
            style={{ width: 120, height: 120, margin: 10, borderRadius: 20 }}
          />
        ) : (
          <Ionicons
            name="image"
            size={60}
            color="black"
            style={{ margin: 40 }}
          />
        )}
      </TouchableOpacity>

      {/* Input Fields */}

      <View>
        <TextInput
          placeholder="Name"
          ref={nameRef}
          onChangeText={(v) => setName(v)}
          style={{
            padding: 10,
            borderWidth: 1,
            borderRadius: 5,
            borderColor: Colors.PRIMARY,
            fontSize: 17,
            fontFamily: "primaryFont-regular",
            backgroundColor: "#fff",
            marginTop: 10,
          }}
        />
        <TextInput
          placeholder="Address"
          ref={addressRef}
          onChangeText={(v) => setAddress(v)}
          style={{
            padding: 10,
            borderWidth: 1,
            borderRadius: 5,
            borderColor: Colors.PRIMARY,
            fontSize: 17,
            fontFamily: "primaryFont-regular",
            backgroundColor: "#fff",
            marginTop: 10,
          }}
        />
        <TextInput
          placeholder="Contact"
          ref={contactRef}
          onChangeText={(v) => setContact(v)}
          style={{
            padding: 10,
            borderWidth: 1,
            borderRadius: 5,
            borderColor: Colors.PRIMARY,
            fontSize: 17,
            fontFamily: "primaryFont-regular",
            backgroundColor: "#fff",
            marginTop: 10,
          }}
        />
        <TextInput
          placeholder="Website"
          ref={websiteRef}
          onChangeText={(v) => setWebsite(v)}
          style={{
            padding: 10,
            borderWidth: 1,
            borderRadius: 5,
            borderColor: Colors.PRIMARY,
            fontSize: 17,
            fontFamily: "primaryFont-regular",
            backgroundColor: "#fff",
            marginTop: 10,
          }}
        />
        <TextInput
          placeholder="About"
          ref={aboutRef}
          onChangeText={(v) => setAbout(v)}
          multiline
          numberOfLines={5}
          style={{
            padding: 10,
            borderWidth: 1,
            borderRadius: 5,
            borderColor: Colors.PRIMARY,
            fontSize: 17,
            fontFamily: "primaryFont-regular",
            backgroundColor: "#fff",
            marginTop: 10,
            height: 100,
          }}
        />
        <View
          style={{
            padding: 10,
            borderWidth: 1,
            borderRadius: 5,
            borderColor: Colors.PRIMARY,
            fontSize: 17,
            fontFamily: "primaryFont-regular",
            backgroundColor: "#fff",
            marginTop: 10,
          }}
        >
          <RNPickerSelect
            ref={categoryRef}
            onValueChange={(value) => setCategory(value)}
            items={categoryList}
          />
        </View>
      </View>

      <TouchableOpacity
        disabled={loading}
        onPress={() => onSubmit()}
        style={{
          padding: 15,
          backgroundColor: Colors.PRIMARY,
          borderRadius: 5,
          marginTop: 20,
        }}
      >
        {loading ? (
          <ActivityIndicator size={"small"} color={"#fff"} />
        ) : (
          <Text
            style={{
              textAlign: "center",
              fontSize: 16,
              color: "#fff",
              fontFamily: "primaryFont-medium",
            }}
          >
            Submit
          </Text>
        )}
      </TouchableOpacity>
      <View
        style={{
          marginTop: 300,
        }}
      ></View>
    </ScrollView>
  );
}
