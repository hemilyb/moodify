import { View } from "react-native";
import CustomText from "../../components/CustomText";
import { useContext } from "react";
import { styles } from "./styles";
import WeeklyMood from '../../components/WeeklyMood';
import { UserContext } from "../../context/UserContext";

const Dashboard = () => {
  const { userName } = useContext(UserContext);

  return (
    <View>
      <View style={styles.header}>
        <CustomText>Olá, {userName}!</CustomText>
        <CustomText bold>Como você está se sentindo hoje?</CustomText>
      </View>

      <View style={styles.container}>
        <WeeklyMood />
      </View>
    </View>
  )
}

export default Dashboard;