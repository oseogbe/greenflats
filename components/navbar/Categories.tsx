"use client";

import { usePathname, useSearchParams } from "next/navigation";

import Container from "../Container";
import CategoryBox from "../CategoryBox";

// export const categories = [
//     {
//         label: 'Modern',
//         icon: MdOutlineVilla,
//         description: 'State of the art apartment buildings, duplexes and contemporary living spaces with sleek designs and modern amenities.'
//     },
//     {
//         label: 'Trending',
//         icon: VscFlame,
//         description: 'Stay updated with the latest and most popular properties in the market.'
//     },
//     {
//         label: 'Shortlet',
//         icon: MdOutlineBedroomParent,
//         description: 'Find temporary accommodations perfect for short stays, whether for vacations, business trips, or short-term rentals.'
//     },
//     {
//         label: 'Hotel',
//         icon: BiHotel,
//         description: 'Explore a variety of hotel accommodations ranging from budget-friendly to luxury options for your next getaway.'
//     },
//     {
//         label: 'Luxury',
//         icon: IoDiamondOutline,
//         description: 'Indulge in lavish and exclusive properties with high-end amenities and stunning architecture for a truly luxurious experience.'
//     },
//     {
//         label: 'Café',
//         icon: IoCafeOutline,
//         description: 'Discover charming cafe spaces ideal for starting your own business or finding the perfect spot to relax and unwind.'
//     },
//     {
//         label: 'Outdoor',
//         icon: TbBeach,
//         description: 'Explore properties nestled in nature or with outdoor amenities such as gardens, pools, or beachfront locations.'
//     },
//     {
//         label: 'Museum',
//         icon: GiDramaMasks,
//         description: 'Find unique properties with historical significance or cultural relevance, perfect for museums, galleries, or cultural centers.'
//     },
//     {
//         label: 'Art Gallery',
//         icon: HiOutlinePaintBrush,
//         description: 'Browse spaces designed to showcase art, whether as galleries, studios, or creative workspaces.'
//     },
//     {
//         label: 'Cinema',
//         icon: PiPopcornDuotone,
//         description: 'Discover properties suitable for cinemas, theaters, or entertainment venues, perfect for movie screenings or live performances.'
//     },
//     {
//         label: 'Restaurant',
//         icon: RiRestaurantLine,
//         description: 'Explore spaces ideal for restaurants, cafes, or dining establishments, with options ranging from cozy bistros to fine dining experiences.'
//     },
//     {
//         label: 'Gym',
//         icon: LiaDumbbellSolid,
//         description: 'Find spaces tailored for fitness centers, gyms, or wellness studios, equipped with state-of-the-art facilities for workouts and training.'
//     },
//     {
//         label: 'Lounge',
//         icon: LiaCocktailSolid,
//         description: 'Discover stylish and comfortable lounge spaces perfect for socializing, relaxing, or hosting events.'
//     },
//     {
//         label: 'Spar',
//         icon: TbMassage,
//         description: 'Explore properties suitable for spas, wellness centers, or retreats, designed to promote relaxation, rejuvenation, and self-care.'
//     },
// ];

export const categories = [
    {
        label: 'Apartment',
        description: 'Compact living spaces typically found in multi-story buildings, offering convenience and often shared amenities.'
    },
    {
        label: 'Bungalow',
        description: 'Single-story homes with open floor plans and a cozy atmosphere, ideal for small families or retirees.'
    },
    {
        label: 'Condo',
        description: 'Individual units within a larger building, offering a blend of privacy and communal living with shared amenities and maintenance.	'
    },
    {
        label: 'Duplex',
        description: 'A two-unit residential property with separate entrances, offering privacy while still sharing a structure.'
    },
    {
        label: 'Luxury',
        description: 'High-end properties with premium features, lavish amenities, and exclusive designs for affluent buyers.'
    },
    {
        label: 'Miniflat',
        description: 'Compact, self-contained living spaces typically suitable for singles or couples, offering basic amenities in a small footprint.'
    },
    {
        label: 'Mansion',
        description: 'Grand, opulent residences typically featuring extensive grounds, multiple levels, and luxurious amenities, designed for affluent buyers seeking prestige and space'
    },
    {
        label: 'Penthouse',
        description: 'Luxurious residences situated on the top floors of buildings, offering breathtaking views, upscale amenities, and exclusivity.'
    },
    {
        label: 'Shortlet',
        description: 'Temporary accommodations available for short-term stays, suitable for travelers or individuals seeking temporary housing solutions.'
    },
    {
        label: 'Townhouse',
        description: 'Multi-story homes with shared walls, offering a blend of suburban living and urban convenience, often featuring private outdoor spaces.'
    },
    {
        label: 'Trending',
        description: 'Properties garnering significant attention and interest due to unique features, location, or market demand.'
    },
    {
        label: 'Villa',
        description: 'Spacious, luxurious homes typically set in expansive grounds, offering privacy, exclusivity, and upscale amenities.'
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
                    gap-x-12
                    overflow-x-auto
                "
            >
                {
                    categories.map(item => (
                        <CategoryBox
                            key={item.label}
                            label={item.label}
                            selected={category === item.label}
                            icon=""
                        />

                    ))
                }
            </div>
        </Container>
    )
}

export default Categories
