import { createStackNavigator } from "@react-navigation/stack";
import AuthStack from "./authStack";
import BottomTab from "./bottomNav";
import UserStack from "./userStack";

const RootStack = createStackNavigator();

const MainStack = () => {
	return (
		<RootStack.Navigator
			initialRouteName="AuthStack"
			screenOptions={{ headerShown: false }}
		>
			<RootStack.Screen name="AuthStack" component={AuthStack} />
			<RootStack.Screen name="UserStack" component={UserStack} />
			<RootStack.Screen name="bottomTab" component={BottomTab} />
		</RootStack.Navigator>
	);
};

export default MainStack;
