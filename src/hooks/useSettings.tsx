import {useContext} from "react";
import {SettingsContext} from "../contexts/SettingsProvider.tsx";

export function useSettings<T extends object>(): T {
    const settings = useContext(SettingsContext);
    if (!settings) {
        throw new Error('useSettings must be used within a SettingsProvider');
    }
    return settings as T;
}