import { Ref, VNodeRef } from "vue";

type NavLinks = Record<"path" | "text", string>;


type FunctionRef = Exclude<VNodeRef, string | Ref<any>>

type TailwindSpacingScale = {
    0:"1"
}

export type {
    NavLinks,
    FunctionRef
    TailwindSpacingScale
}