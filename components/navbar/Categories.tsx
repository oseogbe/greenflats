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
        description: 'State of the art apartment buildings, duplexes and contemporary living spaces with sleek designs and modern amenities.'
    },
    {
        label: 'Trending',
        icon: VscFlame,
        description: 'Stay updated with the latest and most popular properties in the market.'
    },
    {
        label: 'Shortlet',
        icon: MdOutlineBedroomParent,
        description: 'Find temporary accommodations perfect for short stays, whether for vacations, business trips, or short-term rentals.'
    },
    {
        label: 'Hotel',
        icon: BiHotel,
        description: 'Explore a variety of hotel accommodations ranging from budget-friendly to luxury options for your next getaway.'
    },
    {
        label: 'Luxury',
        icon: IoDiamondOutline,
        description: 'Indulge in lavish and exclusive properties with high-end amenities and stunning architecture for a truly luxurious experience.'
    },
    {
        label: 'Café',
        icon: IoCafeOutline,
        description: 'Discover charming cafe spaces ideal for starting your own business or finding the perfect spot to relax and unwind.'
    },
    {
        label: 'Outdoor',
        icon: TbBeach,
        description: 'Explore properties nestled in nature or with outdoor amenities such as gardens, pools, or beachfront locations.'
    },
    {
        label: 'Museum',
        icon: GiDramaMasks,
        description: 'Find unique properties with historical significance or cultural relevance, perfect for museums, galleries, or cultural centers.'
    },
    {
        label: 'Art Gallery',
        icon: HiOutlinePaintBrush,
        description: 'Browse spaces designed to showcase art, whether as galleries, studios, or creative workspaces.'
    },
    {
        label: 'Cinema',
        icon: PiPopcornDuotone,
        description: 'Discover properties suitable for cinemas, theaters, or entertainment venues, perfect for movie screenings or live performances.'
    },
    {
        label: 'Restaurant',
        icon: RiRestaurantLine,
        description: 'Explore spaces ideal for restaurants, cafes, or dining establishments, with options ranging from cozy bistros to fine dining experiences.'
    },
    {
        label: 'Gym',
        icon: LiaDumbbellSolid,
        description: 'Find spaces tailored for fitness centers, gyms, or wellness studios, equipped with state-of-the-art facilities for workouts and training.'
    },
    {
        label: 'Lounge',
        icon: LiaCocktailSolid,
        description: 'Discover stylish and comfortable lounge spaces perfect for socializing, relaxing, or hosting events.'
    },
    {
        label: 'Spar',
        icon: TbMassage,
        description: 'Explore properties suitable for spas, wellness centers, or retreats, designed to promote relaxation, rejuvenation, and self-care.'
    },
];

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