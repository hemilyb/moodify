import { StyleSheet } from "react-native";
import { colors } from "../../../global/colors";

export const styles = StyleSheet.create({
  header: {
    height: 120,
    top: 50,
    paddingHorizontal: 20
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    marginTop: 10,
    marginBottom: 40
  },
  moodItem: {
    alignItems: "center",
    marginRight: 10
  },
  dayText: {
    fontSize: 12,
    marginBottom: 4,
    color: "#b2b0b0"
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 4,
  },
  activeIcon: {
    backgroundColor: colors.pink,
  },
  dashedBorder: {
    borderWidth: 1,
    borderColor: colors.gray,
    borderStyle: "dashed",
  },
  dateText: {
    fontSize: 12,
    margin: 4
  },
  descriptionContainer: {
    marginBottom: 15,
    paddingHorizontal: 20
  },
  border: {
    width: "80%",
    margin: "auto",
    borderWidth: 0.25,
    borderColor: colors.gray,
    borderStyle: "dashed",
    marginBottom: 20,
    marginTop: 0
  }
})