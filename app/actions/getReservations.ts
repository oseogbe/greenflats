import prisma from "@/lib/prismadb";

interface IParams {
    listingId?: string;
    userId?: string;
    hostId?: string;
}

export default async function getReservations(
    params: IParams
) {
    try {
        const { listingId, userId, hostId } = params;

        const query: any = {};

        if (listingId) {
            query.listingId = listingId;
        }

        if (userId) {
            query.userId = userId;
        }

        if (hostId) {
            query.listing = { userId: hostId }
        }

        const reservations = await prisma.reservation.findMany({
            where: query,
            include: {
                listing: true,
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        const safeReservations = reservations.map(reservation => ({
            ...reservation,
            createdAt: reservation.createdAt.toISOString(),
            startDate: reservation.startDate.toISOString(),
            endDate: reservation.endDate.toISOString(),
            listing: {
                ...reservation.listing,
                createdAt: reservation.listing.createdAt.toISOString()
            }
        }));

        return safeReservations;
    } catch (error: any) {
        throw new Error(error);
    }

}