import { View } from 'react-native';
import { Quicksand_400Regular, Quicksand_500Medium, Quicksand_700Bold, useFonts } from "@expo-google-fonts/quicksand";
import Onboarding from './onboarding';

export default function Home() {
  let [fontsLoaded] = useFonts({
    Quicksand_400Regular,
    Quicksand_500Medium,
    Quicksand_700Bold
  })

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View>
      <Onboarding />
    </View>

  );
}