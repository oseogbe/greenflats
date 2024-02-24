"use client";

import { useRouter } from "next/navigation";

const Logo = () => {
    const router = useRouter();

    return (
        // <Image
        //     src="/images/logo.png"
        //     alt="green flats logo"
        //     height="100"
        //     width="100"
        //     className="hidden md:block cursor-pointer"
        // />
        <h1 className="hidden md:block text-3xl font-bold cursor-pointer" onClick={() => router.push('/')}>
            <span className="text-green-700">Green</span>dest<span className="text-green-700">.</span>
        </h1>
    )
}

export default Logo