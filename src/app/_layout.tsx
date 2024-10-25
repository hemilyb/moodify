import { Stack } from "expo-router"
import { UserContextProvider } from "../context/UserContext"
const Layout = () => {

  return (
    <UserContextProvider>
      <Stack
        screenOptions={{
          headerShown: false
        }}
        initialRouteName="onboarding/index"
      >
        <Stack.Screen name="onboarding/index" />
        <Stack.Screen name="userName/index" />
        <Stack.Screen name="(tabs)/dashboard" />
      </Stack>
    </UserContextProvider>
  )
}

export default Layout;