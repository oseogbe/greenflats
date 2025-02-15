"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import { Range } from "react-date-range";
import toast from "react-hot-toast";
import axios from "axios";

import { SafeListing, SafeUser, SafeReservation, Location } from "@/types";
import Container from "@/components/Container";
import ListingHead from "@/components/listings/ListingHead";
import ListingInfo from "@/components/listings/ListingInfo";
import ListingReservation from "@/components/listings/ListingReservation";

import { categories } from "@/components/navbar/Categories";
import useLoginModal from "@/hooks/useLoginModal";

const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
}

interface ListingClientProps {
    reservations?: SafeReservation[];
    listing: SafeListing & {
        user: SafeUser;
    };
    currentUser?: SafeUser | null;
}

const ListingClient: React.FC<ListingClientProps> = ({
    reservations = [],
    listing,
    currentUser
}) => {
    const loginModal = useLoginModal();
    const router = useRouter();

    const disabledDates = useMemo(() => {
        let dates: Date[] = [];

        reservations.forEach((reservation) => {
            const range = eachDayOfInterval({
                start: new Date(reservation.startDate),
                end: new Date(reservation.endDate)
            });

            dates = [...dates, ...range];
        })

        return dates;
    }, [reservations]);

    const [isLoading, setIsLoading] = useState(false);
    const [totalPrice, setTotalPrice] = useState(listing.price);
    const [dateRange, setDateRange] = useState<Range>(initialDateRange);

    const onCreateReservation = useCallback(() => {
        if (!currentUser) {
            return loginModal.onOpen();
        }

        setIsLoading(true);

        axios.post('/api/reservations', {
            totalPrice,
            startDate: dateRange.startDate,
            endDate: dateRange.endDate,
            listingId: listing.id
        }).then(() => {
            toast.success('Property listing reserved!');
            setDateRange(initialDateRange);
            router.push('/trips');
        }).catch(() => {
            toast.error('Something went wrong.');
        }).finally(() => {
            setIsLoading(false);
        })
    }, [currentUser, dateRange.endDate, dateRange.startDate, listing.id, loginModal, router, totalPrice]);

    useEffect(() => {
        if (dateRange.startDate && dateRange.endDate) {
            const dayCount = differenceInCalendarDays(
                dateRange.endDate,
                dateRange.startDate
            );

            if (dayCount && listing.price) {
                setTotalPrice(dayCount * listing.price);
            } else {
                setTotalPrice(listing.price);
            }
        }
    }, [dateRange.endDate, dateRange.startDate, listing.price]);

    const category = useMemo(() => {
        return categories.find(item => item.label === listing.category);
    }, [listing.category]);

    const state = (listing.location as Location).addressComponents.find(c => c.types.includes("administrative_area_level_1"))?.longText
    const area = (listing.location as Location).addressComponents.find(c => c.types.includes("neighborhood"))?.longText

    return (
        <Container>
            <div className="max-w-screen-lg mx-auto">
                <div className="flex flex-col gap-6">
                    <ListingHead
                        title={listing.title}
                        images={listing.images}
                        state={state}
                        area={area}
                        id={listing.id}
                        currentUser={currentUser}
                    />
                    <div className="
                        grid
                        grid-cols-1
                        md:grid-cols-7
                        md:gap-10
                        mt-6
                    ">
                        <ListingInfo
                            user={listing.user}
                            category={category}
                            description={listing.description}
                            roomCount={listing.roomCount}
                            bathroomCount={listing.bathroomCount}
                            adultCount={listing.adultCount}
                            childrenCount={listing.childrenCount}
                            infantCount={listing.infantCount}
                            petCount={listing.petCount}
                            location={listing.location}
                        />
                        <div className="
                            order-first 
                            mb-10 
                            md:order-last 
                            md:col-span-3
                        ">
                            <ListingReservation
                                price={listing.price}
                                totalPrice={totalPrice}
                                onChangeDate={(value) => setDateRange(value)}
                                dateRange={dateRange}
                                onSubmit={onCreateReservation}
                                disabled={isLoading}
                                disabledDates={disabledDates}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default ListingClient