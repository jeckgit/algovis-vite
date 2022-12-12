import { LatLng, LatLngTuple } from "leaflet";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, LayerGroup } from 'react-leaflet'
import '../../style/Map.css';
import 'leaflet/dist/leaflet.css'
import { useEffect, useState } from "react";
import { Marker as MarkerType } from "../../models/Marker";
import MapService from "../../services/http-services/MapService";
import { Box, Button, IconButton, Collapse } from '@mui/material';
import ImageListComponent from "../maps/ImageListComponent";
import { createSvgIcon } from '@mui/material/utils';


function MapListener({ addMarker }: { addMarker: Function }) {

    async function storeMarker(latlng: { lat: number, lng: number }) {
        try {
            const res = await MapService.storeMarker(latlng);
            const marker = res.data;
            addMarker(marker);
            // ToDo: normaly we have to add the new val in markser list, to get the id
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
    const mapHeight = 'calc( 100vh - 160px )';
    const [markers, setMarkers] = useState<Partial<MarkerType>[]>([]);
    const [showGalery, setShowGalery] = useState<boolean>(false);


    const ArrowCollapseLeft = createSvgIcon(
        <path fill="currentColor" d="M11.92,19.92L4,12L11.92,4.08L13.33,5.5L7.83,11H22V13H7.83L13.34,18.5L11.92,19.92M4,12V2H2V22H4V12Z" />,
        'ArrowCollapseLeft',
    );

    const ArrowCollapseRight = createSvgIcon(
        <path fill="currentColor" d="M12.08,4.08L20,12L12.08,19.92L10.67,18.5L16.17,13H2V11H16.17L10.67,5.5L12.08,4.08M20,12V22H22V2H20V12Z" />,
        'ArrowCollapseRight',
    );



    function addMarker(marker: MarkerType) {
        setMarkers([...markers, marker]);
    };

    async function deleteMarker(markerId: number) {
        try {
            const res = await MapService.deleteMarker(markerId);
            // remove marker from list
            setMarkers(markers.filter((marker) => marker.id != markerId))
            console.log(res.data);

        } catch (err) {
            console.log(err);
        }
        // Send delete marker
    };

    async function loadMarkers() {
        try {
            const res = await MapService.getMarkers();
            const markers = res.data;
            setMarkers(markers);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        loadMarkers();
    }, [])



    return (
        <>
            <div style={{ display: "flex", flexDirection: "row" }}>
                <Box sx={{ typography: 'h4' }}>This will be the Map</Box>
                <IconButton sx={{ ml: "auto", height: 36 }} onClick={() => setShowGalery(!showGalery)}>
                    {showGalery ? <ArrowCollapseRight /> : <ArrowCollapseLeft />}
                </IconButton>
            </div>
            <Box sx={{ display: 'flex', flexDirection: 'row', height: `${mapHeight}` }}>
                <MapContainer style={{ height: "100%", width: "100%", marginRight: "10px" }} center={position} zoom={20} scrollWheelZoom={true}>
                    <TileLayer
                        attribution="Julis Map"
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <LayerGroup>
                        {
                            markers.map((marker, idx) =>
                                <Marker key={'marker-' + idx} position={marker}>
                                    <Popup>
                                        <Button variant="contained" onClick={() => deleteMarker(marker.id)}>Löschen</Button>
                                    </Popup>
                                </Marker>
                            )
                        }
                    </LayerGroup>
                    <MapListener addMarker={addMarker} />
                </MapContainer>

                {/* showGalery && */}
                <div>
                    <Collapse sx={{ minWidth: 'inherit' }} in={showGalery} orientation="horizontal">

                        <ImageListComponent />

                    </Collapse>
                </div>

            </Box>
        </>
    )
}

export default Maps;