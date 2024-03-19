"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { IconType } from "react-icons";
import qs from "query-string";
import Image from "next/image";

interface CategoryBoxProps {
  label: string;
  // icon: IconType;
  icon?: string;
  selected?: boolean;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
  label,
  // icon: Icon,
  icon,
  selected
}) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      category: label
    }

    if (params?.get('category') === label) {
      delete updatedQuery.category;
    }

    const url = qs.stringifyUrl({
      url: '/',
      query: updatedQuery
    }, { skipNull: true })

    router.push(url);

  }, [label, params, router]);

  return (
    <div
      onClick={handleClick}
      className={`
        flex
        flex-col
        items-center
        justify-center
        gap-2
        p-3
        border-b-2
        hover:text-neutral-800
        transition
        cursor-pointer
        ${selected ? 'border-b-neutral-800 text-neutral-800' : 'border-transparent text-neutral-500'}
      `}
    >
      {/* <Icon size={26} /> */}
      {/* 
      <Image
        src={icon}
        height={24}
        width={24}
        alt="property type icon"
      />
      */}
      <div className="w-10 h-10 rounded-full flex items-center justify-center text-green-500 border border-neutral-500">{label.substring(0, 2)}</div>
      <div className="w-max font-medium text-sm">
        {label}
      </div>
    </div>
  )
}

export default CategoryBox
