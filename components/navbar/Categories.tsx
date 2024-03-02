"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { MdOutlineBedroomParent, MdOutlineVilla } from "react-icons/md";
import { IoCafeOutline, IoDiamondOutline } from "react-icons/io5";
import { HiOutlinePaintBrush } from "react-icons/hi2";
import { TbBeach, TbMassage } from "react-icons/tb";
import { LiaCocktailSolid, LiaDumbbellSolid } from "react-icons/lia";
import { RiRestaurantLine } from "react-icons/ri";
import { PiPopcornDuotone } from "react-icons/pi";
import { GiDramaMasks } from "react-icons/gi";
import { VscFlame } from "react-icons/vsc";
import { BiHotel, } from "react-icons/bi";

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
        icon: IoDiamondOutline,
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
        icon: GiDramaMasks,
    },
    {
        label: 'Art Gallery',
        icon: HiOutlinePaintBrush,
    },
    {
        label: 'Cinema',
        icon: PiPopcornDuotone,
    },
    {
        label: 'Restaurant',
        icon: RiRestaurantLine,
    },
    {
        label: 'Gym',
        icon: LiaDumbbellSolid,
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