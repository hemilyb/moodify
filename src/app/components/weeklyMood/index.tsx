import React, { useContext, useEffect, useState } from "react";
import { FlatList, TouchableOpacity, View,ScrollView, Modal, Image } from "react-native";
import { Feather, FontAwesome, SimpleLineIcons } from "@expo/vector-icons";
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
  const [confirmDelete, setConfirmDelete] = useState<{ day: string, date: number } | null>(null);

  useEffect(() => {
    const fetchMoodData = async () => {
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

    fetchMoodData();
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

            <View style={styles.optionContainer}>
              <TouchableOpacity style={styles.buttonOption} onPress={() => handleOpenModal(item.day, item.date)}>
                <SimpleLineIcons name="pencil" size={16} color={colors.gray} />
              </TouchableOpacity>

              <TouchableOpacity style={styles.buttonOption} onPress={() => setConfirmDelete({ day: item.day, date: item.date })}>
                <FontAwesome name="trash-o" size={16} color={colors.gray} />
              </TouchableOpacity>
            </View>
          </View>
          <CustomText style={{ marginTop: 8 }}>{item.description}</CustomText>

          <Modal
            visible={confirmDelete?.day === item.day && confirmDelete?.date === item.date}
            transparent={true}
            animationType="fade"
            onRequestClose={() => setConfirmDelete(null)}
          >
            <View style={styles.overlay}>
              <View style={styles.deleteContainer}>
                <View style={styles.iconCircle}>
                  <Image source={require("../../assets/icon-trash.png")} style={styles.trashIcon} />
                </View>

                <CustomText bold style={{ alignSelf: "center", marginTop: 20, fontSize: 20 }}>
                  Deletar essa memória?
                </CustomText>

                <CustomText style={{ textAlign: "center", marginTop: 20 }}>
                  Não será possível recuperar notas apagadas. Tem certeza de que deseja continuar?
                </CustomText>

                <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 40, padding: 12 }}>
                  <TouchableOpacity
                    onPress={() => removeMoodNote(item.day, item.date)}>
                    <CustomText style={{ color: "red" }}>
                      DELETAR
                    </CustomText>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => setConfirmDelete(null)}>
                    <CustomText style={{ color: colors.gray }}>
                      VOLTAR
                    </CustomText>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>

        </View>
      ) : null
    )
  }

  const removeMoodNote = async (day: string, date: number) => {
    const moodKey = `mood-${day}-${date}`;
    await AsyncStorage.removeItem(moodKey);
  }

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
      <FlatList
        data={moodData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => renderCard(item)}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
      <View style={styles.border}></View>
      <View>
        <FlatList
          data={[...moodData].reverse()}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => renderDescription(item, index)}
          scrollEnabled={false}
        />
      </View>
      <View style={{ padding: 100  }} />
    </ScrollView>
  );
}

export default WeeklyMood;