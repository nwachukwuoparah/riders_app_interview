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
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UserProvider from "./components/contex/userContex";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";

const queryClient = new QueryClient();

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
		<QueryClientProvider client={queryClient}>
			<View style={{ flex: 1 }}>
				<GestureHandlerRootView style={{ flex: 1 }}>
					<NavigationContainer>
						<UserProvider>
							<StatusBar style="light" />
							<BottomSheetModalProvider>
								<MainStack />
							</BottomSheetModalProvider>
						</UserProvider>
					</NavigationContainer>
				</GestureHandlerRootView>
			</View>
		</QueryClientProvider>
	);
}
