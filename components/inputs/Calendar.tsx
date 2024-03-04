"use client";

interface CalendarProps {
    value: Range;
    onChange: (value: any) => void;
    disabledDates?: Date[]
}

const Calendar: React.FC<CalendarProps> = ({
    value,
    onChange,
    disabledDates
}) => {
    return (
        <div>Calendar</div>
    )
}

export default Calendar