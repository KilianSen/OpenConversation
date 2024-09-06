import {createContext, ReactElement, useContext, useEffect, useState} from "react";

export type ProxyOnSet<T> = (field: keyof T, value: T[keyof T]) => [boolean, T[keyof T] | null];
export type ProxyOnGet<T> = (field: keyof T) => [boolean, T[keyof T] | null];

function shouldProxy(property: string, exclusions: string[]): boolean {
    return !exclusions.some((exclusion) => property.includes(exclusion));
}

function proxyObject<T extends object>(obj: T, onSet: ProxyOnSet<T>, onGet: ProxyOnGet<T>, proxyExclusions: string[]): T {
    return new Proxy(obj, {
        set: (target, property, value) => {
            if (!shouldProxy(String(property), proxyExclusions)) {
                target[property as keyof T] = value;
                return true;
            }

            const [success, newValue] = onSet(property as keyof T, value);
            if (success) {
                target[property as keyof T] = newValue as T[keyof T];
            }
            return success;
        },
        get: (target, property) => {
            if (!shouldProxy(String(property), proxyExclusions)) {
                return target[property as keyof T];
            }

            const [success, value] = onGet(property as keyof T);

            if (!success) {
                console.log(`Property ${String(property)} not found, falling back to regular object value`);
                return target[property as keyof T];
            }
            return value;
        }
    });
}

export const ProxyContext = createContext<object | undefined>(undefined);

type ProxyProviderProps<T> = {
    children: ReactElement;
    defaultValue?: T;
    proxySet: ProxyOnSet<T>;
    proxyGet: ProxyOnGet<T>;
    proxyExclusions?: string[];
    noInternalExclusions?: boolean;
}

export function ProxyObjectProvider<T extends object>(props: ProxyProviderProps<T>) {
    const [proxiedObject, setProxiedObjectState] = useState<T>(props.defaultValue || {} as T);

    // These are properties should most likely not be proxied
    const internalExclusions = props.noInternalExclusions ? [] :
        ["react", "Symbol", "constructor",
        "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable",
        "toLocaleString", "toString", "valueOf"];

    const createProxyObject = () => {
        return proxyObject<T>(
            proxiedObject || props.defaultValue,
            wrapSetMethod,
            props.proxyGet,
            [...internalExclusions, ...(props.proxyExclusions || [])]
        );
    }

    // This is a wrapper around the set method that will update the proxied object state
    // (and thus re-render the component using the proxied object)
    const wrapSetMethod = (field: keyof T, value: T[keyof T]) => {
        const returnValue = props.proxySet(field, value);
        setProxiedObjectState(createProxyObject());
        return returnValue;
    }

    const handleSetup = () => {
        setProxiedObjectState(createProxyObject());
    }

    useEffect(() => {
        handleSetup()
    }, []);

    return <ProxyContext.Provider value={proxiedObject as never}>
        {props.children}
    </ProxyContext.Provider>
}

export function useProxyObjectContext() {
    const context = useContext(ProxyContext);
    if (context === undefined) {
        throw new Error('useProxyContext must be used within a ProxyProvider');
    }
    return context;
}