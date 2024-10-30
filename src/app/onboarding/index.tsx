import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import logo from "../assets/logo.png";
import { styles } from "./styles";
import CustomText from "../components/CustomText";
import { useRouter } from 'expo-router';

const Onboarding = () => {

  const router = useRouter();

  return (
    <View style={styles.boxOnboarding}>
      <CustomText bold style={{ fontSize: 22 }}>Bem-vindo à</CustomText>
      <CustomText bold style={{ fontSize: 22 }}>Moodify</CustomText>
      <Image
        style={styles.logo}
        source={logo}
        resizeMode="contain"
      />
      <TouchableOpacity style={styles.button} onPress={() => router.push("/userName")}>
          <CustomText bold>CONTINUAR</CustomText>
      </TouchableOpacity>
    </View>
  )
}

export default Onboarding;