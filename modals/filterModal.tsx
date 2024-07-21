import React, { useEffect, useRef, useState } from "react";
import BottomModal from "./index";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Typography from "../components/typography";
import colors from "../constant/theme";
import CustButton from "../components/button";
import { InputComponent } from "../components/input";
import { Ionicons } from "@expo/vector-icons";
import { useForm } from "react-hook-form";
import {
	cacheAuthData,
	clearAuthData,
	getCachedAuthData,
} from "../utilities/storage";
import moment from "moment";

export default function FilterModal({ filterRe, closeFilter, modalOpen }: any) {
	const filterRef = useRef({
		status: false,
		date: new Date(),
	});
	const [isFilterChanged, setIsFilterChanged] = useState<any>();
	const [status, setStatus] = useState<any>();
	const [filter, setFilter] = useState<{ status: boolean; date: any }>({
		status,
		date: new Date(),
	});

	const {
		control,
		watch,
		formState: { errors },
	} = useForm<any>();

	useEffect(() => {
		(async () => {
			setFilter((pre) => {
				const date = moment(watch("date")).startOf("day");
				return {
					...pre,
					date: date,
				};
			});
		})();
	}, [watch("date")]);

	useEffect(() => {
		(async () => {
			setFilter((pre) => ({
				...pre,
				status: status,
			}));
		})();
		console.log("status", status);
	}, [status]);

	useEffect(() => {
		(async () => {
			const filterData = await getCachedAuthData("filter-data");
			console.log(filterData);
			if (filterData !== undefined) {
				setFilter(filterData);
				setStatus(filter.status);
				filterRef.current = filterData;
			}
		})();
	}, []);

	// useEffect(() => {
	// 	let result = JSON.stringify(filter) === JSON.stringify(filterRef.current);
	// 	// console.log("resuly",result); 
	// 	setIsFilterChanged(result);
	// }, [filter]);


	// useEffect(() => {
	// 	console.log("isFilterChanged", isFilterChanged);
	// }, [isFilterChanged])

	const onSubmit = async () => { 
		await cacheAuthData("filter-data", filter);
		filterRef.current = filter;
		closeFilter();
	};

	return (
		<BottomModal
			bottomSheetModalRef={filterRe}
			open={modalOpen}
			handleClose={closeFilter}
			snapMin="25%"
			snapMax="45%"
		>
			<View style={styles.top}>
				<Typography type="text16" sx={{ color: colors.white }}>
					Apply filters
				</Typography>
				<TouchableOpacity
					onPress={async () => {
						await cacheAuthData("filter-data", {
							status: false,
							date: new Date(),
						});
						filterRef.current = filter;
						closeFilter();
					}}
				>
					<Typography type="text16" sx={{ color: colors.yellow }}>
						Reset
					</Typography>
				</TouchableOpacity>
			</View>

			<View style={styles.body}>
				<View style={{ width: "90%", gap: 15 }}>
					<TouchableOpacity onPress={onSubmit}>
						<Typography type="text16" sx={{ color: colors.white }}>
							Apply filters
						</Typography>
					</TouchableOpacity>
					<View style={{ flexDirection: "row", gap: 20 }}>
						{[
							{ label: "Scheduled orders", status: true },
							{ label: "Normal orders", status: false },
						].map((i, index) => (
							<TouchableOpacity
								key={index}
								onPress={() => {
									setStatus(i?.status);
									console.log(i?.status);
								}}
							>
								<View
									style={{
										...styles.order,
										borderColor:
											filter?.status === i?.status
												? colors.yellow
												: colors.grey_a,
									}}
								>
									<Typography type="text16" sx={{ color: colors.white }}>
										{i?.label}
									</Typography>
									{filter?.status === i?.status && (
										<Ionicons
											name="close-sharp"
											size={24}
											color={colors.white}
										/>
									)}
								</View>
							</TouchableOpacity>
						))}
					</View>
				</View>
				<View style={{ width: "90%", gap: 15 }}>
					<InputComponent
						label="Filter by date"
						type="date"
						mode="date"
						control={control}
						name="date"
						defaultValue={filter.date}
					/>
					<CustButton
						onPress={onSubmit}
						type="rounded"
						sx={{ width: "100%"}}
					>
						<Typography type="text16" sx={{ color: colors.black }}>
							Apply filters
						</Typography>
					</CustButton>
				</View>
			</View>
		</BottomModal>
	);
}

const styles = StyleSheet.create({
	top: {
		width: "90%",
		flexDirection: "row",
		alignItems: "center",
		alignSelf: "center",
		justifyContent: "space-between",
		backgroundColor: colors.grey_a,
		paddingBottom: 15,
	},
	body: {
		width: "100%",
		backgroundColor: colors.black_1,
		flex: 2,
		alignItems: "center",
		justifyContent: "center",
		gap: 15,
	},
	order: {
		borderWidth: 1,
		padding: 10,
		borderRadius: 30,
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
		backgroundColor: colors.grey_a,
	},
});
