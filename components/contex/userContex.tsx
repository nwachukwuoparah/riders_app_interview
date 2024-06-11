import { useQuery } from "@tanstack/react-query";
import React, { createContext, useEffect, useState } from "react";
import { getProfile } from "../../helpers/query";
import { getCachedAuthData } from "../../utilities/storage";
import { handleError } from "../../helpers";

export const UserContext = createContext<any>(null);

const UserProvider = ({ children }: any) => {
	const [userData, setUser_Data] = useState();
	const [active, setActive] = useState(false);

	const { data, isFetching, error } = useQuery({
		queryKey: ["get-profile"],
		queryFn: getProfile,
		staleTime: 600000,
		enabled: active===true,
	});

	useEffect(() => {
		if (data) {
			setUser_Data(data?.data?.data);
		}
		if (error) {
			handleError(error);
		}

		console.log("active", active);
	}, [data, error, active]);

	return (
		<UserContext.Provider value={{ userData, isFetching, setActive }}>
			{children}
		</UserContext.Provider>
	);
};

export default UserProvider;
