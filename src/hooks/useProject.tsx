import {useContext} from "react";
import {ProjectContext, ProjectContextType} from "../contexts/ProjectProvider.tsx";

export function useProject<X>(): ProjectContextType<X> {
    return useContext(ProjectContext) as ProjectContextType<X>;
}