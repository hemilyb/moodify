import React, { createContext, useEffect, useRef, useState } from "react";
import { Dimensions, KeyboardAvoidingView, Platform, Pressable, TouchableOpacity, View } from "react-native";
import { Modalize } from "react-native-modalize";
import { GestureHandlerRootView, TextInput } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomText from "../components/CustomText";
import { moodIcon } from "../utils/moodIcon";
import { styles } from "./styles";
import { SimpleLineIcons } from "@expo/vector-icons"
import { colors } from "../../global/colors";

interface UserContextType {
  userName: string;
  setUserName: (userName: string) => void;
  onOpen: (day?: string, date?: number) => void;
  selectedDay: string,
  selectedDate: number;
}

const defaultUserContext: UserContextType = {
  userName: "",
  setUserName: () => { },
  onOpen: () => { },
  selectedDay: "",
  selectedDate: 0
}

export const UserContext = createContext<UserContextType>(defaultUserContext);

interface UserContextProviderProps {
  children: React.ReactNode;
}

export const UserContextProvider: React.FC<UserContextProviderProps> = ({ children }) => {
  const modalizeRef = useRef<Modalize>(null);
  const [userName, setUserName] = useState('');
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedDate, setSelectedDate] = useState(0);
  const [inputHeight, setInputHeight] = useState(150);
  const [selectedMood, setSelectedMood] = useState<number | null>(null);

  const [note, setNote] = useState({
    mood: "",
    description: ""
  })

  const handleContentSizeChange = (contentSize: any) => {
    if (contentSize && contentSize.contentSize) {
      setInputHeight(contentSize.contentSize.height);
    }
  };

  useEffect(() => {
    const getUserName = async () => {
      const username = await AsyncStorage.getItem("username");
      if (username) {
        setUserName(username);
      }
    }
    getUserName();
  }, [])

  const onOpen = (day = "", date = 0) => {
    setSelectedDay(day);
    setSelectedDate(date);
    modalizeRef.current?.open()
  }

  const handleChange = (key: string, value: string) => {
    setNote(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const handleSaveNote = async () => {
    if (note.mood) {
      const moodKey = `mood-${selectedDay}-${selectedDate}`;
      await AsyncStorage.setItem(moodKey, JSON.stringify(note));
    }

    setNote({
      mood: "",
      description: ""
    });
    setSelectedMood(null);
    modalizeRef.current?.close()
  }

  const modalizeContainer = () => {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ height: Dimensions.get("window").height / 1.7, padding: 20 }} >
        <CustomText bold style={styles.date}>
          {selectedDay} - {selectedDate}
        </CustomText>
        <CustomText bold style={[styles.text, { top: 10 }]}>
          Como você esteve?
        </CustomText>
        <View style={styles.rowContainer}>
          {
            moodIcon.map((mood, index) => (
              <TouchableOpacity key={index}
                onPress={() => {
                  handleChange("mood", mood.name);
                  setSelectedMood(index)
                }}
                style={[
                  styles.moodIcon,
                  selectedMood === index
                  && { backgroundColor: colors.pink }]}>
                {mood.icon}
              </TouchableOpacity>
            ))
          }
        </View>
        <View style={styles.textInput}>
          <SimpleLineIcons name="pencil" size={16} />
          <CustomText bold>O que você tem feito?</CustomText>
        </View>
        <TextInput
          style={[styles.boxInput, { height: Math.max(40, inputHeight) }]}
          placeholder="Adicionar nota..."
          textAlignVertical="top"
          multiline
          onContentSizeChange={handleContentSizeChange}
          value={note.description}
          onChangeText={(value) => handleChange("description", value)}
        />

        <TouchableOpacity style={styles.button} onPress={handleSaveNote}>
          <CustomText bold style={{ color: colors.black }}>Salvar</CustomText>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    )
  }

  const data = {
    userName,
    setUserName,
    onOpen,
    selectedDay,
    selectedDate
  }

  return (
    <GestureHandlerRootView>
      <UserContext.Provider value={data}>
        {children}
        <Modalize
          ref={modalizeRef}
          childrenStyle={{ height: Dimensions.get("window").height / 1.7 }}
          adjustToContentHeight={true}
        >
          {modalizeContainer()}
        </Modalize>
      </UserContext.Provider>
    </GestureHandlerRootView>
  )
}