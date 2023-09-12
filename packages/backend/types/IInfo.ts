import { z } from "zod";

export const ZInfo = z.object({
    tinggi : z.preprocess((val : any) => parseInt(val), z.number().nonnegative().int()),
    info : z.string().nonempty()
})

export type IInfo = z.infer<typeof ZInfo>