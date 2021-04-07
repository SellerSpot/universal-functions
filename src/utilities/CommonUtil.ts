class CommonUtil {
    static removeProperty<T, K extends keyof T>(obj: T, propertyName: K): T {
        const newObj: T = { ...obj };
        delete newObj[propertyName];
        return newObj;
    }
}

export { CommonUtil };
