import { Amount } from "~/src/components/Amount";
import { useThemeContext } from "~/src/custom-hooks/useThemeContext";
import { helpers } from "~/src/helpers";
import { twStyles } from "~/src/twStyles";
import { Invoice } from "~/src/types";
import { DeepReadonly } from "~/src/types/helpers";

type Props = {
    item: DeepReadonly<Invoice["items"][number]>
};

export function TableRow(props: Props) {
    const [theme] = useThemeContext();
    const lightTheme = theme === "light";
    const rowBottomPadding = "pb-8";

    return (
        <tr>
            <td
                className = {helpers.formatClassNames(
                    `
                        ${rowBottomPadding}
                        ${twStyles.fontFigHeadingSVar}
                        ${lightTheme ? "text-fig-ds-08" : "text-white"}
                        ${helpers.passIfTrueElseEmpty(props.item.name.length === 0, "opacity-30")}
                    `
                )}
            >
                {props.item.name || "unknown name"}
            </td>
            <td
                className = {helpers.formatClassNames(
                    `
                        text-center
                        ${rowBottomPadding}
                        ${twStyles.fontFigHeadingSVar}
                        ${lightTheme ? "text-fig-ds-07" : "text-fig-ds-05"}
                    `
                )}
            >
                {props.item.quantity}
            </td>
            <td
                className = {helpers.formatClassNames(
                    `
                        text-end
                        ${rowBottomPadding}
                        ${twStyles.fontFigHeadingSVar}
                        ${lightTheme ? "text-fig-ds-07" : "text-fig-ds-05"}
                    `
                )}
            >
                <Amount 
                    value = {props.item.price}
                />
            </td>
            <td
                className = {helpers.formatClassNames(
                    `
                        text-end
                        ${rowBottomPadding}
                        ${twStyles.fontFigHeadingSVar}
                        ${lightTheme ? "text-fig-ds-08" : "text-white"}
                    `
                )}
            >
                <Amount 
                    value = {props.item.total}
                />
            </td>
        </tr>
    );
}
