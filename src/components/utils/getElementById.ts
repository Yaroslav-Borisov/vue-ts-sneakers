export const getElementById = <T>(array: T[], id: number): T | undefined => {
    if (!array || array.length === 0) {
        return undefined;
    }

    const element = array.find(item => {
        if (typeof item === 'object' && item !== null && 'id' in item) {
            return (item as any).id === id;
        }
        return false;
    });

    return element;

}