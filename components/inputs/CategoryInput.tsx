"use client";

import { IconType } from "react-icons";

interface CategoryInputProps {
    // icon: IconType;
    label: string;
    description: string;
    selected?: boolean;
    onClick: (value: string) => void;
}

const CategoryInput: React.FC<CategoryInputProps> = ({
    // icon: Icon,
    label,
    description,
    selected,
    onClick
}) => {
    return (
        <div
            onClick={() => onClick(label)}
            className={`
                rounded-xl
                border-2
                p-4
                flex
                flex-col
                gap-3
                hover:border-black
                transition
                cursor-pointer
                ${selected ? 'border-black' : 'border-neutral-200'}
            `}
        >
            {/* <Icon size={30} /> */}
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-green-500 border border-neutral-500">{label.substring(0, 2)}</div>
            <div className="font-semibold">
                {label}
            </div>
            <div className="text-sm text-neutral-500">
                {description}
            </div>
        </div>
    )
}

export default CategoryInput