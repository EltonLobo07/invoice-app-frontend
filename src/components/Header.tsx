import { useThemeContext } from "~/src/custom-hooks/useThemeContext";
import { helpers } from "~/src/helpers";
import { MainHeadingWithLogo } from "~/src/components/MainHeadingWithLogo";
import { VisuallyHidden } from "~/src/components/VisuallyHidden";
import { Moon } from "~/src/components/icons/Moon";
import { Sun } from "~/src/components/icons/Sun";

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
                <button
                    onClick = {() => setTheme(nextTheme)}
                    className = "px-[20px] tabAndUp:px-[28px] laptopAndUp:px-0 laptopAndUp:py-[20px] relative"
                >
                    <VisuallyHidden
                        useSpanTag
                    >
                        {`change application's theme to ${nextTheme}`}
                    </VisuallyHidden>
                    <ThemeBtnIcon 
                        aria-hidden
                        className = "w-[20px] h-[20px] m-auto"
                    />
                </button>
                <div
                    className = "border-[0.5px] border-independence"
                ></div>
                <button
                    className = "px-[20px] tabAndUp:px-[28px] laptopAndUp:px-0 laptopAndUp:py-[20px] relative"
                >
                    <VisuallyHidden
                        useSpanTag
                    >
                        logout
                    </VisuallyHidden>
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
                </button>
            </div>
        </header>
    );
}
