import { type Registry } from "shadcn/schema"
import { registry as coreRegistry } from "@/libs/tailark/registry/core/registry"
import { blocks as duskRadixBlocks } from "@/libs/tailark/registry/bases/radix/dusk/_registry"
import { blocks as mistRadixBlocks } from "@/libs/tailark/registry/bases/radix/mist/_registry"
import { blocks as veilRadixBlocks } from "@/libs/tailark/registry/bases/radix/veil/_registry"

export const registry: Registry = {
    $schema: "https://ui.shadcn.com/schema/registry.json",
    name: "Tailark Radix",
    homepage: "https://tailark.com",
    items: [...(coreRegistry.items ?? []), ...duskRadixBlocks, ...mistRadixBlocks, ...veilRadixBlocks],
}
