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
                rounded-r-[1.25rem]
                w-[4.5rem] tabAndUp:w-20 laptopAndUp:w-[6.4375rem]
                h-[4.5rem] tabAndUp:h-20 laptopAndUp:h-[6.4375rem]
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
                    rounded-tl-[1.25rem]
                    bg-fig-ds-02
                    `
                )}
            >
            </div>
            <AppLogo
                aria-hidden 
                className = {helpers.formatClassNames(
                    `
                    w-7 tabAndUp:w-8 laptopAndUp:w-10
                    h-7 tabAndUp:h-8 laptopAndUp:h-10
                    absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                    `
                )}
            />
        </div>
    );
}
