import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screen/auth/login";
import Option from "../screen/auth/option";
import SignUp from "../screen/auth/signUp";
import VerifyRider from "../screen/auth/verifyRider";
import { ROUTE } from "../constant/route";

const Stack = createStackNavigator();

const AuthStack = () => {

	return (
		<Stack.Navigator
			initialRouteName="register1"
			screenOptions={{ headerShown: false }}
		>
			<Stack.Screen name={ROUTE.OPTION} component={Option} />
			<Stack.Screen name={ROUTE.LOGIN} component={Login} />
			<Stack.Screen name={ROUTE.SIGN_UP} component={SignUp} />
			<Stack.Screen name={ROUTE.VERIFY} component={VerifyRider} />
		</Stack.Navigator>
	);
};

export default AuthStack;
