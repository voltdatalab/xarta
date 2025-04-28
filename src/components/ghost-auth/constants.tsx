
// Choose either sessionStorage or localStorage
export const tokenPersistenceChoice = (typeof window !== "undefined") ? localStorage : {
    setItem: (key: string, value: any) => { return null},
    getItem: (key: string) => { return null}
};