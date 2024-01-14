import React, { createContext, useEffect, useState } from "react";
import { cache } from "swr";
import api from "apis/api";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [isLoading, setLoading] = useState(true);
	const [isLoggingIn, setLoggingIn] = useState(false);
	const [loginError, setLoginError] = useState(null);
	// const [isVerified, setVerified] = useState(false);
	// const [hasVerified, setHasVerified] = useState(false);

	// const { data: userDetails, error: fetchDetailsError } = useSWR(user && `/users/${user.id}`);
	// const isFetchingDetails = user && !userDetails && !fetchDetailsError;
	// const { emailVerified, mobileVerified, idVerificationStatus } = userDetails || {};

	// useEffect(() => {
	// 	const isVerified = emailVerified && mobileVerified;
	// 	setVerified(isVerified);
	// }, [emailVerified, mobileVerified, idVerificationStatus, setVerified]);

	useEffect(() => {
		cache.clear();
		const storedUser = window.localStorage.getItem("user");
		if (storedUser) {
			try {
				const initialUser = JSON.parse(storedUser);
				setUser(initialUser);
			} catch (error) {
				console.error("Error parsing user data from localStorage:", error);
				// Handle the error as appropriate for your application
			}
		}
		setLoading(false);
	}, []);

	const login = async (credentials) => {
		try {
			cache.clear();
			setLoggingIn(true);
			const { data: user } = await api.open.post("/users/authenticate", credentials);

			window.localStorage.setItem("user", JSON.stringify(user));
			setUser(user);
			setLoggingIn(false);
		} catch (e) {
			setLoggingIn(false);
			setLoginError(e);
			throw e;
		}
	};

	const logout = () => {
		window.localStorage.removeItem("user");
		cache.clear();
		setUser(null);
	};

	return (
		<AuthContext.Provider
			value={{
				user: user && {
					...user
				},
				isLoggingIn: isLoggingIn,
				isLoading,
				login,
				logout,
				loginError,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
