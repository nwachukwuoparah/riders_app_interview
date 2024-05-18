import React, { createContext, useState } from "react";

export const UserContext = createContext<any>(null);

const UserProvider = ({ children }: any) => {
	const [ userData, setUser_Data ] = useState();

	return (
		<UserContext.Provider value={{ userData, setUser_Data }}>
			{children}
		</UserContext.Provider>
	);
};

export default UserProvider;
