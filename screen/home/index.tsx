import React, {
	useCallback,
	useContext,
	useEffect,
	useState,
	useMemo,
	useRef,
} from "react";
import {
	PermissionsAndroid,
	Platform,
	StyleSheet,
	Alert,
	FlatList,
	View,
} from "react-native";
import { Container } from "../../components/container";
import Typography from "../../components/typography";
import colors, { darkModeStyle } from "../../constant/theme";
import LocationIcon from "../../assets/svg/location.svg";
import CustButton from "../../components/button";
import {
	heightPercentageToDP as hp,
	widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import Show from "../../components/show";
import { font } from "../../utilities/loadFont";
import RequestCard from "../../components/requestCard";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import Geolocation from "react-native-geolocation-service";
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
import { clearAuthData, getCachedAuthData } from "../../utilities/storage";
// import { EXPO_PUBLIC_API } from "@env";

let EXPO_PUBLIC_API =
	"https://aftilish-development-server-e7f09cb1463d.herokuapp.com";

const socket = io(EXPO_PUBLIC_API, {
	reconnectionAttempts: Infinity,
	reconnectionDelay: 2000,
});

const GOOGLE_MAPS_APIKEY = "AIzaSyDvu40j-fA-lxVkxmha9hP0ToLnUv932IA";

const Home = ({ navigation }: any) => {
	const [destination, setDestination] = useState<any>();
	const mapRef = useRef<MapView>(null);
	const watchId = useRef<number | null>(null);
	const [location, setLocation] = useState<any>();

	const [fromLatLng, setFromLatLng] = useState({
		latitude: 5.475,
		longitude: 7.025,
	});

	const [toLatLng, setToLatLng] = useState({
		latitude: 5.485,
		longitude: 7.035,
	});

	useFocusEffect(
		useCallback(() => {
			const startWatching = async () => {

				const requestLocationPermission = () => {
					let authorizationLevel: any = 'always'; // Default to 'always' for Android

					if (Platform.OS === 'ios') {
						authorizationLevel = 'whenInUse'; // Use 'whenInUse' for iOS
					}

					Geolocation.requestAuthorization(authorizationLevel);
				};

				// Call this function when you need to request location permission
				requestLocationPermission();
				watchId.current = Geolocation.watchPosition(
					async (position) => {
						const { latitude, longitude } = position.coords;
						const location = await getCurrentLocation(latitude, longitude);
						setFromLatLng({ latitude, longitude });
						if (location) {
							setLocation(location);
						}
					},
					(error) => {
						console.error("Error", error);
					},
					{
						enableHighAccuracy: true,
						distanceFilter: 0,
						interval: 1000,
						fastestInterval: 500,
					}
				);
			};

			startWatching();

			return () => {
				if (watchId.current !== null) {
					Geolocation.clearWatch(watchId.current);
				}
			};
		}, [])
	);

	// useFocusEffect(
	// 	useCallback(() => {
	// 		(() => {
	// 			watchId.current = Geolocation.watchPosition(
	// 				async (position) => {
	// 					const { latitude, longitude } = position.coords;
	// 					const location = await getCurrentLocation(latitude, longitude);
	// 					setFromLatLng({ latitude, longitude });
	// 					if (location) {
	// 						setLocation(location);
	// 					}
	// 				},
	// 				(error) => {
	// 					console.error("error", error);
	// 				},
	// 				{
	// 					enableHighAccuracy: true,
	// 					distanceFilter: 0,
	// 					interval: 1000,
	// 					fastestInterval: 500,
	// 				}
	// 			);
	// 		})();

	// 		return () => {
	// 			if (watchId.current !== null) {
	// 				Geolocation.clearWatch(watchId.current);
	// 			}
	// 		};
	// 		// (async () => {
	// 		// 	try {
	// 		// 		const destination = await getCachedAuthData("destination");
	// 		// 		setDestination(destination);
	// 		// 	} catch (error) {
	// 		// 		console.error("Error fetching cached data:", error);
	// 		// 	}
	// 		// })();
	// 	}, [])
	// );

	const initialRegion = useMemo(
		() => ({
			latitude: 5.485,
			longitude: 7.035,
			latitudeDelta: 0.0922,
			longitudeDelta: 0.0421,
		}),
		[]
	);

	return (
		<Container sx={{ justifyContent: "space-between" }}>
			{/* <MapView 
				ref={mapRef}
				provider={PROVIDER_GOOGLE}
				style={styles.map}
				customMapStyle={darkModeStyle}
				initialRegion={initialRegion}
			>
				{fromLatLng && toLatLng && (
					<>
						<Marker coordinate={fromLatLng} />
						<Marker coordinate={toLatLng} />
						<MapViewDirections
							// origin={destination?.from}
							// destination={destination?.to}
							origin={fromLatLng}
							destination={toLatLng}
							apikey={GOOGLE_MAPS_APIKEY}
							strokeWidth={5}
							strokeColor={colors.yellow_2}
							onStart={(params) => {
								console.log(
									`Started routing between "${params.origin}" and "${params.destination}"`
								);
							}}
							onReady={(result) => {
								console.log(`Distance: ${result.distance} km`);
								console.log(`Duration: ${result.duration} min.`);
							}}
							onError={(errorMessage) => {
								console.error("GOT AN ERROR", errorMessage);
							}} 
						/>
					</>
				)} 
			</MapView> */}
			<SubHome
				navigation={navigation}
				destination={destination}
				location={location}
			/>
		</Container>
	);
};

const SubHome = React.memo(({ navigation, destination, location }: any) => {
	const queryClient = useQueryClient();
	const { userData, setActive } = useContext(UserContext);
	const [rides, setRiders] = useState<any>([]);
	const [request_rides, set_request_riders] = useState(false);
	const [connected, setConnected] = useState(false);

	const { isPending, mutate } = useMutation({
		mutationFn: updateUser,
		onSuccess: async (data) => {
			queryClient.invalidateQueries("get-profile" as QueryFilters);
			Alert.alert("Success", "Status updated successfully");
		},
		onError: (err: { msg: string; success: boolean }) => {
			handleError(err);
		},
	});

	useEffect(() => {
		(async () => {
			setActive(true);
		})();
		return () => { };
	}, [location]);

	useFocusEffect(
		useCallback(() => {
			let intervalId: any = null;
			const handleConnect = () => {
				console.log("Connection successful");
				setConnected(true);
				set_request_riders(false);
			};

			const handleAfrilishOrder = (data: any) => {
				if (data?.msg === "No order available in your location") {
					set_request_riders(false);
					Alert.alert("Message", data?.msg);
				} else {
					setRiders(data?.data);
					console.log("Received order:", data);
				}
			};

			const handleDisconnect = () => {
				setConnected(false);
				handleConnect();
				console.log("Socket disconnected. Attempting to reconnect...");
			};
 
			const handleError = (error: any) => {
				console.error("Socket error:", error);
			};

			if (rides?.length > 0 && connected) {
				intervalId = setInterval(() => {
					console.log("call");
					socket.emit("join", {
						userId: userData?._id,
						type: "Rider",
						lng: -1.785035,
						lat: 53.645792,
					});
				}, 40000);

				setTimeout(() => {
					clearInterval(intervalId);
					console.log("Interval cleared");
				}, 60000);
			}

			if (userData?.status === "on-line" && userData?._id) {
				socket.on("connect", handleConnect);
				socket.on("rider-message", handleAfrilishOrder);
				socket.on("error", handleError);
				socket.on("disconnect", handleDisconnect);
			}
			return () => {
				socket.off("connect", handleConnect);
				socket.off("rider-message", handleAfrilishOrder);
				socket.off("error", handleError);
				socket.off("disconnect", handleDisconnect);
				socket.disconnect();
				if (intervalId) {
					clearInterval(intervalId);
					console.log("Interval cleared on cleanup");
				}
			};
		}, [userData, rides, connected])
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
								width: "100%",
							}}
							contentContainerStyle={{
								gap: 30,
								paddingTop: "2%",
								paddingBottom: 150,
							}}
							data={rides}
							renderItem={({ item }: any) => (
								<RequestCard
									navigate={() => {
										navigation.navigate("Orders");
										setRiders([]);
									}}
									item={item}
								/>
							)}
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
											if (connected && userData?._id) {
												console.log("Fetching ride");
												socket.emit("rider", {
													userId: userData?._id,
													lng: -1.785035,
													lat: 53.645792,
												});
												set_request_riders(!request_rides);
											}
										}}
										type="rounded"
										sx={{
											width: wp("85%"),
											opacity: !connected ? 0.4 : 1,
										}}
									>
										<Typography type="text16" sx={{ color: colors.black }}>
											{"Find new ride"}
										</Typography>
									</CustButton>
									<Typography type="text12">
										{connected ? "Connected" : "Connecting. . . ."}
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
		</>
	);
});

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
	},
	bottom: {
		width: "90%",
		marginBottom: "10%",
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
