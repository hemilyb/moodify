import { Tabs } from "expo-router";
import CustomTabBar from "../../components/CustomTabBar";

const Layout = () => {

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="profile/index" />
    </Tabs>
  )
}

export default Layout;