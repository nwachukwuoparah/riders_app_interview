import React, { useEffect, useState } from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import MainStack from "./navigation/mainStack";
import {
	DMSans_400Regular,
	DMSans_500Medium,
	DMSans_700Bold,
} from "@expo-google-fonts/dm-sans";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import Show from "./components/show";
import Splash from "./components/splashScreen";
import { StatusBar } from "react-native";

SplashScreen.preventAutoHideAsync();

export default function App() {
	const [splash, setSplash] = useState(true);
	const [fontsLoaded] = useFonts({
		DMSans_400Regular,
		DMSans_500Medium,
		DMSans_700Bold,
	});

	if (!fontsLoaded) {
		SplashScreen.hideAsync();
	}

	useEffect(() => {
		setTimeout(() => setSplash(false), 5000);
	}, []);

	return (
		<Show>
			<Show.When isTrue={splash}>
				<Splash />
			</Show.When>
			<Show.Else>
				<NavigationContainer>
					<MainStack />
				</NavigationContainer>
			</Show.Else>
		</Show>
	);
}
