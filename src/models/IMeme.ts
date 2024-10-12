import {ITag} from "./ITag.ts";

export interface IMeme {
    id: number;
    image: string;
    description: string;
    tags: ITag[];
}