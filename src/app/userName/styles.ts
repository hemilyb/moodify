import { Button, StyleSheet } from "react-native";
import { colors } from "../../global/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    padding: 20,
  },
  box: {
    alignItems: "center",
    justifyContent: "center",
    top: "20%",
  },
  input: {
    height: 40,
    width: "80%",
    borderWidth: 1,
    borderColor: colors.pink,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 20
  },
  button: {
    paddingHorizontal: 34,
    paddingVertical: 12,
    borderRadius: 50,
    backgroundColor: colors.black,
    alignSelf: "center",
    bottom: "20%"
  },
  buttonText: {
    color: colors.white
  }
})