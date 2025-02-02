"use client";

import { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { format } from "date-fns";
import Slider from "react-slick";

import { SafeListing, SafeReservation, SafeUser } from "@/types";
import HeartButton from "../HeartButton";
import Button from "../Button";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface ListingCardProps {
    data: SafeListing;
    reservation?: SafeReservation;
    onAction?: (id: string) => void;
    disabled?: boolean;
    actionLabel?: string;
    actionId?: string;
    currentUser?: SafeUser | null;
}

const ListingCard: React.FC<ListingCardProps> = ({
    data,
    reservation,
    onAction,
    disabled,
    actionLabel,
    actionId = "",
    currentUser
}) => {
    const router = useRouter();

    const state = data.state;
    const area = data.area;

    const settings = {
        arrows: true,
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    const handleCancel = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        if (disabled) return;
        if (onAction) onAction(actionId);
    }, [onAction, actionId, disabled]);

    const price = useMemo(() => {
        if (reservation) return reservation.totalPrice;
        return data.price;
    }, [reservation, data.price]);

    const reservationDate = useMemo(() => {
        if (!reservation) return null;
        const start = new Date(reservation.startDate);
        const end = new Date(reservation.endDate);

        return `${format(start, 'PP')} - ${format(end, 'PP')}`;
    }, [reservation]);

    return (
        <div
            className="
                col-span-1 
            "
        >
            <div
                className="
                    flex 
                    flex-col 
                    gap-2 
                    w-full
                "
            >
                <div
                    className="
                        aspect-square 
                        w-full 
                        relative 
                        overflow-hidden 
                        rounded-xl
                    "
                >
                    <Slider {...settings}>
                        {data.images.map((image, i) => (
                            <Image
                                key={i}
                                src={image}
                                alt="a property listed on greenflats"
                                height={400}
                                width={400}
                            />
                        ))}
                    </Slider>
                    <div
                        className="
                            absolute 
                            top-3 
                            right-3
                        "
                    >
                        <HeartButton
                            listingId={data.id}
                            currentUser={currentUser}
                        />
                    </div>
                </div>
                <div
                    onClick={() => router.push(`/listings/${data.id}`)}
                    className="
                        flex 
                        flex-col 
                        gap-2
                        cursor-pointer 
                    "
                >
                    <div className="font-semibold text-lg">
                        {area}, <span className="font-thin">{state}</span>
                    </div>
                    <div className="font-light text-neutral-500">
                        {reservationDate || data.category}
                    </div>
                    <div className="flex flex-row items-center gap-1">
                        <div className="font-semibold">
                            &#8358; {price}
                        </div>
                        {!reservation && (
                            <div className="font-light">/ night</div>
                        )}
                    </div>
                    {onAction && actionLabel && (
                        <Button
                            disabled={disabled}
                            small
                            label={actionLabel}
                            onClick={handleCancel}
                        />
                    )}
                </div>
            </div>

        </div>
    )
}

export default ListingCard
