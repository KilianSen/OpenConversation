export type ProxyOnSet<T> = (field: keyof T, value: T[keyof T]) => [boolean, T[keyof T]];
export type ProxyOnGet<T> = (field: keyof T) => [boolean, T[keyof T] | null];

const proxyExclusions = ['react'];

function shouldProxy(property: string): boolean {
    return !proxyExclusions.some((exclusion) => property.includes(exclusion));
}

export function proxyObject<T extends object>(obj: T, onSet: ProxyOnSet<T>, onGet: ProxyOnGet<T>): T {
    return new Proxy(obj, {
        set: (target, property, value) => {
            if (!shouldProxy(String(property))) {
                target[property as keyof T] = value;
                return true;
            }

            const [success, newValue] = onSet(property as keyof T, value);
            if (success) {
                target[property as keyof T] = newValue;
            }
            return success;
        },
        get: (target, property) => {
            if (!shouldProxy(String(property))) {
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
