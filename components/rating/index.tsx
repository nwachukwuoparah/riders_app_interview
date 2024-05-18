import React, { useEffect, useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { View } from "react-native";
import colors from "../../constant/theme";
import Show from "../show";

const Rating = ({
	maxStars = 5,
	defaultRating,
}: {
	maxStars?: number;
	defaultRating: number;
}) => {
	const [rating, setRating] = useState<number>(0);

	useEffect(() => {
		if (defaultRating > -1) {
			setRating(defaultRating);
		}
	}, [defaultRating]);

	return (
		<View
			style={{
				flexDirection: "row",
				justifyContent: "space-between",
			}}
		>
			{[...Array(maxStars)].map((_, index) => {
				const starValue = index + 1;
				return (
					<Show key={index}>
						<Show.When isTrue={starValue <= rating}>
							<Entypo
								name="star"
								size={25}
								color={starValue <= rating ? colors.yellow : colors.grey}
							/>
						</Show.When>
						<Show.Else>
							<Entypo name="star-outlined" size={25} color={colors.yellow} />
						</Show.Else>
					</Show>
				);
			})}
		</View>
	);
};

export default Rating;