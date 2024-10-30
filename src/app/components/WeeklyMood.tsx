import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, FlatList, TouchableOpacity, View, Dimensions } from "react-native";
import { Feather } from "@expo/vector-icons";
import CustomText from "./CustomText";
import { UserContext } from "../context/UserContext";
import { colors } from "../../global/colors";
import { moodIcon } from "../utils/moodIcon";
import AsyncStorage from "@react-native-async-storage/async-storage";

type MoodData = {
  day: string,
  date: number,
  mood: string,
  description: string
}

const WeeklyMood = () => {
  const { onOpen } = useContext(UserContext);
  const [moodData, setMoodData] = useState<MoodData[]>([]);

  useEffect(() => {
    const moodData = async () => {
      const daysOfWeek = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];
      const today = new Date();
      const moodArray: MoodData[] = [];

      for (let i = 6; i >= 0; i--) {
        const currentDate = new Date(today);
        currentDate.setDate(today.getDate() - i);

        const day = daysOfWeek[currentDate.getDay()];
        const date = currentDate.getDate();
        const moodKey = `mood-${day}-${date}`;
        const savedMood = await AsyncStorage.getItem(moodKey);
        const moodData = savedMood ? JSON.parse(savedMood) : { mood: "none", description: "" }

        moodArray.push({
          day,
          date,
          mood: moodData.mood,
          description: moodData.description
        });
      }

      setMoodData(moodArray);
    };

    moodData();
  }, [moodData]);

  const handleOpenModal = (day: string, date: number) => {
    onOpen(day, date);
  };


  const getMoodIcon = (mood: string) => {
    const moodItem = moodIcon.find((item) => item.name === mood);
    return moodItem ? moodItem.icon : <Feather name="plus" size={24} color="gray" />;
  }

  const renderCard = (item: MoodData) => {
    return (
      <TouchableOpacity style={styles.moodItem} onPress={() => handleOpenModal(item.day, item.date)}>
        <CustomText style={styles.dayText}>{item.day}</CustomText>
        <CustomText bold style={styles.dateText}>{item.date}</CustomText>
        <View style={[
          styles.iconContainer,
          item.mood !== "none"
            ? styles.activeIcon
            : styles.dashedBorder]}>
          {getMoodIcon(item.mood)}
        </View>
      </TouchableOpacity>
    );
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
      <FlatList
        data={moodData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => renderCard(item)}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
      <View style={styles.border}></View>
      <FlatList
        data={moodData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => renderDescription(item)}
        style={{ height: Dimensions.get("window").height / 1.5 }}
      />
    </View>
  );
}

export default WeeklyMood;

const styles = StyleSheet.create({
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
