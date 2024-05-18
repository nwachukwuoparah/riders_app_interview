import { createStackNavigator } from "@react-navigation/stack";
import OrderDetails from "../screen/orders/orderDetails";
import BottomTab from "./bottomNav";
import Profile_Details from "../screen/profile/profileDetails";
import Vehicle_Details from "../screen/profile/vehicleDetails";
import Address from "../screen/profile/adress";
import Guarantors from "../screen/profile/guarantors";
import WorkingHours from "../screen/profile/workingHours";
import ChangePassword from "../screen/profile/changePassword";
import Referal from "../screen/profile/referal";
import Contact from "../screen/profile/contact";
import BankInfo from "../screen/profile/bankInfo";
import bank_details from "../screen/profile/bankDetails";

const Stack = createStackNavigator();

const UserStack = () => {
	return (
		<Stack.Navigator
			initialRouteName="dashboard"
			screenOptions={{ headerShown: false }}
		>
			<Stack.Screen name="dashboard" component={BottomTab} />
			<Stack.Screen name="orderDetails" component={OrderDetails} />
			<Stack.Screen name="profileDetails" component={Profile_Details} />
			<Stack.Screen name="vehicleDetails" component={Vehicle_Details} />
			<Stack.Screen name="address" component={Address} />
			<Stack.Screen name="guarantorForm" component={Guarantors} />
			<Stack.Screen name="bankInfo" component={BankInfo} />
			<Stack.Screen name="bankDetails" component={bank_details} />
			<Stack.Screen name="workingHours" component={WorkingHours} />
			<Stack.Screen name="changePassword" component={ChangePassword} />
			<Stack.Screen name="referal" component={Referal} />
			<Stack.Screen name="contact" component={Contact} />
		</Stack.Navigator>
	);
};
export default UserStack;
