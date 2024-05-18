import { createStackNavigator } from "@react-navigation/stack";
import AuthStack from "./authStack";
import BottomTab from "./bottomNav";
import UserStack from "./userStack";
import { getCachedAuthData } from "../utilities/storage";

const RootStack = createStackNavigator();

let userToken: null | String = null;
let userStep: null | String = null;
(async () => {
	try {
		const { token } = await getCachedAuthData("user-data");
		const step = await getCachedAuthData("step");
		userToken = token;
		userStep = step;
	} catch (err) {
		return (userToken = null);
	}
})();
const MainStack = () => {
	return (
		<RootStack.Navigator
			initialRouteName=	{!userStep && userToken === undefined ? "AuthStack" : "UserStack"}
			screenOptions={{ headerShown: false }}
		>
			<RootStack.Screen name="AuthStack" component={AuthStack} />
			<RootStack.Screen name="UserStack" component={UserStack} />
			<RootStack.Screen name="bottomTab" component={BottomTab} />
		</RootStack.Navigator>
	);
};

export default MainStack;
