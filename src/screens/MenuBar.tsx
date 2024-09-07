import {useTheme} from "next-themes";
import {Card, DropdownItem, DropdownSection} from "@nextui-org/react";
import {MenuLabel} from "../components/MenuLabel.tsx";
import {Moon, Save, Signal, Sun} from "lucide-react";
import {useProject} from "../utils/project.tsx";

export function SaveProject() {
    const project = useProject()

    // get PrjectData[] form local storage
    const localProjects = localStorage.getItem("projects")
    const projects = localProjects ? JSON.parse(localProjects) : []

    // add project to projects
    projects.push(project.project)

    // save projects to local storage
    localStorage.setItem("projects", JSON.stringify(projects))
}

export function OpenProject() {
    // open file dialog

}

export function SaveAsProject() {

}

export function MenuBar() {
    const {theme, setTheme} = useTheme()
    const project = useProject()


    return <div className={"absolute z-50 w-full flex justify-center px-10 py-5"}>
        <div className={"grow flex"}>
            <Card className={"shrink px-4 py-1"}>
                <div className={"flex flex-row gap-4 cursor-default select-none"}>
                    <MenuLabel trigger={<div>Project</div>}>
                        <DropdownSection showDivider>
                            <DropdownItem shortcut={"⌘⇧N"} onClick={() => project.createProject()}>New Project</DropdownItem>
                            <DropdownItem shortcut={"⌘⇧O"}>Open Project</DropdownItem>
                        </DropdownSection>
                        <DropdownSection showDivider>
                            <DropdownItem isDisabled={!project.isProjectOpen} shortcut={"⌘S"}>Save Project</DropdownItem>
                            <DropdownItem isDisabled={!project.isProjectOpen} shortcut={"⌘⇧S"}>Save As</DropdownItem>
                            <DropdownItem isDisabled={!project.isProjectOpen} onClick={() => project.closeProject()} color={"danger"}>Close Project</DropdownItem>
                        </DropdownSection>
                        <DropdownSection>
                            <DropdownItem shortcut={"⌘K"}>Settings</DropdownItem>
                            <DropdownItem shortcut={"⌘Q"}>Quit</DropdownItem>
                        </DropdownSection>
                    </MenuLabel>
                    <MenuLabel trigger={<div>Edit</div>}>
                        <DropdownItem shortcut={"⌘Z"}>Undo</DropdownItem>
                        <DropdownItem shortcut={"⌘⇧Z"}>Redo</DropdownItem>
                    </MenuLabel>
                    <MenuLabel trigger={<div>Help</div>}>
                        <DropdownItem isDisabled>
                            <p className={"text-wrap break-after-all w-48"}>
                                This project is a work in progress and subject to heavy changes.
                                Here are some links to get help or contribute
                            </p>
                        </DropdownItem>
                        <DropdownItem>GitHub</DropdownItem>
                        <DropdownItem>Patreon</DropdownItem>
                    </MenuLabel>
                </div>
            </Card>
        </div>

        <div className={"grow flex justify-center"}>
            <div className={"flex gap-1 items-end"}>
                <Card className={"px-4 py-1"}>OpenConversation</Card>
                <Card className={"bg-success text-xs px-1 py-0.5"}>v1.1</Card>

            </div>
        </div>
        <div className={"flex gap-2 h-full justify-end items-center grow"}>
            <Card className={"aspect-square rounded-full px-2 py-1 flex justify-center items-center"}
                  onMouseDown={() => setTheme(theme == "light" ? "dark" : "light")}>
                {theme == "light" ? <Moon size={16}/> : <Sun size={16}/>}
            </Card>
            <Card className={"aspect-square rounded-full px-2 py-1 flex justify-center items-center"}>
                <Save size={16}/>
            </Card>
            <Card className={"aspect-square rounded-full px-2 py-1 flex justify-center items-center"}>
                <Signal size={16}/>
            </Card>
        </div>
    </div>
}