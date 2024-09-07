import { ProjectProvider as DummyProjectProvider } from './ProjectProvider.tsx';
import {ReactNode, useState} from "react";

export type ProjectData = {
    name: string;
    description: string;
    date: string;
}

export default function LocalStorageProjectProvider({ children }: { children?: ReactNode }) {
    const [projectData, setProjectData] = useState<ProjectData>()

    const saveProject = () => {
        return JSON.stringify(projectData)
    }

    const loadProject = () => {
        setProjectData(JSON.parse(localStorage.getItem('project')!))
        return true
    }

    const closeProject = () => {
        setProjectData(undefined)
    }

    const createProject = () => {
        const words = ['apple', 'banana', 'cherry', 'date', 'elderberry', 'fig', 'grape', 'honeydew', 'kiwi', 'lemon', 'mango', 'nectarine', 'orange', 'pear', 'quince', 'raspberry', 'strawberry', 'tangerine', 'ugli', 'vanilla', 'watermelon', 'ximenia', 'yellow', 'zucchini']

        // Generate a random project name
        const getWord = () => words[Math.floor(Math.random() * words.length)]
        // get a random name with 6 words
        const name = Array.from({length: 5}, getWord).join(' ')

        setProjectData({name: name, description: '', date: ''} as ProjectData)
    }

    return DummyProjectProvider<ProjectData>({
        _setProject: setProjectData as never,
        children: children,
        closeProject: closeProject,
        isProjectOpen: !!projectData,
        loadProject: loadProject,
        project: projectData,
        saveProject: saveProject,
        createProject: createProject,
    })
}