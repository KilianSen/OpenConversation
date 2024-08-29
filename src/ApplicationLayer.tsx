import '@xyflow/react/dist/style.css';
import {MainMenuModal} from "./components/MainMenuModal.tsx";
import {MenuBar} from "./screens/MenuBar.tsx";
import {ChatWindow} from "./screens/ChatWindow.tsx";
import {Graph} from "./components/Graph.tsx";
import {createRoot} from "react-dom/client";
import {ReactNode, StrictMode} from "react";
import {NextUIProvider} from "@nextui-org/react";
import {ThemeProvider as NextThemesProvider} from "next-themes";


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

function Provider({children}: { children?: ReactNode }) {
    return <NextUIProvider>
        <NextThemesProvider attribute={"class"} defaultTheme={"dark"}>
            {children}
        </NextThemesProvider>
    </NextUIProvider>
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