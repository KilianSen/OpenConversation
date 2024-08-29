import {ReactElement, useState} from "react";
import {Dropdown, DropdownMenu, DropdownTrigger} from "@nextui-org/react";

export function MenuLabel({children, trigger, gracePeriod}: {
    children?: ReactElement[] | ReactElement,
    trigger: ReactElement,
    gracePeriod?: number
}) {
    const [onHover, setOnHover] = useState(false)

    let leaveTimeout: number | undefined = undefined


    const mouseEnter = () => {
        if (leaveTimeout) {
            clearTimeout(leaveTimeout)
            leaveTimeout = undefined
        }
        setOnHover(true)
    }

    const mouseLeave = () => {
        if (leaveTimeout) return
        leaveTimeout = setTimeout(() => {
            setOnHover(false)
        }, gracePeriod || 100)
    }

    return <Dropdown isOpen={onHover}>
        <DropdownTrigger onMouseEnter={mouseEnter} onMouseOver={mouseEnter} onMouseLeave={mouseLeave}>
            {trigger}
        </DropdownTrigger>
        <DropdownMenu onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}>
            {children as ReactElement[]}
        </DropdownMenu>
    </Dropdown>

}