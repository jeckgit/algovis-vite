import { LatLng, LatLngTuple } from "leaflet";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, LayerGroup } from 'react-leaflet'
import '../../style/Map.css';
import 'leaflet/dist/leaflet.css'
import { useState } from "react";


function MapListener({ addMarker }: { addMarker: Function }) {
    const map = useMapEvents({
        click: (location) => {
            addMarker(location.latlng)
            console.log(location.latlng);
        },
        contextmenu: () => {
            console.log("context Menu Kapp");
        }
    })

    return null;
}



function Maps() {
    const position: LatLngTuple = [51.02984, 13.70192];
    const mapHeight = 400;
    const [markers, setMarkers] = useState<LatLngTuple[]>([]);

    function addMarker(location: LatLng) {
        setMarkers([...markers, [location.lat, location.lng]]);
    };


    return (
        <div style={{ height: `${mapHeight}px` }}>
            <MapContainer style={{ height: "100%" }} center={position} zoom={20} scrollWheelZoom={true}>
                <TileLayer
                    attribution='Hello World'
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