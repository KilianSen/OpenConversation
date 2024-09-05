import {useContext} from "react";
import {SettingsContext} from "./SettingsProvider.tsx";

export function useSettings<T extends object>(): T {
    const context = useContext(SettingsContext);
    if (context === undefined) {
        throw new Error('useSettings must be used within a SettingsProvider');
    }
    return context as T;
}