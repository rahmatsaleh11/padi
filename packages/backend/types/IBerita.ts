import { z } from "zod";

export const ZBerita = z.object({
    isi : z.string().nonempty(),
    title : z.string().nonempty(),
})

export type IBerita = z.infer<typeof ZBerita>
