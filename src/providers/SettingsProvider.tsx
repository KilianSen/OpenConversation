import {createContext, ReactElement, useContext} from "react";
import {ProxyObjectProvider, useProxyObjectContext} from "./ObjectProxyProvider.tsx";

export const SettingsContext = createContext<object | undefined>(undefined);

type SettingsProviderProps<T> = {
    children: ReactElement;
    defaultValue?: T;
    localStoragePrefix?: string;
}

function getStorageMethods(localStoragePrefix?: string) {
    function setSettingsInLocalStorage<T extends object>(field: keyof T, value: T[keyof T]): [boolean, T[keyof T] | null] {
        try {
            localStorage.setItem(localStoragePrefix + String(field), JSON.stringify(value))
            return [true, value];
        } catch { /* empty */ }
        return [false, null];
    }

    function getSettingsFromLocalStorage<T extends object>(field: keyof T): [boolean, T[keyof T] | null] {

        // Check if the field exists in localStorage and if so, parse it and return it
        // If it doesn't exist, return null and false which will cause the proxy object to return the fallback value
        try {
            const storageKey = localStoragePrefix + String(field)
            if (!(localStorage.getItem(storageKey) === null))
                return [true, JSON.parse(localStorage.getItem(storageKey) as string) as T[keyof T]];
        } catch { /* empty */ }
        return [false, null];
    }

    return {setSettingsInLocalStorage, getSettingsFromLocalStorage};
}

export function SettingsProvider<T extends object>(props: SettingsProviderProps<T>) {
    const storageMethods = getStorageMethods(props.localStoragePrefix);

    function InternalSettingsProvider() {
        const settings = useProxyObjectContext();

        return <SettingsContext.Provider value={settings}>
            {props.children}
        </SettingsContext.Provider>
    }

    return <ProxyObjectProvider proxySet={storageMethods.setSettingsInLocalStorage} proxyGet={storageMethods.getSettingsFromLocalStorage} defaultValue={props.defaultValue}>
        <InternalSettingsProvider/>
    </ProxyObjectProvider>
}

export function useSettings<T extends object>(): T {
    const settings = useContext(SettingsContext);
    if (!settings) {
        throw new Error('useSettings must be used within a SettingsProvider');
    }
    return settings as T;
}
