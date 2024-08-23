import './App.css'
import {ReactFlow} from "@xyflow/react";
import '@xyflow/react/dist/style.css';
import {
    Badge,
    Button, ButtonGroup,
    Card,
    CardBody,
    CardHeader, Checkbox, Chip, Divider,
    Dropdown,
    DropdownItem,
    DropdownMenu, DropdownSection,
    DropdownTrigger, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Tooltip
} from "@nextui-org/react";
import {Eye, EyeOff, Github, Moon, Save, Signal, Sun} from "lucide-react";
import {useTheme} from "next-themes";
import {ReactElement, useState} from "react";
import { motion, AnimatePresence } from 'framer-motion';

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
    </div>
}

function MainMenuModal() {

    function DefaultPage() {
        return <>
            <div className={"flex justify-between"}>
                <div className={"flex flex-col gap-2 max-w-[50%] grow"}>
                    <h1 className={"text-xl text-default"}>Main</h1>
                    <Button size={"sm"} className={"justify-start"}>Create New Project</Button>
                    <Button size={"sm"} className={"justify-start"}>Open Existing Project</Button>
                    <Button size={"sm"} className={"justify-start"}>Disconnect from API</Button>
                </div>
                <div className={"flex justify-start items-end flex-col h-72"}>
                <h1 className={"text-xl text-default"}>Recent Projects</h1>
                    <div className={"flex flex-col items-end"}>
                        <Button variant={"flat"} className={"h-fit"}>
                            <div className={"flex flex-col items-start py-1"}>
                                <div>Project 1</div>
                                <div>Created: 2021-10-10</div>
                            </div>
                        </Button>
                    </div>
                </div>
            </div>
        </>
    }

    function ConnectPage({onClicked}: {onClicked?: () => void}) {
        const [isAnonymous, setIsAnonymous] = useState(true)
        const [keyVisible, setKeyVisible] = useState(false)

        return <>
            <div className={"flex flex-col items-center gap-2"}>
                <h1>Connect to an OpenAI API</h1>
                <Input placeholder={"API Endpoint"} type={"password"} className={"w-full"} endContent={<Signal/>} />
                <Input placeholder={"API Key"} type={!keyVisible?"password":"text"} className={"w-full"} endContent={keyVisible?<Eye onClick={()=>setKeyVisible(!keyVisible)}/>:<EyeOff onClick={()=>setKeyVisible(!keyVisible)}/>} isDisabled={isAnonymous}/>
                <div className={"flex w-full"}>
                    <div className={"flex"}>
                        <Checkbox defaultSelected={isAnonymous} isSelected={isAnonymous} onValueChange={(s) => {
                            setIsAnonymous(s)
                            setKeyVisible(false)
                        }}>Anonymous</Checkbox>
                    </div>
                    <div className={"w-full flex justify-end"}>
                        <Button onClick={onClicked}>Connect</Button>
                    </div>
                </div>
            </div>
        </>
    }

    const [page, setPage] = useState(0)

    const animProps = {
        initial: {opacity: 0, x: 100},
        animate: {opacity: 1, x: 0},
        exit: {opacity: 0, x: -100},
        transition: {duration: .5}
    }

    return (
        <>
            <Modal isDismissable={false} defaultOpen backdrop={"blur"} hideCloseButton size={"3xl"}>
                <ModalContent>
                    <ModalHeader>
                        <div>
                            <h1 className={"text-2xl"}>Welcome to OpenConversation</h1>
                            <div className={"flex gap-2"}>
                                <Chip variant={"flat"} color={"success"} size={"sm"}>v1.0.0</Chip>
                                <Chip variant={"flat"} color={"default"} size={"sm"} className={"text-foreground/[.5]"}>GitHub</Chip>
                            </div>
                        </div>
                    </ModalHeader>
                    <ModalBody>
                        <AnimatePresence mode={"wait"}>
                            {page == 1 && <motion.div {...animProps} key={0}><DefaultPage/></motion.div>}
                            {page == 0 && <motion.div {...animProps} key={1}><ConnectPage onClicked={() => setPage(1)}/>
                            </motion.div>}
                        </AnimatePresence>
                    </ModalBody>
                    <ModalFooter>
                        <div className={"flex flex-col gap-2"}>
                            <Chip variant={"flat"} color={"default"}
                                  className={"min-w-full max-w-full p-2 py-4 rounded-xl border-2 border-default/[.5] text-foreground/[.75]"}>
                            OpenConversation is a tool to simulate conversations with multiple AI agents.
                            </Chip>
                            <Chip variant={"flat"} color={"warning"}
                                          className={"w-full h-fit text-wrap flex-wrap p-2 rounded-xl border-2 border-warning/[.125] max-w-full"}
                                          aria-multiline>This tool is not intended to be used for 1 on 1 conversations, with a
                                        human
                                        and AI. For that, we recommend using OpenWebUI in conjunction with Ollama!</Chip>
                            {page == 0 && <Chip variant={"flat"} color={"secondary"}
                                                className={"w-full h-fit text-wrap flex-wrap p-2 rounded-xl border-2 border-secondary/[.125] text-secondary max-w-full"}
                                                aria-multiline>For an OpenAI API compatible server we recommend: Ollama</Chip>}
                            <div className={"w-full flex gap-2 justify-center pt-3"}>
                                {Array(2).fill(0).map((_, i) => <>
                                    <div key={i} className={"!aspect-square w-2 bg-default rounded-full" + (i == page ? " bg-foreground/[.3]": "")}/>
                                </>)}
                            </div>
                        </div>
                    </ModalFooter>
                </ModalContent>
                <Chip variant={"faded"} className={"absolute bottom-0 right-0 text-xs z-[999] m-1 p-0"}>
                    Made in 🇩🇪 🇪🇺 mit ❤️
                </Chip>
            </Modal>
        </>
    )
}


export default function App() {
    return (
        <div style={{width: '100vw', height: '100vh'}}>
        <MenuBar/>
            <ChatWindow/>
            <ReactFlow nodes={initialNodes} edges={initialEdges} proOptions={{hideAttribution: true}}/>
            <MainMenuModal />
        </div>
    );
}