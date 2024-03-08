import prisma from "@/lib/prismadb";

export interface IListingsParams {
    userId?: string;
    category?: string;
    adultCount?: number;
    childrenCount?: number;
    infantCount?: number;
    petCount?: number;
    roomCount?: number;
    bathroomCount?: number;
    state?: string;
    lga?: string;
    area?: string;
    startDate?: string;
    endDate?: string;
}

export default async function getListings(
    params: IListingsParams
) {
    try {
        const {
            userId,
            category,
            adultCount,
            childrenCount,
            infantCount,
            petCount,
            roomCount,
            bathroomCount,
            state,
            lga,
            area,
            startDate,
            endDate
        } = params;

        let query: any = {};

        if (userId) {
            query.userId = userId;
        }

        if (category) {
            query.category = category;
        }

        if (roomCount) {
            query.roomCount = {
                gte: +roomCount
            };
        }

        if (bathroomCount) {
            query.bathroomCount = {
                gte: +bathroomCount
            };
        }

        if (adultCount) {
            query.adultCount = {
                gte: +adultCount
            };
        }

        if (childrenCount) {
            query.childrenCount = {
                gte: +childrenCount
            };
        }

        if (infantCount) {
            query.infantCount = {
                gte: +infantCount
            };
        }

        if (petCount) {
            query.petCount = {
                gte: +petCount
            };
        }

        if (state) {
            query.state = state
        }

        if (lga) {
            query.lga = lga;
        }

        if (area) {
            query.area = area;
        }

        if (startDate && endDate) {
            query.NOT = {
                reservations: {
                    some: {
                        OR: [
                            {
                                endDate: { gte: startDate },
                                startDate: { lte: startDate }
                            },
                            {
                                startDate: { lte: endDate },
                                endDate: { gte: endDate }
                            }
                        ]
                    }
                }
            }
        }

        const listings = await prisma.listing.findMany({
            where: query,
            orderBy: {
                createdAt: "desc"
            }
        });

        const safeListings = listings.map(listing => ({
            ...listing,
            createdAt: listing.createdAt.toISOString()
        }));

        return safeListings;
    } catch (error: any) {
        throw new Error(error);
    }
}