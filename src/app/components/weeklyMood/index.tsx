import React, { useContext, useEffect, useState } from "react";
import { FlatList, TouchableOpacity, View, Dimensions, Pressable } from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import CustomText from "../CustomText";
import { UserContext } from "../../context/UserContext";
import { colors } from "../../../global/colors";
import { moodIcon } from "../../utils/moodIcon";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "./styles";

type MoodData = {
  day: string,
  date: number,
  mood: number,
  description: string
}

const WeeklyMood = () => {
  const { onOpen } = useContext(UserContext);
  const [moodData, setMoodData] = useState<MoodData[]>([]);
  const [openMenu, setOpenMenu] = useState<number | null>(null);

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
        const moodData = savedMood ? JSON.parse(savedMood) : { mood: 0, description: "" }

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

  const getMoodIcon = (moodId: number) => {
    const moodItem = moodIcon.find((item) => item.id === moodId);
    return moodItem ? moodItem.icon : <Feather name="plus" size={24} color="gray" />;
  }

  const renderCard = (item: MoodData) => {
    return (
      <TouchableOpacity style={styles.moodItem} onPress={() => handleOpenModal(item.day, item.date)}>
        <CustomText style={styles.dayText}>{item.day}</CustomText>
        <CustomText bold style={styles.dateText}>{item.date}</CustomText>
        <View style={[
          styles.iconContainer,
          item.mood !== 0
            ? styles.activeIcon
            : styles.dashedBorder]}>
          {getMoodIcon(item.mood)}
        </View>
      </TouchableOpacity>
    );
  }

  const renderDescription = (item: MoodData, index: number) => {
    return (
      item.description !== "" ? (
        <View style={styles.descriptionContainer}>
          <View style={styles.rowDescription}>
            <View style={{ flexDirection: "row" }}>
              {getMoodIcon(item.mood)}
              <CustomText bold style={{ marginLeft: 8 }}>
                {item.day}
              </CustomText>
            </View>
            <TouchableOpacity onPress={() => setOpenMenu(openMenu === index ? null : index)}>
              <MaterialCommunityIcons name="dots-horizontal" size={24} color={colors.gray} />
            </TouchableOpacity>
          </View>

          {openMenu === index && (
            <View style={styles.menuContainer}>
              <TouchableOpacity style={[styles.menuButton, { borderBottomWidth: 0.25, borderColor: colors.gray }]} onPress={() => handleOpenModal(item.day, item.date)}>
                <CustomText>Editar</CustomText>
              </TouchableOpacity>

              <TouchableOpacity style={styles.menuButton} onPress={() => removeMoodNote(item.day, item.date)}>
                <CustomText style={{ color: "red" }}>Deletar</CustomText>
              </TouchableOpacity>
            </View>
          )}

          <CustomText style={{ marginTop: 8 }}>{item.description}</CustomText>
        </View>
      ) : null
    )
  }

  const removeMoodNote = async (day: string, date: number) => {
    const moodKey = `mood-${day}-${date}`;
    await AsyncStorage.removeItem(moodKey);
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
      <Pressable onPress={() => setOpenMenu(null)}>
        <FlatList
          data={moodData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => renderDescription(item, index)}
          style={{ height: Dimensions.get("window").height / 1.5 }}
        />
      </Pressable>
    </View>
  );
}

export default WeeklyMood;