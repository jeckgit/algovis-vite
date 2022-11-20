import { AxiosResponse } from "axios";
import { httpClient } from "./http";

const END_POINT = "/map"

class MapService {
    /**
     * Get all Markers from Databse 
     * 
     * @returns 
     */
    getMarkers(): Promise<AxiosResponse<string>> {
        return httpClient.get(`${END_POINT}/markers`);
    }

    /**
     * Stores a Marker inside the database
     * 
     * @param marker Marker to be stored inside the DB
     * @returns 
     */
    storeMarker(position: { lat: number, lng: number }): Promise<AxiosResponse<string>> {
        return httpClient.post(`${END_POINT}/markers`, {
            position
        });
    }
}

export default new MapService();