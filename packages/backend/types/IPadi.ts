import { z } from "zod";

export const ZPadiAdd = z.object({
    tanggal_awal: z.preprocess((val: any) => {
        return new Date(val)
    }, z.date()),
    tanggal_panen: z.preprocess((val: any) => {
        return new Date(val)
    }, z.date()),
   
});

export type IPadiAdd = z.infer<typeof ZPadiAdd>
export const ZPadiEdit = z.object({
    tanggal_awal: z.preprocess((val: any) => {
        return new Date(val)
        }, z.date()).optional(),
    tanggal_panen: z.preprocess((val: any) => {
        return new Date(val)
        }, z.date()).optional(),
    
})
export type IPadiEdit = z.infer<typeof ZPadiEdit>
