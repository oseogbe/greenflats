"use client";

import { useState } from "react";
import Image from "next/image";
import { PiDotsNineLight } from "react-icons/pi";

import Heading from "../Heading";
import HeartButton from "../HeartButton";
import ArrowBack from "../ArrowBack";
import Button from "../Button";

import { SafeUser } from "@/types";
import ImageGallery from "../ImageGallery";

interface ListingHeadProps {
    title: string;
    images: string[];
    state?: string;
    area?: string;
    id: string;
    currentUser?: SafeUser | null;
}

const ListingHead: React.FC<ListingHeadProps> = ({
    title,
    images,
    state,
    area,
    id,
    currentUser
}) => {
    const [isOpen, setIsOpen] = useState(false);

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
                    src={images[0]}
                    fill
                    className="object-cover w-full"
                />
                <div className="absolute top-5 right-5">
                    <HeartButton
                        listingId={id}
                        currentUser={currentUser}
                    />
                </div>
                <div className="absolute bottom-5 right-5">
                    <Button
                        label="Show all photos"
                        icon={PiDotsNineLight}
                        onClick={() => setIsOpen(true)}
                        width={220}
                        outline
                    />
                    <ImageGallery
                        isOpen={isOpen}
                        onClose={() => setIsOpen(false)}
                        slides={images.map(image => ({
                            src: image
                        }))}
                    />
                </div>
            </div>
        </>
    )
}

export default ListingHead
