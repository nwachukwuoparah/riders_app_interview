import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screen/auth/login";
import Option from "../screen/auth/option";
import SignUp from "../screen/auth/signUp";
import VerifyVehicle from "../screen/auth/verifyVehicle";
import VerifyAddress from "../screen/auth/verifyAddress";
import GuarantorForm from "../screen/auth/guarantorForm";
import Capture from "../screen/auth/capture";

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
			<Stack.Screen name="verifyAddress" component={VerifyAddress} />
			<Stack.Screen name="guarantorForm" component={GuarantorForm} />
			<Stack.Screen name="capture" component={Capture} />
		</Stack.Navigator>
	);
};
export default AuthStack;
