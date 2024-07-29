import { createStackNavigator } from "@react-navigation/stack";
import OrderDetails from "../screen/orders/orderDetails";
import BottomTab from "./bottomNav";
import Profile_Details from "../screen/profile/profileDetails";
import Vehicle_Details from "../screen/profile/vehicleDetails";
import Address from "../screen/profile/adress";
import Notification from "../screen/notification";
import { ROUTE } from "../constant/route";
import ChangePassword from "../screen/profile/changePassword";

const Stack = createStackNavigator();

const UserStack = () => {
	return (
		<Stack.Navigator
			initialRouteName="dashboard"
			screenOptions={{ headerShown: false }}
		>
			<Stack.Screen name={ROUTE.DASHBOARD} component={BottomTab} />
			<Stack.Screen name={ROUTE.ORDER_DETAILS} component={OrderDetails} />
			<Stack.Screen name={ROUTE.PROFILE_DETAILS} component={Profile_Details} />
			<Stack.Screen name={ROUTE.VEHICLE_DETAILS} component={Vehicle_Details} />
			<Stack.Screen name={ROUTE.ADDRESS} component={Address} />
			<Stack.Screen name={ROUTE.NOTIFICATION} component={Notification} />
			<Stack.Screen name={ROUTE.CHANGE_PASSWORD} component={ChangePassword} />
		</Stack.Navigator>
	);
};
export default UserStack;
