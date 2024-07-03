import React, { useEffect, useRef, useState } from "react";
import {
	Alert,
	Platform,
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
import ProfileCard from "../../components/profile";
import {
	QueryFilters,
	useMutation,
	useQuery,
	useQueryClient,
} from "@tanstack/react-query";
import { workingHours } from "../../helpers/mutate";
import { periodDataType, workingShiftType } from "../../types";
import LoadingComponent from "../../components/loading";
import { getWorkHours } from "../../helpers/query";
import { handleError } from "../../helpers";

const initialData = {
	morning: {
		monday: false,
		tuesday: false,
		wednesday: false,
		thursday: false,
		friday: false,
		saturday: false,
		sunday: false,
	},
	evening: {
		monday: false,
		tuesday: false,
		wednesday: false,
		thursday: false,
		friday: false,
		saturday: false,
		sunday: false,
	},
};

export default function WorkingHours({ navigation }: any) {
	const queryClient = useQueryClient();
	const [period, setPeriod] = useState<keyof workingShiftType>("morning");
	const [isDataChanged, setIsDataChanged] = useState(false);
	const dataRef = useRef<workingShiftType>(initialData);
	const [data, setData] = useState<workingShiftType>(initialData);

	const { isPending, mutate } = useMutation({
		mutationFn: workingHours,
		onSuccess: async (data) => {
			console.log(data?.data?.msg);
			Alert.alert("Message", data?.data?.msg);
			queryClient.invalidateQueries("get-working-hours" as QueryFilters);
		},
		onError: (err) => {
			handleError(error, navigation);
		},
	});

	const {
		data: working_hours,
		isFetching,
		error,
	} = useQuery({
		queryKey: ["get-working-hours"],
		queryFn: getWorkHours,
		staleTime: 600000,
	});

	// Handel get request and uptade ui
	useEffect(() => {
		if (working_hours) {
			const { morning, evening } = working_hours?.data.data;
			dataRef.current = { morning, evening };
			setData({ morning, evening });
		}
		if (error) {
			handleError(error, navigation);
		}
	}, [working_hours, error]);

	// watch for a change and compares both inital and final object
	useEffect(() => {
		(() => {
			let result = JSON.stringify(data) === JSON.stringify(dataRef.current);
			setIsDataChanged(!result);
		})();
	}, [data]);

	//toggle to update working hours
	const toggleDay = (day: keyof periodDataType) => {
		setData((prevData) => ({
			...prevData,
			[period]: {
				...prevData[period],
				[day]: !prevData[period][day],
			},
		}));
	};

	const onSubmit = () => {
		if (isDataChanged) {
			mutate(data);
		}
	};

	return (
		<Container>
			<LoadingComponent display={isPending || isFetching} />
			<InnerWrapper sx={{ gap: 20, flex: 7 }}>
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "space-between",
					}}
				>
					<View style={styles.title}>
						<CustButton
							type="back"
							color={colors.white}
							onPress={() => navigation.goBack()}
						/>
						<Typography type="text24">Set working hours</Typography>
					</View>
				</View>
				<View style={styles.body}>
					<TouchableOpacity
						onPress={() => {
							setPeriod("morning");
						}}
						style={{
							...styles.button,
							borderBottomWidth: 1,
							backgroundColor:
								period === "morning" ? colors.grey_a : colors.black_1,
							borderColor: period === "morning" ? colors.yellow : colors.grey_b,
						}}
					>
						<Typography type="text16">Morning shift</Typography>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => {
							setPeriod("evening");
						}}
						style={{
							...styles.button,
							borderBottomWidth: 1,
							backgroundColor:
								period === "evening" ? colors.grey_a : colors.black_1,
							borderColor: period === "evening" ? colors.yellow : colors.grey_b,
						}}
					>
						<Typography type="text16">Evening shift</Typography>
					</TouchableOpacity>
				</View>
				<Typography type="text16" sx={{ color: colors.white }}>
					Working hours are between 08:00am - 05:00pm
				</Typography>
				<ScrollContainer innerStyles={{ gap: 5 }}>
					{Object?.keys(data?.[period])?.map((day, index) => (
						<TouchableOpacity
							key={index}
							onPress={() => {
								toggleDay(day);
							}}
						>
							<ProfileCard
								type="workHours"
								label={day}
								index={index}
								check={data?.[period]?.[day]}
								onPress={() => {
									navigation.navigate("login");
								}}
							/>
						</TouchableOpacity>
					))}
				</ScrollContainer>
			</InnerWrapper>
			<View style={styles.buttonCont}>
				<CustButton
					type="rounded"
					sx={{ opacity: isDataChanged ? 1 : 0.4 }}
					onPress={onSubmit}
				>
					<Typography type="text16" sx={{ color: colors.black }}>
						Save working hours
					</Typography>
				</CustButton>
			</View>
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
		paddingVertical: 15,
		paddingHorizontal: 10,
		borderBottomWidth: 0.5,
		borderTopRightRadius: 10,
		borderTopLeftRadius: 10,
		alignSelf: "flex-start",
		alignItems: "center",
		justifyContent: "center",
	},
	buttonCont: {
		width: "100%",
		flex:1,
		alignItems: "center",
		backgroundColor: colors.black_1,
		paddingTop: 15,
		...Platform.select({
			ios: {
				shadowOpacity: 0.1,
				shadowRadius: 0.5,
				shadowColor: "#6C6C6C",
				shadowOffset: { height: -2, width: 0 },
			},
			android: {
				elevation: 1,
			},
		}),
	},
});
