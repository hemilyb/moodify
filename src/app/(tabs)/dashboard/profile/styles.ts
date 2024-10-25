import { StyleSheet } from "react-native";
import { colors } from "../../../../global/colors";

export const styles = StyleSheet.create({
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 100,
  },
  header: {
    flexDirection: "row",
    padding: 25,
    top: 40,
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    fontSize: 30,
    width: "50%",
    marginLeft: 25
  },
  changeIcon: {
    position: "absolute",
    right: "74%",
    top: 25,
    color: colors.gray
  },
  container: {
    paddingHorizontal: 25,
    marginTop: 30
  }
})