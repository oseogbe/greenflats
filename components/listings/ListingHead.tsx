"use client";

import { SafeUser } from "@/types";

import Heading from "../Heading";
import Image from "next/image";
import HeartButton from "../HeartButton";
import ArrowBack from "../ArrowBack";

interface ListingHeadProps {
    title: string;
    imageSrc: string;
    state: string;
    area: string;
    id: string;
    currentUser?: SafeUser | null;
}

const ListingHead: React.FC<ListingHeadProps> = ({
    title,
    imageSrc,
    state,
    area,
    id,
    currentUser
}) => {
    return (
        <>
            <div className="relative">
                <Heading
                    title={title}
                    subtitle={`${area}, ${state}`}
                />
                <div className="absolute top-0 right-0 md:hidden">
                    <ArrowBack />
                </div>
            </div>
            <div
                className="
                    w-full
                    h-[60vh]
                    overflow-hidden
                    rounded-xl
                    relative
                "
            >
                <Image
                    alt={`${title}`}
                    src={imageSrc}
                    fill
                    className="object-cover w-full"
                />
                <div className="absolute top-5 right-5">
                    <HeartButton
                        listingId={id}
                        currentUser={currentUser}
                    />
                </div>
            </div>
        </>
    )
}

export default ListingHead