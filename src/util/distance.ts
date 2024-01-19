/**
 * author : Sudeera Madushan
 * date : 1/19/2024
 * project : food-delivery-back-end
 */
import axios from 'axios';

const BING_MAPS_API_KEY = 'AhTs1NKD6MM19FxIHxv3kseOeji1BrzSQfcutMcPm1xxa5delVftdkNjkOQRkZ0O';

export interface Location {
    latitude: number;
    longitude: number;
}

export async function getDistancesFromOrigin(origin: Location, destinations: Location[]): Promise<number[]> {
    const bingMapsApiUrl = 'https://dev.virtualearth.net/REST/v1/Routes/DistanceMatrix';

    const origins = `${origin.latitude},${origin.longitude}`;
    const destinationCoordinates = destinations.map((location) => `${location.latitude},${location.longitude}`).join(';');

    const params = {
        key: BING_MAPS_API_KEY,
        origins,
        destinations: destinationCoordinates,
        travelMode: 'driving', // You can adjust the travel mode based on your needs
        distanceUnit: 'km', // You can choose 'mi' for miles or 'km' for kilometers
    };

    try {
        const response = await axios.get(bingMapsApiUrl, { params });

        // Extract distances from the response
        const distances = response.data.resourceSets[0].resources[0].results.map((result: any) => result.travelDistance);

        return distances;
    } catch (error) {
        console.error('Error fetching distances from Bing Maps API:', error);
        throw error;
    }
}
