export class CommonUtil {
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
    static getPropertyVsObject<T, K extends keyof T>(objArr: T[], property: K): { [k: string]: T } {
        return objArr.reduce((acc, curr) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const keyValue: any = curr[property];
            return { ...acc, [keyValue]: curr };
        }, {});
    }
}
