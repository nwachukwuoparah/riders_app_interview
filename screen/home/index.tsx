import React, { useCallback, useContext, useEffect, useState } from "react";
import { Container } from "../../components/container";
import Typography from "../../components/typography";
import { Alert, FlatList, StyleSheet, View } from "react-native";
import colors, { darkModeStyle } from "../../constant/theme";
import LocationIcon from "../../assets/svg/location.svg";
import PinLocationIcon from "../../assets/svg/pin_location.svg";
import CustButton from "../../components/button";
import {
	heightPercentageToDP as hp,
	widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import Show from "../../components/show";
import { font } from "../../utilities/loadFont";
import RequestCard from "../../components/requestCard";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import io from "socket.io-client";
import {
	QueryFilters,
	useMutation,
	useQueryClient,
} from "@tanstack/react-query";
import { updateUser } from "../../helpers/mutate";
import { UserContext } from "../../components/contex/userContex";
import { getCurrentLocation, handleError, truncateString } from "../../helpers";
import { useFocusEffect } from "@react-navigation/native";

const socket = io("https://afrilish-version-2-0.onrender.com", {
	reconnectionAttempts: Infinity, // Unlimited reconnection attempts
	reconnectionDelay: 2000, // Delay between reconnections in ms
});
const GOOGLE_MAPS_APIKEY = "AIzaSyDvu40j-fA-lxVkxmha9hP0ToLnUv932IA";

type LatLng = {
	latitude: number;
	longitude: number;
};

const Home = () => {
	// const [fromLatLng, setLatLng] = useState<LatLng>({
	// 	latitude: 37.78825,
	// 	longitude: -122.4324,
	// });
	// const toLatLng = {
	// 	latitude: 6.5244, // Example latitude for "to" location (e.g., Lagos, Nigeria)
	// 	longitude: 3.3792, // Example longitude for "to" location
	// };

	// useEffect(() => {
	// 	(async () => {
	// 		const location = await getCurrentLocation();
	// 		if (location) {
	// 			setLatLng({
	// 				latitude: location?.coords?.latitude,
	// 				longitude: location?.coords?.longitude,
	// 			});
	// 		}
	// 	})();
	// }, []);

	return (
		<Container sx={{ justifyContent: "space-between" }}>
			<MapView
				provider="google"
				style={styles.map}
				customMapStyle={darkModeStyle}
				initialRegion={{
					latitude: 5.485,
					longitude: 7.035,
					latitudeDelta: 0.0922,
					longitudeDelta: 0.0421,
				}}
			>
				{/* <Marker coordinate={fromLatLng}>
					<PinLocationIcon width={50} />
				</Marker>
				<Marker coordinate={toLatLng}>
					<PinLocationIcon width={50} />
				</Marker> */}
				{/* <MapViewDirections
					origin={fromLatLng}
					destination={toLatLng}
					apikey={GOOGLE_MAPS_APIKEY}
					strokeWidth={5}
					strokeColor={colors.yellow_2}
				/> */}
			</MapView>
			<SubHome />
		</Container>
	);
};

function SubHome() {
	const queryClient = useQueryClient();
	const { userData, setActive } = useContext(UserContext);
	const [location, setLocation] = useState<any>();
	const [rides, setRiders] = useState<any>([]);
	const [request_rides, set_request_riders] = useState(false);
	const [connected, setConnected] = useState(false);
	const { isPending, mutate } = useMutation({
		mutationFn: updateUser,
		onSuccess: async (data) => {
			queryClient.invalidateQueries("get-profile" as QueryFilters);
			Alert.alert("Success", "Status updated successfuly");
		},
		onError: (err: { msg: string; success: boolean }) => {
			handleError(err);
		},
	});

	useEffect(() => {
		(async () => {
			const location = await getCurrentLocation();
			if (location) {
				setLocation(location);
			}
			setActive(true);
		})();
		// const connect = null;
		// if (rides.length > 0) {
		// 	setInterval(() => {
		// 		console.log("ca;ll");
		// 	}, 5000);
		// }
		// Clean up on unfocus
		return () => {
			clearInterval;
		};
	}, []);

	useFocusEffect(
		useCallback(() => {
			const handleConnect = async () => {
				console.log("Connection successful: connection successful");
				setConnected(true);
				set_request_riders(false);
			};

			const handleAfrilishOrder = (data: any) => {
				if (data?.msg === "No Order available in your location") {
					set_request_riders(false);
					Alert.alert("Message", data?.msg);
				} else {
					setRiders(data?.data); // Uncomment and use setRiders as needed
					console.log("Received order:", data);
				}
			};

			const handleDisconnect = () => {
				if (userData?.status === "on-line" && userData?._id) {
					socket.on("connect", handleConnect);
				}
				setConnected(false);
				console.log("Socket disconnected. Attempting to reconnect...");
			};

			const handleError = (error: any) => {
				console.error("Socket error:", error);
			};

			// Ensure userData is available and user is online
			if (userData?.status === "on-line" && userData?._id) {
				console.log("running");

				// Setup event listeners
				socket.on("connect", handleConnect);
				socket.on("afrilish-order", handleAfrilishOrder);
				socket.on("error", handleError);
				socket.on("disconnect", handleDisconnect);
			}

			// Clean up on unfocus
			return () => {
				socket.off("connect", handleConnect);
				socket.off("afrilish-order", handleAfrilishOrder);
				socket.off("error", handleError);
				socket.off("disconnect", handleDisconnect);
				socket.disconnect();
			};
		}, [userData])
	);

	return (
		<>
			<View style={styles.top}>
				<View style={styles.search}>
					<LocationIcon />
					<Typography sx={{ color: colors.white }} type="text16">
						{truncateString(location?.address, 30)}
					</Typography>
				</View>
			</View>

			<View style={styles.bottom}>
				<Show>
					<Show.When isTrue={rides?.length !== 0}>
						<FlatList
							showsVerticalScrollIndicator={false}
							style={{
								// flex: 1,
								width: "100%",
							}}
							contentContainerStyle={{
								gap: 30,
								paddingTop: "2%",
								paddingBottom: "15%",
							}}
							data={rides}
							renderItem={({ item }: any) => <RequestCard item={item} />}
							keyExtractor={(item) => item?._id}
						/>
					</Show.When>
					<Show.When isTrue={userData === undefined}>
						<></>
					</Show.When>
					<Show.When isTrue={userData?.status !== "on-line"}>
						<View style={styles.switch}>
							<CustButton
								onPress={() => {
									mutate({ status: "on-line" });
								}}
								type="rounded"
								sx={{ width: wp("85%"), opacity: isPending ? 0.4 : 1 }}
							>
								<Typography type="text16" sx={{ color: colors.black }}>
									{isPending ? "Updating. . . . ." : "Go online"}
								</Typography>
							</CustButton>
							<Typography type="text12">You’re offline</Typography>
						</View>
					</Show.When>
					<Show.Else>
						<Show>
							<Show.When isTrue={!request_rides}>
								<View style={styles.switch}>
									<CustButton
										onPress={async () => {
											Alert.alert("Message", "This feature is pending");
											// if (connected) {
											// 	console.log("Fetching ride");
											// 	// Emit "join" event once after the connection is established
											// 	socket.emit("join", {
											// 		userId: userData?._id,
											// 		type: "Rider",
											// 		lng: -1.785035,
											// 		lat: 53.645792,
											// 		// lat: location?.coords?.latitude,
											// 		// lng: location?.coords?.longitude,
											// 	});
											// 	set_request_riders(!request_rides);
											// }
										}}
										type="rounded"
										sx={{
											width: wp("85%"),
											//  opacity: !connected ? 0.4 : 1
										}}
									>
										<Typography type="text16" sx={{ color: colors.black }}>
											{"Find new ride"}
										</Typography>
									</CustButton>
									<Typography type="text12">
										Connected
										{/* {connected ? "Connected" : "Connecting. . . ."} */}
									</Typography>
								</View>
							</Show.When>
							<Show.Else>
								<View style={styles.finding}>
									<Typography type="text16" fontfamily={font.DMSans_700Bold}>
										{connected
											? "Finding a nearby trip for you"
											: "Waiting for network reconnecting"}{" "}
										. . . . . . . .
									</Typography>
								</View>
							</Show.Else>
						</Show>
					</Show.Else>
				</Show>
			</View>
			{/* <InnerWrapper
				sx={{
					// flex: 1,
					justifyContent: "space-between",
					backgroundColor: "red",
				}}
			>
			
			</InnerWrapper> */}
		</>
	);
}

const styles = StyleSheet.create({
	map: {
		width: wp("100%"),
		height: hp("100%"),
		position: "absolute",
	},
	search: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: 15,
		backgroundColor: colors.black,
		paddingVertical: "4.5%",
		borderRadius: 50,
	},
	top: {
		width: "90%",
		marginTop: "5%",
		paddingBottom: "3%",
	},
	bottom: {
		width: "90%",
	},
	switch: {
		backgroundColor: colors.black,
		padding: 10,
		paddingBottom: 15,
		borderRadius: 20,
		alignItems: "center",
		gap: 5,
	},
	finding: {
		paddingVertical: 25,
		backgroundColor: colors.black,
		alignItems: "center",
		borderRadius: 60,
	},
});

export default Home;
// sellers should not request ride for pick up orders
