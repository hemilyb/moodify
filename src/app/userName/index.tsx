import React, { useContext, useState } from "react";
import { TextInput, TouchableOpacity, Vibration, View } from "react-native";
import CustomText from "../components/CustomText";
import { styles } from "./styles";
import { UserContext } from "../../context/UserContext";
import { useRouter } from "expo-router";

const UserName = () => {
  const { setUserName } = useContext(UserContext);
  const [inputValue, setInputValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleContinue = () => {
    if (inputValue) {
      setUserName(inputValue);
      router.push("/dashboard");
    }
    else {
      Vibration.vibrate();
      setErrorMessage("Campo obrigatório.");
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <CustomText bold> Nome completo: </CustomText>
        <TextInput
          style={styles.input}
          cursorColor={"#000"}
          value={inputValue}
          onChangeText={setInputValue}
          placeholder="Digite seu nome"
        />
        <CustomText bold style={{ color: "red", fontSize: 12, marginTop: 4 }}>{errorMessage}</CustomText>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleContinue}>
        <CustomText style={styles.buttonText}>Continuar</CustomText>
      </TouchableOpacity>
    </View>
  )
}

export default UserName;