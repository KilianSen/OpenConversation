import {
    Button,
    Card,
    Checkbox,
    Chip,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    useDisclosure
} from "@nextui-org/react";
import {AnimatePresence, motion} from "framer-motion";
import {Eye, EyeOff, Moon, Signal, Sun} from "lucide-react";
import {useEffect, useState} from "react";
import {useTheme} from "next-themes";
import {ProjectData} from "../contexts/LocalStorageProjectProvider.tsx";
import {RecentProjectButton} from "../components/RecentProjectButton.tsx";
import {useProject} from "../hooks/useProject.tsx";
import CardStack, {StackCard} from "../components/CardStack.tsx";

function DefaultPage() {
    const [localStorageProjects, setLocalStorageProjects] = useState<ProjectData[]>([])
    const project = useProject()

    useEffect(() => {
        const localProjects = localStorage.getItem("projects")
        if (localProjects) {
            setLocalStorageProjects(JSON.parse(localProjects))
        }
    }, []);

    return <>
        <div className={"flex justify-between gap-4"}>
            <div className={"flex flex-col gap-2 max-w-[50%] grow"}>
                <h1 className={"text-xl text-default"}>Main</h1>
                <div className={"flex flex-col grow justify-between gap-2"}>
                    <div className={"flex flex-col gap-2"}>
                        <Button variant={"flat"} size={"sm"}
                                className={"justify-start bg-success/[.3] text-success-700 dark:text-success/[.75] dark:bg-success/[.125]"}
                                onClick={() => project.createProject()}>Create New Project</Button>
                        <Button variant={"flat"} size={"sm"} className={"justify-start"}>Open Existing
                            Project</Button>
                    </div>
                    <Button size={"sm"} className={"justify-start animate-pulse"} color={"danger"} variant={"flat"}>Disconnect
                        from API</Button>
                </div>
            </div>
            <div className={"flex justify-start items-end flex-col h-72 grow max-w-[50%]"}>
                <h1 className={"text-xl text-default"}>Recent Projects</h1>
                <div className={"flex flex-col items-end w-full gap-2 pt-2"}>
                    {  localStorageProjects.length == 0 ? <p className={"text-default"}>No recent projects</p> :
                        localStorageProjects.map((project, i) => <RecentProjectButton key={i} project={project}/>)
                    }
                </div>
            </div>
        </div>
    </>
}

function ConnectPage({onClicked}: { onClicked?: () => void }) {
    const [isAnonymous, setIsAnonymous] = useState(true)
    const [keyVisible, setKeyVisible] = useState(false)

    return <>
        <div className={"flex flex-col items-center gap-2"}>
            <h1>Connect to an OpenAI API</h1>
            <Input placeholder={"API Endpoint"} type={"password"} className={"w-full"} endContent={<Signal/>}/>
            <Input placeholder={"API Key"} type={!keyVisible ? "password" : "text"} className={"w-full"}
                   endContent={keyVisible ? <Eye onClick={() => setKeyVisible(!keyVisible)}/> :
                       <EyeOff onClick={() => setKeyVisible(!keyVisible)}/>} isDisabled={isAnonymous}/>
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

export function MainMenuModal() {
    const {isOpen, onClose, onOpen} = useDisclosure({defaultOpen: true});

    const project = useProject()

    useEffect(() => {
        if (project.isProjectOpen) {
            onClose()
        } else {
            onOpen()
        }
    }, [onClose, onOpen, project.isProjectOpen]);




    const [page, setPage] = useState(0)

    const animProps = {
        initial: {opacity: 0, x: 100},
        animate: {opacity: 1, x: 0},
        exit: {opacity: 0, x: -100},
        transition: {duration: .5}
    }

    const {theme, setTheme} = useTheme()

    return (
        <>
            <Modal isDismissable={false} isKeyboardDismissDisabled={true} isOpen={isOpen} backdrop={"blur"}
                   hideCloseButton size={"3xl"} className={"scrollbar-hide"}>
                <ModalContent>
                    <ModalHeader>
                        <div className={"flex w-full justify-between"}>
                            <div>
                                <h1 className={"text-2xl"}>Welcome to OpenConversation</h1>
                                <div className={"flex gap-2"}>
                                    <Chip variant={"flat"} color={"success"} size={"sm"}>v1.0.0</Chip>
                                    <Chip variant={"flat"} color={"default"} size={"sm"}
                                          className={"text-foreground/[.5]"}>GitHub</Chip>
                                </div>
                            </div>
                            <div>
                                <Card
                                    className={"aspect-square rounded-xl px-2 py-1 flex justify-center items-center border-1.5 border-foreground/[.125]"}
                                    onMouseDown={() => setTheme(theme == "light" ? "dark" : "light")}>
                                    {theme == "light" ? <Moon size={16}/> : <Sun size={16}/>}
                                </Card>
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
                        <div className={"w-full flex flex-col gap-2"}>
                            <div className={"w-full flex gap-2 justify-center pt-3"}>
                                {Array(2).fill(0).map((_, i) => <>
                                    <div key={i}
                                         className={"!aspect-square w-2 bg-default rounded-full" + (i == page ? " bg-foreground/[.3]" : "")}/>
                                </>)}
                            </div>
                        </div>
                    </ModalFooter>
                </ModalContent>
                <Chip variant={"faded"} className={"absolute bottom-0 right-0 text-xs z-[999] m-1 p-0"}>
                    Made in 🇩🇪 🇪🇺 mit ❤️
                </Chip>
                <div className={"absolute bottom-0 left-0 m-1 p-0 z-[999] flex gap-2"}>
                    <CardStack>
                        <StackCard id={"main1"} isDismissible><>Test content</></StackCard>
                        <StackCard id={"main2"} isDismissible><>Test content</></StackCard>
                        <StackCard id={"main3"} isDismissible><>Test content</></StackCard>
                    </CardStack>
                </div>
            </Modal>
        </>
    )
}