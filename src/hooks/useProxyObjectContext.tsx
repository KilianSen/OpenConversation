import {useContext} from "react";
import {ProxyContext} from "../contexts/ObjectProxyProvider.tsx";

export function useProxyObjectContext() {
    const context = useContext(ProxyContext);
    if (context === undefined) {
        throw new Error('useProxyContext must be used within a ProxyProvider');
    }
    return context;
}