import { VisuallyHidden } from "~/src/components/VisuallyHidden";
import { AppLogo } from "~/src/components/icons/AppLogo";
import { helpers } from "~/src/helpers";

export function MainHeadingWithLogo() {
    return (
        <div
            className = {helpers.formatClassNames(
                `
                bg-fig-ds-01
                relative
                overflow-hidden
                rounded-r-[20px]
                w-[72px] tabAndUp:w-[80px] laptopAndUp:w-[103px]
                h-[72px] tabAndUp:h-[80px] laptopAndUp:h-[103px]
                `
            )}
        >
            <VisuallyHidden>
                <h1>
                    invoice application
                </h1>
            </VisuallyHidden>
            <div
                className = {helpers.formatClassNames(
                    `
                    w-full h-full
                    absolute top-1/2 left-0
                    rounded-tl-[20px]
                    bg-fig-ds-02
                    `
                )}
            >
            </div>
            <AppLogo
                aria-hidden 
                className = {helpers.formatClassNames(
                    `
                    w-[28px] tabAndUp:w-[32px] laptopAndUp:w-[40px]
                    h-[28px] tabAndUp:h-[32px] laptopAndUp:h-[40px]
                    absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                    `
                )}
            />
        </div>
    );
}
