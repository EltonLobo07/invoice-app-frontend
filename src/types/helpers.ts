declare const __brand: unique symbol;

export type DeepReadonly<T> = 
    /* 
        Without the transformation in the true branch, 
            {(): string} or () => string changes to {} - which is incorrect 
        
        This type helper will not change the readonly modifiers associated to a branded type
    */
    T extends {[__brand]: unknown}
    ? T
    : T extends (...args: unknown[]) => unknown
      ? Omit<T, string | number | symbol> & {readonly [K in keyof T]: DeepReadonly<T[K]>}
      : T extends object
        ? {readonly [K in keyof T]: DeepReadonly<T[K]>} 
        : T;

export type Branded<TBase, TBrand extends string> = TBase & {[__brand]: TBrand};
