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
	const [isFilterChanged, setIsFilterChanged] = useState(false);
	const [status, setStatus] = useState<boolean>(false);
	const [filter, setFilter] = useState<{ status: boolean; date: any }>({
		status: false,
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
			const filterData = await getCachedAuthData("filter-data");
			if (filterData !== undefined) {
				setFilter(filterData);
				setStatus(filter.status);
				filterRef.current = filterData;
			}
		})();
	}, []);

	useEffect(() => {
		(async () => {
			setFilter((pre) => ({
				...pre,
				status: status,
			}));
		})();
	}, [status]);

	const onSubmit = async () => {
		await cacheAuthData("filter-data", filter);
		filterRef.current = filter;
		closeFilter();
	};

	useEffect(() => {
		(() => {
			let result = JSON.stringify(filter) === JSON.stringify(filterRef.current);
			setIsFilterChanged(!result);
		})();
	}, [filter]);

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
					onPress={() => {
						clearAuthData("filter-data");
						setFilter({
							status: false,
							date: new Date(),
						});
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
						sx={{ width: "100%", opacity: isFilterChanged ? 1 : 0.4 }}
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
