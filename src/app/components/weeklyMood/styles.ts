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
    marginBottom: 100,
    paddingHorizontal: 10
  },
  border: {
    width: "80%",
    margin: "auto",
    borderWidth: 0.25,
    borderColor: colors.gray,
    borderStyle: "dashed",
    marginBottom: 20,
    marginTop: 0
  },
  rowDescription: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  menuContainer: {
    position: "absolute",
    width: 150,
    right: 20,
    top: 28,
    zIndex: 1,
    backgroundColor: colors.white,
    borderRadius: 10,
    elevation: 2
  },
  menuButton: {
    padding: 14
  }
})
