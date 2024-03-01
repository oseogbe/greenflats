"use client";

import Select from "react-select";
import useStates from "@/hooks/useStates";

export type StateSelectValue = {
    label: string;
    value: string;
    latitude: number;
    longitude: number;
}

export type LGASelectValue = {
    label: string;
    value: string;
}

export type AreaSelectValue = {
    label: string;
    value: string;
}

interface LocationSelectProps {
    state?: StateSelectValue;
    lga?: LGASelectValue;
    area?: AreaSelectValue;
    onStateChange: (value: StateSelectValue) => void;
    onLGAChange: (value: LGASelectValue) => void;
    onAreaChange: (value: AreaSelectValue) => void;
}

const LocationSelect: React.FC<LocationSelectProps> = ({
    state,
    lga,
    area,
    onStateChange,
    onLGAChange,
    onAreaChange
}) => {
    const { getAll, getLGAs, getAreas } = useStates();

    return (
        <div className="flex flex-col gap-y-4">
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
            {
                state && (
                    <Select
                        placeholder="LGA"
                        isClearable
                        options={getLGAs(state.label)}
                        value={lga}
                        onChange={(value) => onLGAChange(value as LGASelectValue)}
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
                )
            }
            {
                state && lga && (
                    <Select
                        placeholder="Area"
                        isClearable
                        options={getAreas(state.label, lga.label)}
                        value={area}
                        onChange={(value) => onAreaChange(value as AreaSelectValue)}
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
                )
            }
        </div>
    )
}

export default LocationSelect