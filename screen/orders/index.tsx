import React, { useRef, useState } from "react";
import {
	FlatList,
	StyleSheet,
	TouchableOpacity,
	View,
} from "react-native";
import CustButton from "../../components/button";
import { Container, InnerWrapper } from "../../components/container";
import Typography from "../../components/typography";
import colors from "../../constant/theme";
import EmptyOrder from "../../assets/svg/emptyOrder.svg";
import {
	heightPercentageToDP as hp,
	widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import Ordercard from "../../components/orderCard";
import CancelModal from "../../modals/cancelModal";
import ConfirmModal from "../../modals/confirmModal";
import Show from "../../components/show";
import { ROUTE } from "../../constant/route";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types";


type OrderScreenNavigationProp = StackNavigationProp<RootStackParamList>;
type OrderScreenRouteProp = RouteProp<RootStackParamList>;

type Props = {
	navigation: OrderScreenNavigationProp;
	route: OrderScreenRouteProp;
};

const order = [
	{
		orderId: "123456",
		seller: {
			name: "Seller Name",
			address: {
				street: "123 Seller St",
			},
			coordinate: {
				latitud: 12.345678,
				longitud: 98.765432
			}
		},
		buyer: {
			name: "Buyer Name",
			address: {
				street: "456 Buyer Ave",
			},
			coordinates: {
				latitude: 37.786834, longitude: -122.406417
			}
		},
		totalPrice: 110.00,
		orderStatus: "Pending"
	},
	{
		orderId: "123456",
		seller: {
			name: "Seller Name",
			address: {
				street: "123 Seller St",
			},
			coordinate: {
				latitud: 12.345678,
				longitud: 98.765432
			}
		},
		buyer: {
			nam: "Buyer Name",
			address: {
				street: "456 Buyer Ave",
			},
			coordinates: {
				latitude: 37.786834, longitude: -122.406417
			}
		},
		totalPrice: 110.00,
		orderStatus: "Pending"
	},
	{
		orderId: "123456",
		seller: {
			name: "Seller Name",
			address: {
				street: "123 Seller St",
			},
			coordinate: {
				latitud: 12.345678,
				longitud: 98.765432
			}
		},
		buyer: {
			name: "Buyer Name",
			address: {
				street: "456 Buyer Ave",
			},
			coordinates: {
				latitude: 37.786834, longitude: -122.406417
			}
		},
		totalPrice: 110.00,
		orderStatus: "Pending"
	}
]

export default function Order({ navigation }: Props) {
	const [type, setType] = useState<string>("orderStatus=ready&orderStatus=picked&orderStatus=arrived")
	const [cancel, setCancel] = useState<boolean>(false);
	const [displayFilter, setDisplayFilter] = useState<boolean>(false);
	const [confirm, setConfirm] = useState<boolean>(false);
	const [orderID, setOrderId] = useState<string>("");
	const cancelRef = useRef(null);

	const cancelOrder = (id: string) => {
		setCancel(!cancel);
		setDisplayFilter(displayFilter);
		setConfirm(false);
		if (id) {
			setOrderId(id);
		}
	}

	const toogleConfirm = (id: string) => {
		setConfirm(!confirm);
		setDisplayFilter(false);
		setCancel(false);
		if (id) {
			setOrderId(id);
		}
	};

	return (
		<Container>
			<InnerWrapper sx={{ gap: 30, flex: 1 }}>
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "space-between",
					}}
				>
					<View style={styles.title}>
						<Typography type="text24">My activity overview</Typography>
						<Typography type="text16">
							Track your earnings and rides here
						</Typography>
					</View>
					<CustButton
						type="bell"
						color={colors.white}
						onPress={() => navigation.navigate(ROUTE.NOTIFICATION)}
					/>
				</View>

				<View style={styles.body}>
					<TouchableOpacity
						onPress={() => {
							setType("orderStatus=ready&orderStatus=picked&orderStatus=arrived");
						}}
						style={{
							...styles.button,
							borderBottomWidth: 1,
							borderColor: type === "orderStatus=ready&orderStatus=picked&orderStatus=arrived" ? colors.yellow : colors.grey_b,
						}}
					>
						<Typography type="text16">Pending</Typography>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => {
							setType("orderStatus=completed");
						}}
						style={{
							...styles.button,
							borderBottomWidth: 1,
							borderColor: type === "orderStatus=completed" ? colors.yellow : colors.grey_b,
						}}
					>
						<Typography type="text16">Completed</Typography>
					</TouchableOpacity>
				</View>

				<FlatList
					showsVerticalScrollIndicator={false}
					style={{
						flex: 1,
						width: "100%",
					}}
					contentContainerStyle={{
						gap: 30,
						paddingTop: "2%",
						paddingBottom: "15%",
					}}
					data={order}
					renderItem={({ item }: any) => (
						<Ordercard
							onPress={() => {
								navigation.navigate(ROUTE.ORDER_DETAILS, item)
							}}
							type={type}
							cancel={() => cancelOrder(item?._id)}
							confirm={() => toogleConfirm(item?._id)}
							item={item}
							navigation={navigation}
						/>
					)}
					// keyExtractor={(item) => item?._id}
					ListEmptyComponent={() => (
						<Show>
							<Show.When isTrue={!true}>
								<></>
							</Show.When>
							<Show.Else>
								<View
									style={{
										alignItems: "center",
										alignSelf: "center",
										justifyContent: "center",
										marginTop: 30,
									}}
								>
									<EmptyOrder width={wp("70%")} height={hp("35%")} />
									<Typography type="text16" sx={{ textAlign: "center" }}>
										You have no ongoing order at the moment, stay online to
										receive trip requests
									</Typography>
								</View>
							</Show.Else>
						</Show>
					)}
				/>
			</InnerWrapper>
			<CancelModal
				cancelRef={cancelRef}
				cancelOrder={cancelOrder}
				modalOpen={cancel}
				orderID={orderID}
			/>
			<ConfirmModal
				toogleConfirm={toogleConfirm}
				modalOpen={confirm}
				orderID={orderID}
				navigation={navigation}
			/>
		</Container>
	);
}


const styles = StyleSheet.create({
	title: {
		display: "flex",
		gap: 5,
	},
	body: {
		width: "100%",
		flexDirection: "row",
	},
	button: {
		width: "25%",
		paddingVertical: 15,
		borderBottomWidth: 0.5,
		borderColor: colors.grey_b,
		alignSelf: "flex-start",
		alignItems: "center",
		justifyContent: "center",
	},
	filter: {},
});
