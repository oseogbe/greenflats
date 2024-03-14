"use client";

import { useRouter } from "next/navigation";

import { IoChevronBackOutline } from "react-icons/io5";

const ArrowBack = () => {
    const router = useRouter();

    return (
        <div
            onClick={() => router.push('/')}
            className="
                relative
                hover:opacity-80
                transition
                cursor-pointer
                p-1
                rounded-full
                bg-white
                border
                border-neutral-200
            "
        >
            <IoChevronBackOutline
                size={28}
                className="text-neutral-500 -top-[2px]"
            />
        </div>
    )
}

export default ArrowBack