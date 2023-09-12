import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Theme, ThemeContext } from "~/src/contexts/ThemeContext";
import { Layout } from "~/src/Layout";
import { InvoiceList } from "~/src/components/InvoiceList";
import { InvoiceDetails } from "~/src/components/InvoiceDetails";
import { Login } from "~/src/components/auth/Login";
import { Signup } from "~/src/components/auth/Signup";
import { 
	Currency, 
	CurrencyContext 
} from "~/src/contexts/CurrencyContext";
import { 
	UserToken, 
	UserTokenContext, 
	assertUserToken 
} from "~/src/contexts/UserTokenContext";
import { useLocalStorageState } from "~/src/custom-hooks/useLocalStorageState";

const USER_TOKEN_LS_KEY = "userToken";

export function App() {
	const [theme, setTheme] = useLocalStorageState({
		initialState: () => window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light",
		lsKey: "app-theme",
		isState: (possibleTheme): possibleTheme is Theme => possibleTheme === "dark" || possibleTheme === "light"
	});
	// Maybe I'll add the ability to switch currency
	const [currency] = React.useState<Currency>("£");
	const [userToken, setUserToken] = React.useState<UserToken | null>(() => {
		const userTokenInLs = window.localStorage.getItem(USER_TOKEN_LS_KEY);
		if (userTokenInLs === null) {
			return null;
		}
		let res: UserToken | null;
		try {
			const parsedUserToken = JSON.parse(userTokenInLs);
			assertUserToken(parsedUserToken);
			res = parsedUserToken;
		}
		catch(error) {
			console.log(error);
			res = null;
		}
		return res;
	});

	React.useEffect(() => {
		window.localStorage.setItem(USER_TOKEN_LS_KEY, JSON.stringify(userToken));
	}, [userToken]);

	return (
		<ThemeContext.Provider
			value = {[theme, setTheme]}
		>
			<CurrencyContext.Provider
				value = {currency}
			>
				<UserTokenContext.Provider
					value = {[userToken, setUserToken]}
				>
					<BrowserRouter>
						<Layout>
							<Routes>
								<Route 
									path = "/" 
									element = {<InvoiceList />} 
								/>
								<Route 
									path = "login"
									element = {<Login />}
								/>
								<Route 
									path = "signup"
									element = {<Signup />}
								/>
								<Route 
									path = ":invoiceId"
									element = {<InvoiceDetails />}
								/>
							</Routes>
						</Layout>
					</BrowserRouter>
				</UserTokenContext.Provider>
			</CurrencyContext.Provider>
		</ThemeContext.Provider>
	);
}