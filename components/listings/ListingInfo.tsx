"use client";

import useStates from "@/hooks/useStates";

import { IconType } from "react-icons";
import { SafeUser } from "@/types";

import Avatar from "../Avatar";
import ListingCategory from "./ListingCategory";
import Map from "../Map";

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
    state: string;
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
    state,
}) => {
    const { getByValue } = useStates();

    const { latitude, longitude } = getByValue(state);

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
            <div className="text-lg font-light text-neutral-500">
                {description}
            </div>
            <hr />
            <Map center={[latitude, longitude]} />
        </div>
    )
}

export default ListingInfo