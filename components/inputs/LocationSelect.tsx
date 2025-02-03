"use client";

import Select from "react-select";
import useStates from "@/hooks/useStates";

export type StateSelectValue = {
    label: string;
    value: string;
    latitude: number;
    longitude: number;
}

interface LocationSelectProps {
    state?: StateSelectValue;
    onStateChange: (value: StateSelectValue) => void;
}

const LocationSelect: React.FC<LocationSelectProps> = ({
    state,
    onStateChange,
}) => {
    const { getAll } = useStates();

    return (
        <div className="flex flex-col gap-y-8">
            <Select
                placeholder="State"
                isClearable
                options={getAll()}
                value={state}
                onChange={(value) => onStateChange(value as StateSelectValue)}
                formatOptionLabel={(option: any) => (
                    <div className="flex flex-row items-center">
                        {option.label}
                    </div>
                )}
                classNames={{
                    control: () => 'p-3 border-2',
                    input: () => 'text-lg',
                    option: () => 'text-lg'
                }}
                theme={(theme) => ({
                    ...theme,
                    borderRadius: 6,
                    colors: {
                        ...theme.colors,
                        primary: 'black',
                        primary25: '#ffe4e6'
                    }
                })}
            />
        </div>
    )
}

export default LocationSelect