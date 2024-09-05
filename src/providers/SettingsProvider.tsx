import {createContext, ReactElement, useEffect, useState} from "react";
import {proxyObject} from "../state/ProxyObject.tsx";

export const settingPrefix = 'user-settings-';
export const SettingsContext = createContext<object | undefined>(undefined);

function setSettings<T extends object>(field: keyof T, value: T[keyof T]): [boolean, T[keyof T]] {
    const fieldAsString = String(field); // Ensure field is a string
    localStorage.setItem(settingPrefix + fieldAsString, JSON.stringify(value));
    return [true, value];
}
function getSettings<T extends object>(field: keyof T): [boolean, T[keyof T] | null] {
    const fieldAsString = String(field); // Ensure field is a string
    try {
        const value = localStorage.getItem(settingPrefix + fieldAsString);
        if (value) {
            return [true, JSON.parse(value) as T[keyof T]];
        } else {
            localStorage.setItem(settingPrefix + fieldAsString, JSON.stringify(null));
            console.log(`No settings found for ${fieldAsString}`);
        }
    } catch (e) {
        console.log(`Error getting settings for ${fieldAsString}:`, e);
    }
    return [false, null];
}

type SettingsProviderProps<T> = {
    children: ReactElement;
    defaultValue?: T;
}

export function SettingsProvider<T extends object>(props: SettingsProviderProps<T>) {
    const [settings, setSettingsState] = useState<T>(props.defaultValue || {} as T);

    const createProxyObject = () => {
        return proxyObject<T>(settings || props.defaultValue, wrapSetMethod, getSettings);
    }

    const wrapSetMethod = (field: keyof T, value: T[keyof T]) => {
        const returnValue = setSettings(field, value);
        setSettingsState(createProxyObject());
        return returnValue;
    }

    const handleSetup = () => {
        setSettingsState(createProxyObject());
    }

    useEffect(() => {
        handleSetup()
    }, []);

    return <SettingsContext.Provider value={settings as never}>
        {props.children}
    </SettingsContext.Provider>
}
