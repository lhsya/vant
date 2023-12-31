import type { VueTag, Options } from './type.js';
export declare function genWebTypes(tags: VueTag[], options: Options): {
    $schema: string;
    framework: string;
    name: string;
    version: string;
    contributions: {
        html: {
            tags: VueTag[];
            attributes: never[];
        };
    };
    'js-types-syntax': string;
};
