import React from "react";
import { StyleProp, Text, TextProps, TextStyle, StyleSheet } from "react-native";

interface CustomTextProps extends TextProps {
  children: React.ReactNode;
  bold?: boolean,
  style?: StyleProp<TextStyle>;
}

const CustomText = ({ children, style, bold, ...props }: CustomTextProps) => {
  return (
    <Text style={[
      styles.text,
      bold && { fontFamily: "Quicksand_700Bold" },
      style
    ]} {...props}>
      {children}
    </Text>
  )
}

const styles = StyleSheet.create({
  text: {
    fontFamily: "Quicksand_500Medium",
    fontSize: 16
  }
})

export default CustomText;