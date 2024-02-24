"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { MdOutlineBedroomParent, MdOutlineVilla } from "react-icons/md";
import { GiTribalMask } from "react-icons/gi";
import { RiRestaurantLine } from "react-icons/ri";
import { TbBeach, TbMassage } from "react-icons/tb";
import { LiaCocktailSolid } from "react-icons/lia";
import { IoCafeOutline, IoDiamond } from "react-icons/io5";
import { BiHotel, } from "react-icons/bi";
import { VscFlame } from "react-icons/vsc";
import { CgGym } from "react-icons/cg";

import Container from "../Container";
import CategoryBox from "../CategoryBox";

export const categories = [
    {
        label: 'Modern',
        icon: MdOutlineVilla,
    },
    {
        label: 'Trending',
        icon: VscFlame,
    },
    {
        label: 'Shortlet',
        icon: MdOutlineBedroomParent,
    },
    {
        label: 'Hotel',
        icon: BiHotel,
    },
    {
        label: 'Luxury',
        icon: IoDiamond,
    },
    {
        label: 'Café',
        icon: IoCafeOutline,
    },
    {
        label: 'Outdoor',
        icon: TbBeach,
    },
    {
        label: 'Museum',
        icon: GiTribalMask
    },
    {
        label: 'Restaurant',
        icon: RiRestaurantLine
    },
    {
        label: 'Gym',
        icon: CgGym,
    },
    {
        label: 'Lounge',
        icon: LiaCocktailSolid,
    },
    {
        label: 'Spar',
        icon: TbMassage,
    },
]

const Categories = () => {
    const params = useSearchParams();
    const category = params?.get('category');
    const pathname = usePathname();

    const isMainPage = pathname === '/';

    if (!isMainPage) {
        return null;
    }

    return (
        <Container>
            <div
                className="
                    pt-4
                    flex
                    flex-row
                    items-center
                    justify-between
                    overflow-x-auto
                "
            >
                {
                    categories.map(item => (
                        <CategoryBox
                            key={item.label}
                            label={item.label}
                            selected={category === item.label}
                            icon={item.icon}
                        />

                    ))
                }
            </div>
        </Container>
    )
}

export default Categories