import { Image, View } from "react-native";
import { styles } from "./styles";
import CustomText from "../../../components/CustomText";
import { useContext } from "react";
import { UserContext } from "../../../../context/UserContext";
import { Feather, Ionicons, MaterialCommunityIcons, MaterialIcons, SimpleLineIcons } from "@expo/vector-icons";
import CustomTextAccount from "../../../components/CustomTextAccount";
import { colors } from "../../../../global/colors";
import { ScrollView } from "react-native-gesture-handler";

const Profile = () => {
  const { userName } = useContext(UserContext);

  return (
    <ScrollView style={{ marginBottom: 20 }}>
      <View style={styles.header}>
        <Image
          source={require("../../../../assets/memoji.png")}
          style={styles.profileImage}
        />
        <Feather name="edit" size={24} style={styles.changeIcon} />
        <CustomText bold style={styles.text}>
         {userName}
        </CustomText>
      </View>

      <View style={styles.container}>
        <CustomText bold style={{ fontSize: 18 }}>
          Conta
        </CustomText>
        <CustomTextAccount
          Icon={Feather}
          name="user"
          text="Informações Pessoais"
          bgColor={colors.pink}
        />
        <CustomTextAccount
          Icon={Ionicons}
          name="notifications-outline"
          text="Notificações"
          bgColor={colors.blue}
        />
        <CustomTextAccount
          Icon={MaterialCommunityIcons}
          name="shield-key-outline"
          text="Privacidade e Segurança"
          bgColor={colors.green}
        />
      </View>

      <View style={styles.container}>
        <CustomText bold style={{ fontSize: 18 }}>
          Customização
        </CustomText>
        <CustomTextAccount
          Icon={Feather}
          name="smartphone"
          text="Aparência"
          bgColor={colors.yellow}
        />
        <CustomTextAccount
          Icon={Ionicons}
          name="accessibility"
          text="Acessibilidade"
          bgColor={colors.purple}
        />
        <CustomTextAccount
          Icon={MaterialIcons}
          name="language"
          text="Linguagem"
          bgColor={colors.pink}
        />
      </View>

      <View style={styles.container}>
        <CustomText bold style={{ fontSize: 18 }}>
          Suporte
        </CustomText>
        <CustomTextAccount
          Icon={Feather}
          name="key"
          text="Permissões"
          bgColor={colors.blue}
        />
        <CustomTextAccount
          Icon={MaterialCommunityIcons}
          name="headset"
          text="Suporte & FAQ"
          bgColor={colors.green}
        />
        <CustomTextAccount
          Icon={SimpleLineIcons}
          name="pencil"
          text="Feedback"
          bgColor={colors.yellow}
        />
      </View>
    </ScrollView>
  )
}

export default Profile;