import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screen/auth/login";
import Option from "../screen/auth/option";
import SignUp from "../screen/auth/signUp";
import VerifyVehicle from "../screen/auth/verifyVehicle";
import VerifyAddress from "../screen/auth/verifyAddress";
import GuarantorForm from "../screen/auth/guarantorForm";
import Capture from "../screen/auth/capture";
import ForgotPassword from "../screen/auth/forgotPassword";
import ResetPassword from "../screen/auth/resetPassword";
import VerifyRider from "../screen/auth/verifyRider";

const Stack = createStackNavigator();

const AuthStack = () => {

	return (
		<Stack.Navigator
			initialRouteName="register1"
			screenOptions={{ headerShown: false }}
		>
			<Stack.Screen name="register1" component={Option} />
			<Stack.Screen name="login" component={Login} />
			<Stack.Screen name="signUp" component={SignUp} />
			<Stack.Screen name="verifyRider" component={VerifyRider} />
			<Stack.Screen name="forgotPassword" component={ForgotPassword} />
			<Stack.Screen name="resetPassword" component={ResetPassword} />
			<Stack.Screen name="verifyVehicle" component={VerifyVehicle} />
			<Stack.Screen name="verifyAddress" component={VerifyAddress} />
			<Stack.Screen name="guarantorForm" component={GuarantorForm} />
			<Stack.Screen name="capture" component={Capture} />
		</Stack.Navigator>
	);
};

export default AuthStack;
