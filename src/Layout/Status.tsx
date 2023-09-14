import { twMerge } from "tailwind-merge";
import { Error } from "~/src/components/icons/Error";
import { Tick } from "~/src/components/icons/Tick";
import { helpers } from "~/src/helpers";
import { twStyles } from "~/src/twStyles";
import { Close } from "~/src/components/icons/Close";
import { useThemeContext } from "~/src/custom-hooks/useThemeContext";
import { useAsyncTaskResultContext } from "~/src/custom-hooks/useAsyncTaskResultContext";

type Props = {
    className?: string
};

export function Status(props: Props) {
    const [theme] = useThemeContext();
    const [statusObj, setStatusObj] = useAsyncTaskResultContext();
    const lightTheme = theme === "light";
    const isErrorMessage = statusObj.type === "error";
    const commonSymbolClassName = "flex-shrink-0";

    let symbol: JSX.Element = (
        <Tick 
            aria-label = "success"
            className = {commonSymbolClassName}
        />
    );
    if (isErrorMessage) {
        symbol = (
            <Error 
                aria-label = "error"
                className = {commonSymbolClassName}
            />
        );
    }

    const content = (
        <div
            className = "flex gap-x-2 items-center p-2"
        >
            {symbol}
            <span
                className = {helpers.formatClassNames(
                    `
                        ${twStyles.fontFigBody}
                        text-[1rem]
                        ${
                            isErrorMessage
                            ? lightTheme ? "text-[rgb(95,33,32)]" : "text-[rgb(244,199,199)]" 
                            : lightTheme ? "text-[rgb(30,70,32)]" : "text-[rgb(204,232,205)]"
                        }
                    `
                )}
            >
                {statusObj.message}
            </span>
        </div>
    );

    return (
        <div
            className = {twMerge(
                helpers.formatClassNames(
                    `
                        max-w-lg
                        rounded-md
                        shadow-sm
                        fixed z-10 ml-[24px] right-[24px] bottom-[24px]
                        border border-current
                        ${helpers.passIfTrueElseEmpty(statusObj.message.length === 0, "opacity-0")}
                        ${
                            isErrorMessage
                            ? lightTheme
                              ? "bg-[rgb(253,237,237)] text-[#d32f2f]"
                              : "bg-[rgb(22,11,11)] text-[rgb(244,67,54)]"
                            : lightTheme
                              ? "bg-[rgb(237,247,237)] text-[rgb(46,125,50)]"
                              : "bg-[rgb(12,19,13)] text-[rgb(102,187,106)]"
                        }
                    `
                ),
                props.className
            )}
        >
            <div
                role = "alert"
                aria-live = "assertive"
                aria-atomic
                aria-relevant = "additions"
            >
                {isErrorMessage && content}
            </div>
            <div
                role = "status"
                aria-live = "polite"
                aria-atomic
                aria-relevant = "additions"
            >
                {!isErrorMessage && content}
            </div>
            {
                statusObj.message && (
                    <button
                        title = "close"
                        onClick = {() => setStatusObj({...statusObj, message: ""})}
                        className = {helpers.formatClassNames(
                            `
                                absolute top-0 right-0 -translate-y-[calc(100%+0.3rem)]
                            `
                        )}
                    >
                        <Close
                            aria-label = "close"
                            className = {helpers.formatClassNames(
                                `
                                    ${
                                        isErrorMessage
                                        ? lightTheme
                                        ? "fill-[rgb(253,237,237)]"
                                        : "fill-[rgb(22,11,11)]"
                                        : lightTheme
                                        ? "fill-[rgb(237,247,237)]"
                                        : "fill-[rgb(12,19,13)]"
                                    }
                                `
                            )}
                        />
                    </button>
                )
            }
        </div>
    );
}
