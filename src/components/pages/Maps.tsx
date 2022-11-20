import { LatLng, LatLngTuple } from "leaflet";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, LayerGroup } from 'react-leaflet'
import '../../style/Map.css';
import 'leaflet/dist/leaflet.css'
import { useEffect, useState } from "react";
import MapService from "../../services/http-services/MapService";

function MapListener({ addMarker }: { addMarker: Function }) {

    async function storeMarker(latlng: { lat: number, lng: number }) {
        try {
            const res = await MapService.storeMarker(latlng);
            console.log(res.data);
        } catch (err) {
            console.log(err);
        }

    }

    const map = useMapEvents({
        click: (location) => {
            addMarker(location.latlng)
            storeMarker(location.latlng);
        },
        contextmenu: () => {
            console.log("context Menu Kapp");
        }
    })

    return null;
}



function Maps() {
    const position: LatLngTuple = [51.02984, 13.70192];
    const mapHeight = 'calc( 100vh - 120px )';
    const [markers, setMarkers] = useState<LatLngTuple[]>([]);

    function addMarker(location: LatLng) {
        setMarkers([...markers, [location.lat, location.lng]]);
    };

    async function loadMarkers() {
        try {
            const res = await MapService.getMarkers();
            console.log(res.data);
        } catch (err) {
            console.log(err);
        } 
    };
    
    useEffect(() => {
        loadMarkers();
    }, [])



    return (
        <div style={{ height: `${mapHeight}` }}>
            <MapContainer style={{ height: "100%" }} center={position} zoom={20} scrollWheelZoom={true}>
                <TileLayer
                    attribution="Julis Map"
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LayerGroup>
                    {
                        markers.map((markerPos, idx) =>
                            <Marker key={'marker-' + idx} position={markerPos}>
                                <Popup>
                                    Hello World
                                </Popup>
                            </Marker>
                        )
                    }
                </LayerGroup>
                <MapListener addMarker={addMarker} />

            </MapContainer>
        </div>
    )
}

export default Maps;