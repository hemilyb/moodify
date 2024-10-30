import { StyleSheet } from "react-native";
import { colors } from "../../global/colors";

export const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  date: {
    position: "absolute",
    right: 0,
    padding: 10
  },
  text: {
    textAlign: "center",
    padding: 20
  },
  moodIcon: {
    padding: 4,
    borderRadius: 20,
    margin: "auto",
  },
  textInput: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginTop: 20
  },
  boxInput: {
    width: "90%",
    borderColor: "#D9D9D9",
    borderWidth: 1,
    borderRadius: 20,
    margin: "auto",
    marginTop: 20,
    padding: 15
  },
  button: {
    paddingHorizontal: 34,
    paddingVertical: 12,
    borderRadius: 50,
    backgroundColor: colors.pink,
    alignSelf: "center",
    marginTop: 40
  }
})