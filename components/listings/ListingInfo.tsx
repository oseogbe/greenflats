"use client";

import { SafeUser } from "@/types";

import Avatar from "../Avatar";
import ListingCategory from "./ListingCategory";
import GoogleMap from "../GoogleMap";

interface ListingInfo {
    user: SafeUser;
    category?: {
        label: string;
        description: string;
        // icon: IconType;
    } | undefined;
    description: string;
    roomCount: number;
    bathroomCount: number;
    adultCount: number;
    childrenCount: number;
    infantCount: number;
    petCount: number;
    location: any;
}

const ListingInfo: React.FC<ListingInfo> = ({
    user,
    category,
    description,
    roomCount,
    bathroomCount,
    adultCount,
    childrenCount,
    infantCount,
    petCount,
    location,
}) => {
    const { latitude, longitude } = location;

    return (
        <div className="
            col-span-4
            flex
            flex-col
            gap-8
        ">
            <div className="flex flex-col gap-2">
                <div className="
                    text-xl 
                    font-semibold 
                    flex 
                    flex-row 
                    items-center 
                    gap-2
                ">
                    <div>Hosted by {user.name}</div>
                    <Avatar src={user.image} />
                </div>
                <div
                    className="
                        flex
                        flex-row
                        items-center
                        gap-4
                        font-light
                        text-neutral-500
                    "
                >
                    <div>
                        {roomCount} rooms
                    </div>
                    &middot;
                    <div>
                        {bathroomCount} bathrooms
                    </div>
                </div>
            </div>
            <hr />
            {category && (
                <ListingCategory
                    // icon={category.icon}
                    label={category.label}
                    description={category.description}
                />
            )}
            <hr />
            <div className="font-light text-neutral-500">
                {/* {description} */}
                {description.split("\n").map((item, index) => (
                    <p key={index} className="mb-3">{item}</p>
                ))}
            </div>
            <hr />
            <GoogleMap center={[latitude, longitude]} />
        </div>
    )
}

export default ListingInfo