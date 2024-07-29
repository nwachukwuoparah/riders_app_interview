import {
	Pressable,
	StyleSheet,
	TouchableOpacity,
	View,
} from "react-native";
import CustButton from "../../components/button";
import {
	Container,
	InnerWrapper,
	ScrollContainer,
} from "../../components/container";
import Typography from "../../components/typography";
import colors from "../../constant/theme";
import User from "../../assets/svg/user.svg";
import ProfileCard from "../../components/profile";
import { CommonActions, RouteProp } from "@react-navigation/native";
import Rating from "../../components/rating";
import Show from "../../components/show";
import { ROUTE } from "../../constant/route";
import DeleteModal from "../../modals/deleteModal";
import { useRef, useState } from "react";
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
				latitude: 5.3877004,
				longitude: 6.999366699999999
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
				latitude: 5.3877004,
				longitude: 6.999366699999999
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
				latitude: 5.3877004,
				longitude: 6.999366699999999
			}
		},
		totalPrice: 110.00,
		orderStatus: "Pending"
	}
]

export default function Profile({ navigation }: Props) {
	const deleteRef = useRef(null)
	const [modalOpen, setModalOpen] = useState<boolean>(false)

	return (
		<Container>
			<InnerWrapper sx={{ gap: 25 }}>
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "space-between",
					}}
				>
					<View style={styles.title}>
						<Typography type="text24">My profile</Typography>
						<Typography type="text16">Manage your account here</Typography>
					</View>
					<CustButton
						type="bell"
						color={colors.white}
						onPress={() => navigation.navigate(ROUTE.NOTIFICATION)}
					/>
				</View>
				<ScrollContainer
					sx={{ height: "100%" }}
					innerStyles={{ gap: 15, paddingBottom: "30%" }}

				>
					<View style={styles.user}>
						<Show.Else>
							<User />
						</Show.Else>

						<Typography type="text24">John</Typography>
						<Typography type="text16">
							0 rides done
						</Typography>
						<Rating maxStars={5} defaultRating={3} />
					</View>
					<View style={{ gap: 5 }}>
						{[
							{
								value: "My account details",
								route: ROUTE.PROFILE_DETAILS,
								type: "routh",
							},
							{
								value: "My vehicle details",
								route: ROUTE.VEHICLE_DETAILS,
								type: "routh",
							},
							{ value: "My address", route: ROUTE.ADDRESS, type: "routh" },
							{
								value: "Password reset",
								route: ROUTE.CHANGE_PASSWORD,
								type: "routh",
							},
							{ value: "Logout", type: "log-out" },
						].map((i, index) => (
							<TouchableOpacity
								key={index}
								onPress={async () => {
									if (i?.type && i?.type === "routh") {
										navigation.navigate(i?.route as any);
									} else if (i?.type && i.type === "log-out") {
										setModalOpen(!modalOpen)
									}
								}}
							>
								<ProfileCard
									type="profile"
									index={index || 0}
									value={i?.value}
								/>
							</TouchableOpacity>
						))}
					</View>
				</ScrollContainer>
			</InnerWrapper>
			<DeleteModal
				deleteRef={deleteRef}
				closeModal={() => {
					setModalOpen(!modalOpen)
				}}
				modalOpen={modalOpen}
				navigation={navigation}
				CommonActions={CommonActions}
				type="logout"
			/>
		</Container>
	);
}

const styles = StyleSheet.create({
	title: {
		display: "flex",
		gap: 5,
	},
	user: {
		width: "100%",
		alignItems: "center",
	},
	list: {},
});