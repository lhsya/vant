export interface VantResolverOptions {
    /**
     * import style css or less along with components
     *
     * @default true
     */
    importStyle?: boolean | 'css' | 'less';
    /**
     * use lib
     *
     * @default false
     */
    ssr?: boolean;
}
export declare function VantResolver(options?: VantResolverOptions): {
    type: "component";
    resolve: (name: string) => {
        name: string;
        from: string;
        sideEffects: string | undefined;
    } | undefined;
};
