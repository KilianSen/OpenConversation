import {useSettings} from "../providers/settingsHook.ts";
import {UserSettings} from "../ApplicationLayer.tsx";

export default function Test() {
    const settings = useSettings<UserSettings>();

    return <div>
        <h1>Test</h1>
        <p>Theme: {settings.theme}</p>
        <p onClick={() => {settings.darkMode = !settings.darkMode}}>Dark Mode: {settings.darkMode ? "On" : "Off"}</p>
    </div>
}