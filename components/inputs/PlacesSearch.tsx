"use client"

import { useState, useEffect } from "react"
import { useDebounce } from "use-debounce"

interface PlacesSearchProps {
    location: any
    onSelect: (place: any) => void
}

const PlacesSearch = ({
    location,
    onSelect
}: PlacesSearchProps) => {
    const [options, setOptions] = useState<any[]>([])
    const [query, setQuery] = useState<string>("")
    const [debouncedQuery] = useDebounce(query, 500)

    useEffect(() => {
        const fetchPlaces = async (input: string) => {
            if (!input) return

            try {
                const response = await fetch(`/api/find-places?input=${input}`)
                const data = await response.json()

                if (data.places) {
                    const formattedOptions = data.places.map((place: any) => ({
                        id: place.id,
                        displayName: place.displayName.text,
                        formattedAddress: place.formattedAddress,
                        addressComponents: place.addressComponents,
                        latitude: place.location.latitude,
                        longitude: place.location.longitude
                    }))

                    setOptions(formattedOptions)
                }
            } catch (error) {
                console.error("Error fetching places:", error)
                setOptions([])
            }
        }

        if (debouncedQuery.length > 2) {
            fetchPlaces(debouncedQuery)
        }
    }, [debouncedQuery])

    const handleSelect = (option: any) => {
        setQuery(option.displayName)
        onSelect(option)
        setOptions([])
    }

    return (
        <div>
            <input
                type="text"
                value={location ? location.displayName : query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search location..."
                className="w-full p-3 border-2 text-lg rounded-md"
            />
            {options.length > 0 && (
                <ul className="border-2 rounded-md">
                    {options.map((option) => (
                        <li
                            key={option.id}
                            onClick={() => handleSelect(option)}
                            className="p-2 cursor-pointer hover:bg-gray-200"
                        >
                            {option.displayName}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default PlacesSearch
