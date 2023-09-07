import { useThemeContext } from "~/src/custom-hooks/useThemeContext";
import { helpers } from "~/src/helpers";
import { MainHeadingWithLogo } from "~/src/components/MainHeadingWithLogo";
import { Moon } from "~/src/components/icons/Moon";
import { Sun } from "~/src/components/icons/Sun";
import { Button } from "~/src/components/Header/Button";

type Props = {
    applyMediaQueryPositionStyles?: boolean
};

export function Header(props: Props) {
    const { applyMediaQueryPositionStyles = true } = props;
    const [theme, setTheme] = useThemeContext();

    const isLightTheme = theme === "light";
    const nextTheme = isLightTheme ? "dark" : "light";
    const ThemeBtnIcon = isLightTheme ? Moon : Sun;

    // overflow-hidden - To contain the direct div element within the border radius
    return (
        <header
            className = {`
                overflow-hidden 
                flex laptopAndUp:flex-col justify-between flex-shrink-0 
                laptopAndUp:rounded-r-[20px] 
                laptopAndUp:h-full
                ${isLightTheme ? "bg-carbon-blue" : "bg-fig-ds-03"}
                ${helpers.passIfTrueElseEmpty(
                    applyMediaQueryPositionStyles,
                    "laptopAndUp:absolute laptopAndUp:top-0 laptopAndUp:left-0" 
                )}
            `}
        >
            <MainHeadingWithLogo />
            <div
                className = {`
                    flex laptopAndUp:flex-col
                    gap-[4px] mr-[4px] laptopAndUp:mr-0 laptopAndUp:mb-[4px]
                `}
            >
                <Button
                    onClick = {() => setTheme(nextTheme)}
                    visuallyHiddenText = {`change application's theme to ${nextTheme}`}
                >
                    <ThemeBtnIcon 
                        aria-hidden
                        className = "w-[20px] h-[20px] m-auto"
                    />
                </Button>
                <div
                    className = "border border-independence"
                ></div>
                <Button
                    visuallyHiddenText = "logout"
                >
                    <div
                        className = {`
                            w-[32px] laptopAndUp:w-[40px] 
                            h-[32px] laptopAndUp:h-[40px]
                            rounded-full 
                            m-auto
                            bg-fig-ds-01
                            border border-fig-ds-01
                        `}
                    ></div>
                </Button>
            </div>
        </header>
    );
}
