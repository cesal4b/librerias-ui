import { type Registry } from "shadcn/schema"
import { hooks } from "@/libs/tailark/registry/core/_hooks-registry"
import { magicUi } from "@/libs/tailark/registry/core/_magic-ui-registry"
import { motionPrimitivesRegistry } from "@/libs/tailark/registry/core/_motion-primitives-registry"
import { svgs } from "@/libs/tailark/registry/core/_svgs-registry"

export const registry: Registry = {
    $schema: "https://ui.shadcn.com/schema/registry.json",
    name: "Tailark Core",
    homepage: "https://tailark.com",
    items: [...hooks, ...svgs, ...motionPrimitivesRegistry, ...magicUi],
}
