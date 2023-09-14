import { useThemeContext } from "~/src/custom-hooks/useThemeContext";
import { helpers } from "~/src/helpers";
import { MainHeadingWithLogo } from "~/src/components/MainHeadingWithLogo";
import { VisuallyHidden } from "~/src/components/VisuallyHidden";
import { Moon } from "~/src/components/icons/Moon";
import { Sun } from "~/src/components/icons/Sun";
import { twMerge } from "tailwind-merge";
import { useUserTokenContext } from "~/src/custom-hooks/useUserTokenContext";
import * as Tooltip from '@radix-ui/react-tooltip';

type Props = {
    applyMediaQueryPositionStyles?: boolean,
    className?: string
};

export function Header(props: Props) {
    const { applyMediaQueryPositionStyles = true } = props;
    const [theme, setTheme] = useThemeContext();
    const [userToken, setUserToken] = useUserTokenContext();

    const isLightTheme = theme === "light";
    const nextTheme = isLightTheme ? "dark" : "light";
    const ThemeBtnIcon = isLightTheme ? Moon : Sun;

    let logoutBtnAndExtra: JSX.Element | null = null;
    if (userToken) {
        logoutBtnAndExtra = (
            <>
                <div
                    className = "border-[0.5px] border-independence"
                ></div>
                <Tooltip.Provider>
                    <Tooltip.Root
                        delayDuration = {300}
                    >
                        <Tooltip.Trigger
                            asChild
                        >
                            <button
                                onClick = {() => setUserToken(null)}
                                className = "px-5 tabAndUp:px-7 laptopAndUp:px-0 laptopAndUp:py-5 outline-fig-ds-02"
                            >
                                <span
                                    aria-hidden
                                    className = {helpers.formatClassNames(
                                        `
                                            w-8 laptopAndUp:w-10 
                                            h-8 laptopAndUp:h-10
                                            rounded-full 
                                            m-auto
                                            bg-fig-ds-01
                                            border border-fig-ds-01
                                            text-white
                                            flex justify-center items-center
                                        `
                                    )}
                                >
                                    <span
                                        className = "translate-y-[1px]"
                                    >
                                        {helpers.getAtMostTwoLettersFromName(userToken.name)}
                                    </span>
                                </span>
                            </button>
                        </Tooltip.Trigger>
                        <Tooltip.Portal>
                            <Tooltip.Content
                                aria-label = {`logged in user's name: ${userToken.name}, click to logout`}
                                className = "p-2 rounded-[0.25rem] bg-fig-ds-01 text-white"
                            >
                                {userToken.name}
                                <Tooltip.Arrow
                                    className = "fill-fig-ds-01"
                                />
                            </Tooltip.Content>
                        </Tooltip.Portal>
                    </Tooltip.Root>
                </Tooltip.Provider>
            </>
        );
    }

    // overflow-hidden - To contain the direct div element within the border radius
    return (
        <header
            className = {twMerge(
                helpers.formatClassNames(
                    `
                        overflow-hidden 
                        flex laptopAndUp:flex-col justify-between flex-shrink-0 
                        laptopAndUp:rounded-r-[1.25rem] 
                        laptopAndUp:h-full
                        laptopAndUp:w-fit
                        ${isLightTheme ? "bg-carbon-blue" : "bg-fig-ds-03"}
                        ${helpers.passIfTrueElseEmpty(
                            applyMediaQueryPositionStyles,
                            "laptopAndUp:absolute laptopAndUp:top-0 laptopAndUp:left-0" 
                        )}
                    `
                ),
                props.className
            )}
        >
            <MainHeadingWithLogo />
            <div
                className = {helpers.formatClassNames(
                    `
                        flex laptopAndUp:flex-col
                        gap-1 mr-1 laptopAndUp:mr-0 laptopAndUp:mb-1
                        relative
                    `
                )}
            >
                <button
                    onClick = {() => setTheme(nextTheme)}
                    className = "px-5 tabAndUp:px-7 laptopAndUp:px-0 laptopAndUp:py-5 outline-fig-ds-02"
                >
                    <VisuallyHidden
                        useSpanTag
                    >
                        {`change application's theme to ${nextTheme}`}
                    </VisuallyHidden>
                    <ThemeBtnIcon 
                        aria-hidden
                        className = "w-5 h-5 m-auto"
                    />
                </button>
                {logoutBtnAndExtra}
            </div>
        </header>
    );
}
