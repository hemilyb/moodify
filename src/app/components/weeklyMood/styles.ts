import { StyleSheet } from "react-native";
import { colors } from "../../../global/colors";

export const styles = StyleSheet.create({
  moodItem: {
    alignItems: "center",
    marginRight: 10,
    marginBottom: 20
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
    marginBottom: 50,
    paddingHorizontal: 4
  },
  border: {
    width: "80%",
    margin: "auto",
    borderWidth: 0.25,
    borderColor: colors.gray,
    borderStyle: "dashed",
    marginBottom: 20,
    alignSelf: "center"
  },
  rowDescription: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  optionContainer: {
    flexDirection: "row",
  },
  buttonOption: {
    padding: 8
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  deleteContainer: {
    position: "absolute",
    alignSelf: "center",
    backgroundColor: colors.white,
    elevation: 4,
    padding: 12,
    width: "90%",
    height: "50%",
    borderRadius: 20,
  },
  iconCircle: {
    width: 100,
    height: 100,
    backgroundColor: colors.pink,
    borderRadius: 50,
    alignSelf: "center",
    marginTop: 30
  },
  trashIcon: {
    margin: "auto",
  }
})
