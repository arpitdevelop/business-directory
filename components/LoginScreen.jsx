import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import * as WebBrowser from "expo-web-browser";
import { Colors } from "@/constants/Colors";
import { useWarmUpBrowser } from "./../hooks/useWarmUpBrowser";
import { useOAuth } from "@clerk/clerk-expo";

WebBrowser.maybeCompleteAuthSession();
export default function LoginScreen() {
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();

      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);

  return (
    <View>
      {/* Screenshot Container */}
      <View
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: 100,
        }}
      >
        <Image
          source={require("./../assets/images/login.png")}
          style={{
            width: 220,
            height: 450,
            borderRadius: 20,
            borderWidth: 6,
            borderColor: "#000",
          }}
        />
      </View>
      {/* Tagline Container */}
      <View style={styles.subContainer}>
        <Text
          style={{
            fontSize: 25,
            fontFamily: "primaryFont-bold",
            textAlign: "center",
          }}
        >
          Your Ultimate
          <Text
            style={{
              color: Colors.PRIMARY,
            }}
          >
            {" "}
            Business Directory App{" "}
          </Text>
          For All Needs!
        </Text>
        <Text
          style={{
            fontSize: 15,
            fontFamily: "primaryFont-regular",
            textAlign: "center",
            marginVertical: 15,
            color: Colors.GRAY,
          }}
        >
          Find businesses near you and publish your own business to reach new
          audiences!
        </Text>
      </View>
      <TouchableOpacity style={styles.btn} onPress={onPress}>
        <Text
          style={{
            color: "#fff",
            textAlign: "center",
            fontFamily: "primaryFont-regular",
          }}
        >
          Let's Get Started
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  subContainer: {
    backgroundColor: "#fff",
    padding: 20,
    marginTop: -20,
  },
  btn: {
    backgroundColor: Colors.PRIMARY,
    padding: 16,
    borderRadius: 99,
    marginHorizontal: 20,
    marginTop: 20,
  },
});
