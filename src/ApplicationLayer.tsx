import '@xyflow/react/dist/style.css';
import {MainMenuModal} from "./assemblys/MainMenuModal.tsx";
import {MenuBar} from "./assemblys/MenuBar.tsx";
import {ChatWindow} from "./assemblys/ChatWindow.tsx";
import {Graph} from "./components/Graph.tsx";
import {createRoot} from "react-dom/client";
import {ReactNode, StrictMode} from "react";
import {NextUIProvider} from "@nextui-org/react";
import {ThemeProvider as NextThemesProvider} from "next-themes";
import LocalStorageProjectProvider from "./contexts/LocalStorageProjectProvider.tsx";
import {SettingsProvider} from "./contexts/SettingsProvider.tsx";


createRoot(document.getElementById('root')!).render(<Root/>,)

function Root() {
    return (
        <Mode>
            <Provider>
                <Layout>
                    <ApplicationLayer/>
                </Layout>
            </Provider>
        </Mode>
    )
}

function Mode({children}: { children?: ReactNode }) {
    return <StrictMode>{children}</StrictMode>
}

function Layout({children}: { children?: ReactNode }) {
    return <>
        {children}
    </>
}

export type UserSettings = {
    test: string;
}

function Provider({children}: { children?: ReactNode }) {
    return <SettingsProvider defaultValue={{} as UserSettings} localStoragePrefix={"user-settings-"}>
        <NextUIProvider>
            <NextThemesProvider attribute={"class"} defaultTheme={"dark"}>
                <LocalStorageProjectProvider>
                    {children}
                </LocalStorageProjectProvider>
            </NextThemesProvider>
        </NextUIProvider>
    </SettingsProvider>
}

// export for fast refresh
export function ApplicationLayer() {
    return (
        <div style={{width: '100vw', height: '100vh'}}>
            <MenuBar/>
            <ChatWindow/>
            <Graph/>
            <MainMenuModal/>
        </div>
    );
}