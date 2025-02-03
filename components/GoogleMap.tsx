"use client";

import { useRef, useMemo } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

interface GoogleMapProps {
    center: number[];
}

const GoogleMapsComponent: React.FC<GoogleMapProps> = ({ center }) => {
    const mapContainerRef = useRef<HTMLDivElement>(null);

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    });

    const mapCenter = useMemo(() => ({ lat: center[0], lng: center[1] }), [center]);

    if (loadError) return <p>Error loading maps</p>;
    if (!isLoaded) return <p>Loading maps...</p>;

    return (
        <div ref={mapContainerRef} className="h-[35vh] rounded-lg">
            <GoogleMap
                mapContainerStyle={{ width: "100%", height: "100%" }}
                center={mapCenter}
                zoom={12}
            >
                <Marker position={mapCenter} />
            </GoogleMap>
        </div>
    );
};

export default GoogleMapsComponent;
