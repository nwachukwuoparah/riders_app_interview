import { createStackNavigator } from "@react-navigation/stack";
import AuthStack from "./authStack";

const RootStack = createStackNavigator(); 

const MainStack = () => {

	return (
		<RootStack.Navigator
			// initialRouteName={
			// 	!userStep && userToken === null ? "AuthStack" : "VendorStack"
			// }
			screenOptions={{ headerShown: false }}
		>
			<RootStack.Screen name="AuthStack" component={AuthStack} />
			{/* <RootStack.Screen name="VendorStack" component={VendorStack} />
			<RootStack.Screen name="TabNav" component={TabNav} /> */}
		</RootStack.Navigator>
	);
};

export default MainStack;
