import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Theme, ThemeContext } from "~/src/contexts/ThemeContext";
import { Layout } from "~/src/Layout";
import { InvoiceList } from "~/src/components/InvoiceList";
import { InvoiceDetails } from "~/src/components/InvoiceDetails";
import { NotFound } from "~/src/components/NotFound";
import { Login } from "~/src/components/Login";
import { Signup } from "~/src/components/Signup";

export function App() {
	const [theme, setTheme] = React.useState<Theme>("light");

	return (
		<ThemeContext.Provider
			value = {[theme, setTheme]}
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
							path = "not-found"
							element = {<NotFound />}
						/>
						<Route 
							path = ":invoiceId"
							element = {<InvoiceDetails />}
						/>
					</Routes>
				</Layout>
			</BrowserRouter>
		</ThemeContext.Provider>
	);
}