import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import colors from "../constant/theme";
import { StyleSheet, View } from "react-native";
import { Image } from "react-native";
import Show from "../components/show";
import Typography from "../components/typography";
import Home from "../screen/home";
import HomeIcon from "../assets/svg/home.svg";
import OverviewIcon from "../assets/svg/overview.svg";
import OrderIcon from "../assets/svg/order.svg";
import WalletIcon from "../assets/svg/wallet.svg";
import ProfileIcon from "../assets/svg/profile.svg";
import Overview from "../screen/overview";
import Order from "../screen/orders";
import Wallet from "../screen/wallet";
import Profile from "../screen/profile";

const Tab = createBottomTabNavigator();

const BottomTab = () => {
	return (
		<Tab.Navigator
			backBehavior="initialRoute"
			initialRouteName="insight"
			screenOptions={{
				headerShown: false,
				tabBarLabelStyle: { fontSize: hp("1.5%") },
				tabBarStyle: {
					height: hp("10%"),
					paddingBottom: 28,
					backgroundColor: colors.black_1,
				},
			}}
		>
			<Tab.Screen
				name="Home"
				options={{
					tabBarIcon: ({ focused }: { focused: boolean }) => {
						return (
							<View
								style={{
									...styles.active,
									paddingTop: 6,
									borderBlockColor: focused ? colors.yellow : "transparent",
								}}
							>
								<HomeIcon />
							</View>
						);
					},
					tabBarLabel: ({ focused, children }) => {
						return <Typography type="text12">{children}</Typography>;
					},
				}}
				component={Home}
			/>
			<Tab.Screen
				name="Overview"
				options={{
					tabBarIcon: ({ focused }: { focused: boolean }) => {
						return (
							<View
								style={{
									...styles.active,
									paddingTop: 6,
									borderBlockColor: focused ? colors.yellow : "transparent",
								}}
							>
								<OverviewIcon />
							</View>
						);
					},
					tabBarLabel: ({ focused, children }) => {
						return <Typography type="text12">{children}</Typography>;
					},
				}}
				component={Overview}
			/>
			<Tab.Screen
				name="Orders"
				options={{
					tabBarIcon: ({ focused }: { focused: boolean }) => {
						return (
							<View
								style={{
									...styles.active,
									paddingTop: 6,
									borderBlockColor: focused ? colors.yellow : "transparent",
								}}
							>
								<OrderIcon />
							</View>
						);
					},
					tabBarLabel: ({ focused, children }) => {
						return <Typography type="text12">{children}</Typography>;
					},
				}}
				component={Order}
			/>
			<Tab.Screen
				name="Wallet"
				options={{
					tabBarIcon: ({ focused }: { focused: boolean }) => {
						return (
							<View
								style={{
									...styles.active,
									paddingTop: 6,
									borderBlockColor: focused ? colors.yellow : "transparent",
								}}
							>
								<WalletIcon />
							</View>
						);
					},
					tabBarLabel: ({ focused, children }) => {
						return <Typography type="text12">{children}</Typography>;
					},
				}}
				component={Wallet}
			/>
			<Tab.Screen
				name="Profile"
				options={{
					tabBarIcon: ({ focused }: { focused: boolean }) => {
						return (
							<View
								style={{
									...styles.active,
									paddingTop: 6,
									borderBlockColor: focused ? colors.yellow : "transparent",
								}}
							>
								<ProfileIcon />
							</View>
						);
					},
					tabBarLabel: ({ focused, children }) => {
						return <Typography type="text12">{children}</Typography>;
					},
				}}
				component={Profile}
			/>
		</Tab.Navigator>
	);
};

const styles = StyleSheet.create({
	profile: {
		borderWidth: 1,
		borderRadius: 20,
		marginBottom: 5,
		width: 25,
		height: 25,
		alignItems: "center",
		justifyContent: "center",
	},
	active: {
		borderTopWidth: 2,
		height: "90%",
		width: "50%",
		paddingTop: 10,
		alignItems: "center",
	},
});

export default BottomTab;
