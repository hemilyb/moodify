import { useContext, useEffect, useState } from "react";
import { Image, View, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import CustomText from "./CustomText";
import { UserContext } from "../context/UserContext";
import { colors } from "../../global/colors";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CustomImagePicker = () => {
  const { userName } = useContext(UserContext);
  const [image, setImage] = useState("");

  useEffect(() => {
    const getProfileImage = async () => {
      const img = await AsyncStorage.getItem("profileImage");
      if (img) {
        setImage(img);
      }
    }

    getProfileImage();
  })

  const handleImagePicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      aspect: [4, 4],
      allowsEditing: true,
      base64: true,
      quality: 1
    });

    if (!result.canceled) {
      await AsyncStorage.setItem("profileImage", result.assets[0].uri);
      setImage(result.assets[0].uri);
    }
  }

  return (
    <View style={styles.header}>
      <Image
        source={image ? { uri: image } : require("../assets/default.jpg")}
        style={styles.profileImage}
      />
      <TouchableOpacity style={styles.changeIcon}
        onPress={handleImagePicker}
      >
        <Feather name="edit" size={24} color={colors.gray} />
      </TouchableOpacity>
      <CustomText bold style={styles.text}>
        {userName}
      </CustomText>
    </View>
  )
}

export default CustomImagePicker;

export const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    padding: 25,
    top: 40,
    alignItems: "center",
    justifyContent: "center"
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 100,
  },
  changeIcon: {
    position: "absolute",
    right: "10%",
    top: 25
  },
  text: {
    fontSize: 30,
    width: "50%",
    marginLeft: 25
  }
})