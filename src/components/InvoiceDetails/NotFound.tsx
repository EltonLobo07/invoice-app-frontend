import { SadFace } from "~/src/components/icons/SadFace";
import { useThemeContext } from "~/src/custom-hooks/useThemeContext";
import { helpers } from "~/src/helpers";
import { twStyles } from "~/src/twStyles";
import { CustomLink } from "~/src/components/CustomLink";

export function NotFound() {
    const [theme] = useThemeContext();

    return (
        <div
            className = {helpers.formatClassNames(
                `
                    w-full 
                    h-full 
                    flex 
                    overflow-y-auto
                    ${helpers.getScrollbarTwClassName(theme)}
                `
            )}
        >
            <div
                className = "m-auto flex flex-col items-center gap-y-6 text-center"
            >
                <SadFace 
                    aria-hidden
                    className = "w-12 h-12"
                />
                <span
                    className = {twStyles.fontFigHeadingM}
                >
                    Page not found
                </span>
                <CustomLink
                    to = {"/"}
                    className = {helpers.formatClassNames(
                        `
                            capitalize
                            font-bold
                            ${twStyles.fontFigBody}
                            text-[1rem]
                        `
                    )}
                >
                    home
                </CustomLink>
            </div>
        </div>
    );
}
