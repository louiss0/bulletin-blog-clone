import { Ref, VNodeRef } from "vue";

type NavLinks = Record<"path" | "text", string>;


type FunctionRef = Exclude<VNodeRef, string | Ref<any>>


export type {
    NavLinks,
    FunctionRef,
}