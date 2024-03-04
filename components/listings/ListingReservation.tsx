"use client";

import Calendar from "../inputs/Calendar";

// import { Range } from "react-date-range";

interface ListingReservationProps {
    price: number;
    dateRange: any;
    totalPrice: number;
    onChangeDate: (value: any) => void;
    onSubmit: () => void;
    disabled?: boolean;
    disabledDates: Date[];
}

const ListingReservation: React.FC<ListingReservationProps> = ({
    price,
    dateRange,
    totalPrice,
    onChangeDate,
    onSubmit,
    disabled,
    disabledDates
}) => {
    return (
        <div
            className="
                bg-whtie
                rounded-xl
                border-[1px]
                border-neutral-200
                overflow-hidden
            "
        >
            <div className="flex flex-row items-center gap-1 p-4">
                <div className="text-2xl font-semibold">
                    &#8358; {price}
                </div>
                <div className="font-light text-neutral-600">
                    / night
                </div>
            </div>
            <hr />
            <Calendar
                value={dateRange}
                disabledDates={disabledDates}
                onChange={(value) => onChangeDate(value.selection)}
            />
        </div>
    )
}

export default ListingReservation