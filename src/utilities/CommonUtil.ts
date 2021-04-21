class CommonUtil {
    static removeProperty<T, K extends keyof T>(obj: T, propertyName: K): T {
        const newObj: T = { ...obj };
        delete newObj[propertyName];
        return newObj;
    }
    static async introduceDelay(delay = 4000): Promise<boolean> {
        return new Promise((resolve) =>
            setTimeout(() => {
                resolve(true);
            }, delay),
        );
    }
}

export { CommonUtil };
