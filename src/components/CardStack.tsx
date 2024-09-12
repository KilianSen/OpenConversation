import {useSettings} from "../hooks/useSettings.tsx";
import {ReactElement} from "react";
import {Card, Chip} from "@nextui-org/react";
import {UserSettings} from "../ApplicationLayer.tsx";
import {X} from "lucide-react";

type StackCardProps = {
    children: ReactElement;
    isDismissible?: boolean;
    id: string;
}

export function StackCard({children, isDismissible, id}: StackCardProps) {
    const settings = useSettings<UserSettings>();

    const isDismissed = isDismissible && (settings.stackCards[id] || false);


    if (isDismissed) {
        return <></>;
    }

    return (
        <>
            <Card
                className={"rounded-md w-96 px-2 py-1 flex border-1.5 border-foreground/[.125] min-h-[46px]"}>
                <div className={"absolute right-2 top-2"}>
                    <Chip
                        onMouseDown={() => settings.stackCards = {...settings.stackCards, [id]: !isDismissed}}
                        variant={"faded"}
                        className={"rounded-md flex justify-center items-center p-0"}>
                        <div className={"flex uppercase items-center justify-center gap-1"}>
                            Dismiss
                            <X/>
                        </div>
                    </Chip>
                </div>
                <div className={"w-full h-full flex flex-col justify-center"}>
                    {children}
                </div>
            </Card>
        </>
    )
}

export default function CardStack({children}: { children?: ReactElement | ReactElement[] }) {

    return (
        <div className={"flex flex-col gap-2"}>
            {
                Array.isArray(children) ?
                    children.map((child, i) => <div key={i}>{child}</div>)
                :
                    <div>
                        {children}
                    </div>
            }
        </div>
    )
}