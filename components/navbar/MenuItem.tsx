"use client";

import { cn } from "@/lib/utils";

interface MenuItemProps {
    onClick: () => void;
    label: string;
    className?: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ onClick, label, className }) => {
    return (
        <div
            onClick={onClick}
            className={cn("px-4 py-3 hover:bg-neutral-100 transition", className)}
        >
            {label}
        </div>
    )
}

export default MenuItem