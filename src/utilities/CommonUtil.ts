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
    // static getPropertyVsObject<T, K extends keyof T>(objArr: T[], property: K): Record<T[K], T> {
    //     const propertyVsObj = <Record<T[K], T>>{};
    //     objArr.forEach((obj) => {
    //         const currObjPropertyValue = obj[property];
    //         propertyVsObj[currObjPropertyValue];
    //     });
    // }
}
