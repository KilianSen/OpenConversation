import {createContext, ReactNode} from "react";

export type ProjectContextType<X> = {
    project?: X;
    _setProject: (project: X) => void;
    saveProject: () => string;
    loadProject: (data: string) => boolean;
    closeProject: () => void;
    createProject: () => void;
    isProjectOpen: boolean;
    children? : ReactNode;
}

export const ProjectContext = createContext({});

export function ProjectProvider<X>({children, ...props}: ProjectContextType<X>) {
    return <ProjectContext.Provider value={{...props}}>
        {children}
    </ProjectContext.Provider>

}

