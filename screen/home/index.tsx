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
import MapView, { PROVIDER_GOOGLE, Marker, Region } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import Geolocation from "react-native-geolocation-service";
import { getCurrentLocation, truncateString } from "../../helpers";
import { RouteProp, useFocusEffect } from "@react-navigation/native";
import { getCachedAuthData } from "../../utilities/storage";
import { ROUTE } from "../../constant/route";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types";


type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList>;
type HomeScreenRouteProp = RouteProp<RootStackParamList>;

type Props = {
	navigation: HomeScreenNavigationProp;
	route: HomeScreenRouteProp;
};

const GOOGLE_MAPS_APIKEY = "AIzaSyDvu40j-fA-lxVkxmha9hP0ToLnUv932IA";

// const initialRegion = {
// 	latitude: 5.485,
// 	longitude: 7.035,
// 	latitudeDelta: 0.0922,
// 	longitudeDelta: 0.0421,
// };

const initialRegion = {
	latitude: 37.785834,
	longitude: -122.406417,
	latitudeDelta: 0.01, // Adjusted for a closer zoom level
	longitudeDelta: 0.01, // Adjusted for a closer zoom level
  };

const Home = ({ navigation }: Props) => {
	const [destination, setDestination] = useState<{ latitude: number, longitude: number }>();
	const mapRef = useRef<MapView>(null);
	const watchId = useRef<number | null>(null);
	const [location, setLocation] = useState<any>();
	const [fromLatLng, setFromLatLng] = useState<any>(null);
	const [region, setRegion] = useState<Region>(initialRegion);

	const handleRegionChange = (newRegion: Region) => {
		setRegion(newRegion);
		console.log(newRegion);
		// Additional logic, e.g., fetching data based on the new region
	};


	useFocusEffect(
		useCallback(() => {
			(async () => {
				const destination = await getCachedAuthData("destination")
				setDestination(destination?.to);
			})();

			const startWatching = async () => {
				const requestLocationPermission = () => new Promise(async (resolve, reject) => {
					try {
						if (Platform.OS === 'ios') {
							const permission = await Geolocation.requestAuthorization('whenInUse');
							if (permission === "granted") {
								return resolve("granted");
							}
							reject("Permission to access loction not granted");
						}
					} catch (error) {
						// console.log("Ask location error===>", error);
						return reject(error);
					}
					return PermissionsAndroid.request(
						PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
					).then((granted) => {
						if (granted === PermissionsAndroid.RESULTS.GRANTED) {
							resolve(granted);
						}
						reject("Permission to access loction not granted");
					}).catch((error) => {
						// console.log("Ask location error===>", error);
						return reject(error);
					})
				})

				// Call this function when you need to request location permission
				requestLocationPermission();

				watchId.current = Geolocation.watchPosition(
					async (position) => {
						const { latitude, longitude } = position.coords;
						const location = await getCurrentLocation(latitude, longitude);

						if (location) {
							setFromLatLng({ latitude, longitude });
							setLocation({ ...location, latitude, longitude });
							console.log("call",{ latitude, longitude }); 
						}
					},
					(error) => {
						console.error("Error", error);
					},
					{
						enableHighAccuracy: true,
						distanceFilter: 5,
						interval: 1000,
						fastestInterval: 1000,
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

	return (
		<Container sx={{ justifyContent: "space-between" }}>
			<MapView
				ref={mapRef}
				provider={PROVIDER_GOOGLE}
				style={styles.map}
				customMapStyle={darkModeStyle}
				initialRegion={region}
				showsUserLocation={true}  // This prop shows the user's current location on the map
				followsUserLocation={true} // This prop keeps the map centered on the user's current location
				onRegionChange={handleRegionChange}
			>
				{destination && fromLatLng && (
					<>
						{/* <Marker coordinate={fromLatLng} >
							<LocationIcon />
						</Marker> */}
						<Marker coordinate={destination} >
							<LocationIcon />
						</Marker>
						<MapViewDirections
							origin={fromLatLng}
							destination={destination}
							apikey={GOOGLE_MAPS_APIKEY}
							strokeWidth={10}
							strokeColor={colors.yellow_2}
							optimizeWaypoints={true}
							onStart={(params) => {
								// console.log(
								// 	`Started routing between "${params.origin}" and "${params.destination}"`
								// );
							}}
							onReady={(result) => {
								mapRef.current?.fitToCoordinates(result.coordinates, {
									edgePadding: {
										right: 30,
										left: 30,
										bottom: 300,
										top: 100
									}
								})
								// console.log(`Distance: ${result.distance} km`);
								// console.log(`Duration: ${result.duration} min.`);
							}}
							onError={(errorMessage) => {
								// console.error("GOT AN ERROR", errorMessage);
							}}
						/>
					</>
				)}
			</MapView>
			<SubHome
				navigation={navigation}
				// destination={destination}
				location={location}
				destination={destination}
			/>
		</Container>
	);
};

const SubHome = React.memo(({ navigation, destination, location }: any) => {
	const [rides, setRiders] = useState<any>([]);
	const [request_rides, set_request_riders] = useState(false);



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
							data={[{ id: 1 }]}
							renderItem={({ item }: any) => (
								<RequestCard
									navigate={() => {
										navigation.navigate(ROUTE.ORDERS);
										setRiders([]);
									}}
									item={item}
								/>
							)}
						/>
					</Show.When>

					<Show.When isTrue={destination !== undefined}>
						<></>
					</Show.When>
					<Show.Else>
						<Show>
							<Show.When isTrue={!request_rides}>
								<View style={styles.switch}>
									<CustButton
										onPress={async () => {
											setRiders({})
										}}
										type="rounded"
										sx={{
											width: wp("85%"),
											opacity: 1,
										}}
									>
										<Typography type="text16" sx={{ color: colors.black }}>
											Find new ride
										</Typography>
									</CustButton>
									<Typography type="text12">
										Connected
									</Typography>
								</View>
							</Show.When>

							<Show.Else>
								<View style={styles.finding}>
									<Typography type="text16" fontfamily={font.DMSans_700Bold}>
										Finding a nearby trip for you........
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
