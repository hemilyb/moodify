import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, TouchableOpacity, View } from "react-native";
import logo from "../assets/logo.png";
import { styles } from "./styles";
import CustomText from "../components/CustomText";
import { useRouter } from 'expo-router';
import AsyncStorage from "@react-native-async-storage/async-storage";

const Onboarding = () => {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setLoading(false);
    setTimeout(() => {
      setLoading(true);
      checkUsernameExists();
    }, 3000);
    
  }, [])

  const checkUsernameExists = async () => {
    const username = await AsyncStorage.getItem("username");
    if (username) {
      return router.push("/dashboard");
    }
    router.push("/userName");
  }

  return (
    <View style={styles.boxOnboarding}>
      <CustomText bold style={{ fontSize: 22 }}>Bem-vindo à</CustomText>
      <CustomText bold style={{ fontSize: 22 }}>Moodify</CustomText>
      <Image
        style={styles.logo}
        source={logo}
        resizeMode="contain"
      />
      {loading && (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      )}
    </View>
  )
}

export default Onboarding;