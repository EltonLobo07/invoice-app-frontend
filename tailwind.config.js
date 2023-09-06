const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./index.html",
		"./src/**/*.{ts,tsx}"
	],
	theme: {
		extend: {
			fontFamily: {
				sans: ["League Spartan", ...defaultTheme.fontFamily.sans]
			},
			colors: {
				"fig-ds-01": "#7C5DFA",
				"fig-ds-02": "#9277FF",
				"fig-ds-03": "#1E2139",
				"fig-ds-04": "#252945",
				"fig-ds-05": "#DFE3FA",
				"fig-ds-06": "#888EB0",
				"fig-ds-07": "#7E88C3",
				"fig-ds-08": "#0C0E16",
				"fig-ds-09": "#EC5757",
				"fig-ds-10": "#FF9797",
				"fig-ds-11": "#F8F8FB",
				"fig-ds-12": "#141625",
				"carbon-blue": "#373B53",
				"independence": "#494E6E",
				"princeton-orange": "#FF8F00",
				"dark-shamrock": "#33D69F",
				"sky-snail-blue": "#858BB2",
				"wash-me": "#F9FAFE",
				"stoic-white": "#DFE3FA",
				"stone-wash": "#777F98"
			}
		},
	},
	plugins: [],
}

