import { NextResponse } from "next/server"

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)

    const input = searchParams.get("input")

    if (!input) {
        return NextResponse.json({ error: "Missing input parameter" }, { status: 400 })
    }

    try {
        const response = await fetch(
            `https://places.googleapis.com/v1/places:searchText`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-Goog-Api-Key": process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
                    "X-Goog-FieldMask": "places.displayName.text,places.formattedAddress,places.addressComponents,places.location"
                },
                body: JSON.stringify({
                    textQuery: input
                })
            }
        )

        const data = await response.json()
        return NextResponse.json(data)
    } catch (error) {
        return NextResponse.json({ error: "Error fetching places" }, { status: 500 })
    }
}
