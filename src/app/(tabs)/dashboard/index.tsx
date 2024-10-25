import { Dimensions, FlatList, TouchableOpacity, View } from "react-native";
import CustomText from "../../components/CustomText";
import { useContext } from "react";
import { UserContext } from "../../../context/UserContext";
import { styles } from "./styles";
import { Feather, FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { moodData } from './moodData';

type MoodData = {
  day: string,
  date: number,
  mood: string,
  description: string
}

const Dashboard = () => {
  const { userName, onOpen } = useContext(UserContext);

  const getMoodIcon = (mood: string) => {
    switch (mood) {
      case "happy":
        return <MaterialCommunityIcons name="emoticon-happy-outline" size={24} color="black" />;
      case "sad":
        return <MaterialCommunityIcons name="emoticon-sad-outline" size={24} color="black" />;
      case "meh":
        return <FontAwesome name="meh-o" size={24} color="black" />
      default:
        return <Feather name="plus" size={24} color="gray" />;
    }
  }

  const renderCard = (item: MoodData) => {
    return (
      <TouchableOpacity style={styles.moodItem}
        onPress={() => onOpen()}
      >
        <CustomText style={styles.dayText}>
          {item.day}
        </CustomText>
        <CustomText bold style={styles.dateText}>
          {item.date}
        </CustomText>
        <View style={[styles.iconContainer, item.mood !== "none" ? styles.activeIcon : styles.dashedBorder]}>
          {getMoodIcon(item.mood)}
        </View>
      </TouchableOpacity>
    )
  }

  const renderDescription = (item: MoodData) => {
    return (
      item.mood !== "none" ? (
        <View style={styles.descriptionContainer}>
          <CustomText bold style={{ marginBottom: 4 }}>
            {item.day}
          </CustomText>
          <CustomText>{item.description}</CustomText>
        </View>
      ) : null
    )
  }

  return (
    <View>
      <View style={styles.header}>
        <CustomText>Olá, {userName}!</CustomText>
        <CustomText bold>Como você está se sentindo hoje?</CustomText>
      </View>

      <View style={styles.container}>
        <FlatList
          data={moodData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => renderCard(item)}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <View style={styles.border}></View>

      <View>
        <FlatList
          data={moodData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => renderDescription(item)}
          style={{ height: Dimensions.get("window").height / 1.5 }}
        />
      </View>
    </View>
  )
}

export default Dashboard;