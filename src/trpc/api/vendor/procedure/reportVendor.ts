import { z } from "zod";
import { protectedProcedure } from "../../trpc";


export const reportVendorSchema = z.object({
    serviceId: z.string(),
    vendorId: z.string(),
    issueType: z.enum(["FRAUD", "IMPERSONATION", "ABUSE", "OTHER"]),
    description: z.string().min(10),
    attachments: z.array(z.string()).optional(),
});

export const reportVendor = protectedProcedure
    .input(reportVendorSchema)
    .mutation(async ({ ctx, input }) => {
        const report = await ctx.db.report.create({
            data: {
                serviceId: input.serviceId,
                vendorId: input.vendorId,
                reporterId: ctx.session.user.id,
                issueType: input.issueType,
                description: input.description,
                attachments: input.attachments || [],
            },
        });

        return report;
    });
