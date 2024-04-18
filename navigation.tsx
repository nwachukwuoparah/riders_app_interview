import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import MainStack from "./navigation/mainStack";

export default function RootNavigation() {
	return (
		<>
			<MainStack />
			<StatusBar style="light" />
		</>
	);
}
