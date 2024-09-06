import {createContext, ReactNode, useContext} from "react";

type ProjectContextType<X> = {
    project?: X;
    _setProject: (project: X) => void;
    saveProject: () => string;
    loadProject: (data: string) => boolean;
    closeProject: () => void;
    createProject: () => void;
    isProjectOpen: boolean;
    children? : ReactNode;
}

const ProjectContext = createContext({});

export function DummyProjectProvider<X>({children, ...props}: ProjectContextType<X>) {
    return <ProjectContext.Provider value={{
        ...props
    }}>
        {children}
    </ProjectContext.Provider>

}

export function useProject(): ProjectContextType<never> {
    return useContext(ProjectContext) as ProjectContextType<never>;
}