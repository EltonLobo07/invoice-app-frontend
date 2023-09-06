import React from "react";
import { Theme, ThemeContext } from "~/src/contexts/ThemeContext";

export function App() {
	const [theme, setTheme] = React.useState<Theme>("light");

	return (
		<ThemeContext.Provider
			value = {[theme, setTheme]}
		>
			Hello world
		</ThemeContext.Provider>
	);
}