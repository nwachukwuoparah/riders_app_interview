import { createStackNavigator } from "@react-navigation/stack";
import AuthStack from "./authStack";
import BottomTab from "./bottomNav";
import UserStack from "./userStack";
import { getCachedAuthData } from "../utilities/storage";
import { useEffect } from "react";

const RootStack = createStackNavigator();

let userToken: null | String;
let userStep: number | null;
let userStatus: boolean = false;
(async () => {
	try {
		const { status, token } = await getCachedAuthData("user-data");
		const step = await getCachedAuthData("step");
		userToken = token;
		userStep = step;
		userStatus = status;
	} catch (err) {
		userToken = null;
		userStep = null;
	}
})();

const MainStack = () => {

	return (
		<RootStack.Navigator
			initialRouteName={
				!userStep && userStatus && userToken ? "UserStack" : "AuthStack"
			}
			screenOptions={{ headerShown: false }}
		>
			<RootStack.Screen name="AuthStack" component={AuthStack} />
			<RootStack.Screen name="UserStack" component={UserStack} />
			<RootStack.Screen name="bottomTab" component={BottomTab} />
		</RootStack.Navigator>
	);
};

export default MainStack;
