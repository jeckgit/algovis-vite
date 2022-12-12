import { AxiosResponse } from "axios";
import { Marker } from "../../models/Marker";
import { httpClient } from "./http";

const END_POINT = "/map"

class MapService {
    /**
     * Get all Markers from Databse 
     * 
     * @returns 
     */
    getMarkers(): Promise<AxiosResponse<Marker[]>> {
        return httpClient.get(`${END_POINT}/markers`);
    }

    /**
     * Stores a Marker inside the database
     * 
     * @param marker Marker to be stored inside the DB
     * @returns 
     */
    storeMarker(position: { lat: number, lng: number }): Promise<AxiosResponse<Marker>> {
        return httpClient.post(`${END_POINT}/markers`, {
            position
        });
    }

    /**
     * Deletes a Marler inside the database
     * 
     * @param markerId Id of the marker to be deleted
     * @returns 
     */
    deleteMarker(markerId: number) {
        return httpClient.delete(`${END_POINT}/markers/${markerId}`);
    }
}

export default new MapService();