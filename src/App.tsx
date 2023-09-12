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

const USER_TOKEN_LS_KEY = "userToken";

export function App() {
	const [theme, setTheme] = React.useState<Theme>("light");
	// Maybe I'll add the ability to switch currency
	const [currency] = React.useState<Currency>("£");
	const [userToken, setUserToken] = React.useState<UserToken | undefined | null>();

	React.useEffect(() => {
		const userTokenInLs = window.localStorage.getItem(USER_TOKEN_LS_KEY);
		if (userTokenInLs === null) {
			setUserToken(null);
		} else {
			try {
				console.log("userTokenInLs:", userTokenInLs);
				const parsedUserToken = JSON.parse(userTokenInLs);
				assertUserToken(parsedUserToken);
				setTimeout(() => {
					setUserToken(parsedUserToken);
				}, 5000);
			}
			catch(error) {
				console.log(error);
				setUserToken(null);
			}
		}
	}, []);

	React.useEffect(() => {
		if (userToken !== undefined) {
			window.localStorage.setItem(USER_TOKEN_LS_KEY, JSON.stringify(userToken));
		}
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