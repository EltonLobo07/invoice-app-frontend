import React from "react";
import { Theme, ThemeContext } from "~/src/contexts/ThemeContext";
import { Layout } from "./Layout";

export function App() {
	const [theme, setTheme] = React.useState<Theme>("light");

	return (
		<ThemeContext.Provider
			value = {[theme, setTheme]}
		>
			<Layout>
				Hello world
			</Layout>
		</ThemeContext.Provider>
	);
}