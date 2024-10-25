import { TouchableOpacity, View } from "react-native";
import CustomText from "./CustomText";
import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { colors } from "../../global/colors";

interface CustomTextAccountProps {
  Icon: React.ElementType;
  name: string;
  text: string;
  bgColor: string;
}

const CustomTextAccount = ({ Icon, name, text, bgColor }: CustomTextAccountProps) => {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={[
        styles.iconContainer,
        { backgroundColor: bgColor }]}>
        <Icon
          name={name}
          size={24}
        />
      </View>
      <CustomText bold style={styles.text}>
        {text}
      </CustomText>
      <MaterialIcons
        name="keyboard-arrow-right"
        size={28}
        style={styles.arrowRight} />
    </TouchableOpacity>
  )
}

export default CustomTextAccount;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginTop: 10,
    gap: 12,
    padding: 2
  },
  iconContainer: {
    width: 35,
    height: 35,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {

  },
  arrowRight: {
    position: "absolute",
    right: 0,
    justifyContent: "center",
    color: colors.black
  },
})