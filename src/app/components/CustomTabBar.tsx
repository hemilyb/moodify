import { TouchableOpacity, View } from "react-native";
import { AntDesign, Feather, Octicons } from "@expo/vector-icons";
import { colors } from "../../global/colors";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";

const CustomTabBar = ({ state, navigation }: BottomTabBarProps) => {
  const { onOpen } = useContext(UserContext);

  const go = (screenName: string) => {
    navigation.navigate(screenName);
  };

  return (
    <View style={{
      backgroundColor: colors.black,
      height: 55,
      width: "90%",
      margin: "auto",
      borderRadius: 20,
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
      bottom: 4
    }}>
      <TouchableOpacity
        onPress={() => go("index")}>
        <Octicons name="apps"
          color={state.index === 0 ? colors.white : colors.pink}
          size={24}
          style={{
            borderColor: colors.pink,
            borderBottomWidth: state.index === 0 ? 1 : 0,
            padding: 1
          }} />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => onOpen()}
        style={{
          position: "relative",
          alignItems: "center"
        }}
      >
        <AntDesign
          name="plus"
          color={colors.black}
          size={24}
          style={{
            position: "absolute",
            backgroundColor: colors.pink,
            padding: 16,
            borderRadius: 50,
            borderColor: colors.black,
            top: -45,
          }}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => go("profile/index")}>
        <Feather name="user"
          color={state.index === 1 ? colors.white : colors.pink}
          size={24}
          style={{
            borderColor: colors.pink,
            borderBottomWidth: state.index === 1 ? 1 : 0,
            padding: 1
          }} />
      </TouchableOpacity>
    </View>
  )
}

export default CustomTabBar;