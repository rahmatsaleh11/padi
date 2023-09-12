import { z } from "zod";

export const Iid = z.number().int().nonnegative()