import { StyleSheet } from "react-native";
import { colors } from "../../global/colors";

export const styles = StyleSheet.create({
  logo: {
    width: 150,
    height: 150
  },
  boxOnboarding: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    gap: 4
  },
  button: {
    paddingHorizontal: 34,
    paddingVertical: 12,
    borderRadius: 50,
    backgroundColor: colors.pink,
  }
})