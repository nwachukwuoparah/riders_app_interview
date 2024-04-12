import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screen/auth/login";
import Option from "../screen/auth/option";
import SignUp from "../screen/auth/signUp";
import VerifyVehicle from "../screen/auth/verifyVehicle";

const Stack = createStackNavigator();

const AuthStack = () => {
	return (
		<Stack.Navigator
			// initialRouteName="login"
			screenOptions={{ headerShown: false }}
		>
			<Stack.Screen name="register1" component={Option} />
			<Stack.Screen name="login" component={Login} />
			<Stack.Screen name="signUp" component={SignUp} />
			<Stack.Screen name="verifyVehicle" component={VerifyVehicle} />
		</Stack.Navigator>
	);
};
export default AuthStack;
