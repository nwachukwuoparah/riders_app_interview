import {
	useQueryClient,
} from "@tanstack/react-query";
import React, { createContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

export const UserContext = createContext<any>(null);

const UserProvider = ({ children }: any) => {
	const [userData, setUser_Data] = useState();
	const [active, setActive] = useState(false);
	const queryClient = useQueryClient();
	const navigation = useNavigation();


	return (
		<UserContext.Provider
			value={{ userData, setActive }}
		>
			{children}
		</UserContext.Provider>
	);
};

export default UserProvider;
