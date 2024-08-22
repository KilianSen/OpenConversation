import './App.css'
import {ReactFlow} from "@xyflow/react";
import '@xyflow/react/dist/style.css';
import {
    Button,
    Card,
    CardBody,
    CardHeader, Chip,
    Dropdown,
    DropdownItem,
    DropdownMenu, DropdownSection,
    DropdownTrigger, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Tooltip
} from "@nextui-org/react";
import {Moon, Save, Signal, Sun} from "lucide-react";
import {useTheme} from "next-themes";
import {ReactElement, useState} from "react";

const initialNodes = [
    { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
    { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
];
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

function MenuLabel({children, trigger, gracePeriod}: {children?: ReactElement[] | ReactElement, trigger: ReactElement, gracePeriod?: number}) {
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

function MenuBar() {
    const { theme, setTheme } = useTheme()


    return <div className={"absolute z-50 w-full flex justify-center px-10 py-5"}>
        <div className={"grow flex"}>
            <Card className={"shrink px-4 py-1"}>
                <div className={"flex flex-row gap-4 cursor-default select-none"}>
                    <MenuLabel trigger={<div>Project</div>}>
                        <DropdownSection showDivider>
                            <DropdownItem shortcut={"⌘⇧N"}>New Project</DropdownItem>
                            <DropdownItem shortcut={"⌘⇧O"}>Open Project</DropdownItem>
                        </DropdownSection>
                        <DropdownSection showDivider>
                            <DropdownItem shortcut={"⌘S"}>Save Project</DropdownItem>
                            <DropdownItem shortcut={"⌘⇧S"}>Save As</DropdownItem>
                            <DropdownItem isDisabled color={"danger"}>Close Project</DropdownItem>
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
            <Card className={"aspect-square rounded-full px-2 py-1 flex justify-center items-center"} onMouseDown={() => setTheme(theme == "light"? "dark": "light")}>
                {theme =="light" ?<Moon size={16}/>:<Sun size={16}/>}
            </Card>
            <Card className={"aspect-square rounded-full px-2 py-1 flex justify-center items-center"}>
                <Save size={16}/>
            </Card>
            <Card className={"aspect-square rounded-full px-2 py-1 flex justify-center items-center"}>
                <Signal size={16} />
            </Card>
        </div>
    </div>
}

function ChatWindow() {
    return <div
        className={"absolute z-50 bottom-0 w-full flex justify-center px-10 py-5"}
    >
        <Card className={"min-w-[50%]"}>
        <CardHeader>
                Chat Window
            </CardHeader>
            <CardBody>
                123
            </CardBody>
        </Card>
        <Modal isDismissable={false} defaultOpen backdrop={"blur"} hideCloseButton size={"3xl"}>
            <ModalContent>
                <ModalHeader>
                    <span>Welcome to OpenConversation</span>
                    <Card className={"bg-success text-xs px-1 py-0.5 shrink w-min h-min translate-y-1/2 opacity-75"}>v1.1</Card>
                </ModalHeader>
                <ModalBody>
                    OpenConversation is a tool to simulate conversations with multiple AI agents.
                    <Chip variant={"flat"} color={"warning"} className={"w-full h-fit text-wrap flex-wrap p-2 rounded-xl border-1 border-warning/[.125]"} aria-multiline>This tool is not intended to be used for 1 on 1 conversations, with a human and AI. For that, we recommend using OpenWebUI in conjunction with Ollama!</Chip>

                    <span>Connect to a <Tooltip content={<p>We recommend self-hosting <a className={"text-secondary"} href={"https://ollama.ai"}>Ollama</a>!</p>}>OpenAI API Endpoint</Tooltip></span>
                </ModalBody>

                <ModalFooter>
                    <Button>
                        Lets Go!
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    </div>
}


export default function App() {
    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            <MenuBar />
            <ChatWindow />
            <ReactFlow nodes={initialNodes} edges={initialEdges} proOptions={{hideAttribution: true}}/>
        </div>
    );
}