import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet } from "react-native";
import DiagnoseScanScreen from "../../screens/Diagnose/Scan";
import BottomTabs from "./BottomTabs";
import VarietyScanScreen from "../../screens/Variety/Scan/ScanScreen";
import VSelectAllScreens from "./VSelectAll";
import BuddingScanScreen from "../../screens/Budding/Scan";
import paymentScreen from "../../components/Common/Payment";

const Stack = createNativeStackNavigator();
const StackNav = () => {
  return (
    <Stack.Navigator initialRouteName="HomeNav">
      <Stack.Screen
        name="HomeNav"
        component={BottomTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DiagnoseScanScreen"
        component={DiagnoseScanScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="VarietyScanScreen"
        component={VarietyScanScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="VSelectAllScreens"
        component={VSelectAllScreens}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="BuddingScanScreenNoNav"
        component={BuddingScanScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="paymentScreen"
        component={paymentScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default StackNav;

const styles = StyleSheet.create({});
