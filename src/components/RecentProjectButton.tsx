import {ProjectData} from "../providers/ProjectProvider.tsx";
import {useProject} from "../helpers/project.tsx";
import {Button, Card} from "@nextui-org/react";
import {motion} from "framer-motion";
import {X} from "lucide-react";

export function RecentProjectButton({project}: { project: ProjectData }) {
    const proj = useProject()

    const onClick = () => {
        proj._setProject(project as never)
    }

    return <Button variant={"flat"} className={"h-fit w-full justify-between pr-0"} onClick={onClick}>
        <div className={"flex flex-col items-start py-1 w-full"}>
            <div className={"flex justify-between w-full"}>
                <p className={"text-md"}>Project 1</p>
                <p className={"text-md"}>Project 1</p>
                <p className={"text-md"}>Project 1</p>
            </div>
            <p className={"text-xs"}>Created: 2021-10-10</p>
        </div>
        <motion.div
            initial={{translateX: "75%"}}
            whileHover={{translateX: 0}}
        >
            <Card
                className={"aspect-square rounded-xl px-2 py-1 flex justify-center items-center border-1.5 border-danger/[.125] bg-danger"}>
                <X/>
            </Card>
        </motion.div>
    </Button>
}