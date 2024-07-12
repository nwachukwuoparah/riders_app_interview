import {
	QueryFilters,
	useMutation,
	useQuery,
	useQueryClient,
} from "@tanstack/react-query";
import React, { createContext, useEffect, useState } from "react";
import { getProfile } from "../../helpers/query";
import { handleError } from "../../helpers";
import { updateUser } from "../../helpers/mutate";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

export const UserContext = createContext<any>(null);

const UserProvider = ({ children }: any) => {
	const [userData, setUser_Data] = useState();
	const [active, setActive] = useState(false);
	const queryClient = useQueryClient();
	const navigation = useNavigation();

	const { data, isFetching, error, refetch } = useQuery({
		queryKey: ["get-profile"],
		queryFn: getProfile,
		staleTime: 600000,
		enabled: active === true,
	});

	const { isPending, mutate } = useMutation({
		mutationFn: updateUser,
		onSuccess: async (data) => {
			queryClient.invalidateQueries("get-profile" as QueryFilters);
			Alert.alert("Success", "Status updated successfuly");
		},
		onError: (err: { msg: string; success: boolean }) => {
			handleError(err, navigation);
		},
	});

	useEffect(() => {
		if (data) {
			setUser_Data(data?.data?.data);
		}
		if (error) {
			handleError(error);
		}
	}, [data, error, active]);

	return (
		<UserContext.Provider
			value={{ userData, isFetching, refetch, setActive, isPending, mutate }}
		>
			{children}
		</UserContext.Provider>
	);
};

export default UserProvider;
