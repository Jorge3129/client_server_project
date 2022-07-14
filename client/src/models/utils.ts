export type NoId<T> = Omit<T, "id">
export type ToString<T> = {[k in keyof T]: string}

