import React, { createContext, useRef, useState } from "react";
import { Dimensions, KeyboardAvoidingView, Platform, View } from "react-native";
import { Modalize } from "react-native-modalize";
import CustomText from "../app/components/CustomText";
import { GestureHandlerRootView } from "react-native-gesture-handler";

interface UserContextType {
  userName: string;
  setUserName: (userName: string) => void;
  onOpen: () => void;
}

const defaultUserContext: UserContextType = {
  userName: '',
  setUserName: () => { },
  onOpen: () => { }
}

export const UserContext = createContext<UserContextType>(defaultUserContext);

interface UserContextProviderProps {
  children: React.ReactNode;
}

export const UserContextProvider: React.FC<UserContextProviderProps> = ({ children }) => {
  const modalizeRef = useRef<Modalize>(null);
  const [userName, setUserName] = useState('');

  const onOpen = () => {
    modalizeRef.current?.open()
  }

  const modalizeContainer = () => {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <View>
          <CustomText>ola</CustomText>
        </View>
      </KeyboardAvoidingView>
    )
  }

  return (
    <GestureHandlerRootView>
      <UserContext.Provider value={{ userName, setUserName, onOpen }}>
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