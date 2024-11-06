import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, TouchableOpacity, View } from "react-native";
import logo from "../assets/logo.png";
import { styles } from "./styles";
import CustomText from "../components/CustomText";
import { useRouter } from 'expo-router';
import AsyncStorage from "@react-native-async-storage/async-storage";

const Onboarding = () => {
  const router = useRouter();

  useEffect(() => {
    const checkUsernameExists = async () => {
      const username = await AsyncStorage.getItem("username");
      if (username) {
        return router.replace("/dashboard");
      }
      router.push("/userName");
    }
    checkUsernameExists()
  }, [])


  return (
    <View style={styles.boxOnboarding}>
      <CustomText bold style={{ fontSize: 22 }}>Bem-vindo à</CustomText>
      <CustomText bold style={{ fontSize: 22 }}>Moodify</CustomText>
      <Image
        style={styles.logo}
        source={logo}
        resizeMode="contain"
      />
    </View>
  )
}

export default Onboarding;