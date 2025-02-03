import { env } from "@/env";
import { protectedProcedure } from "@/trpc/api/trpc";
import { z } from "zod";


export interface SearchVendorResult {
    _id: {
        $oid: string;
    };
    businessName: string;
    description: string;
    images: string[];
    score: number;
    services: {
        id: string;
        name: string;
        price: number;
        pricingModel: string;
        tags: string[];
    }[];
}

export const searchVendorsProcedure = protectedProcedure
    .input(z.object({ query: z.string(), country: z.string().optional() }))
    .query(async ({ ctx, input }) => {

        const searchQuery = input.query;

        if (!searchQuery || searchQuery.length < 2) {
            throw new Error("Search query is required");
        }

        const pipeline = []

        if (input.country) {

            pipeline.push({
                $search: {
                    index: env.SEARCH_INDEX,
                    compound: {
                        should: [
                            {
                                autocomplete: {
                                    query: searchQuery,
                                    path: 'description',
                                    tokenOrder: 'sequential',
                                },
                            },
                            {
                                autocomplete: {
                                    query: searchQuery,
                                    path: 'businessName',
                                    tokenOrder: 'sequential',
                                },
                            },
                            {
                                autocomplete: {
                                    query: searchQuery,
                                    path: 'category',
                                    tokenOrder: 'sequential',
                                },
                            },
                            {
                                text: {
                                    query: input.country,
                                    path: "$user.country"
                                }
                            }
                        ],
                    },
                }
            });
        } else {
            pipeline.push({
                $search: {
                    index: env.SEARCH_INDEX,
                    compound: {
                        should: [
                            {
                                autocomplete: {
                                    query: searchQuery,
                                    path: 'description',
                                    tokenOrder: 'sequential',
                                },
                            },
                            {
                                autocomplete: {
                                    query: searchQuery,
                                    path: 'businessName',
                                    tokenOrder: 'sequential',
                                },
                            },
                            {
                                autocomplete: {
                                    query: searchQuery,
                                    path: 'category',
                                    tokenOrder: 'sequential',
                                },
                            },
                        ],
                    },
                },
            })

        }

        pipeline.push({
            $project: {
                _id: 1,
                score: { $meta: 'searchScore' },
                businessName: 1,
                description: 1,
                images: 1,
                services: {
                    id: 1,
                    name: 1,
                    price: 1,
                    pricingModel: 1,
                    tags: 1
                },
            },
        })

        pipeline.push({
            $limit: 10  // Limit results
        })

        const result = await ctx.db.vendor.aggregateRaw({ pipeline })

        // collection.aggregate(pipeline).sort({ score: -1 }).limit(10)

        return result as unknown as SearchVendorResult[];

    })
