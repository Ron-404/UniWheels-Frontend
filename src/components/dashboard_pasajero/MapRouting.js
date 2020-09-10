import React, { Component } from 'react';

import HPlatform, { HMap, HMapMarker } from "react-here-map";

import Swal from 'sweetalert2'

class MapRouting extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            shape: [],
            lat: 4.782503,
            lng: -74.042003
        }
    }

/*     open = (e)=>{
        Swal.fire('punto agregado', 'a agregado el punto x al mapa!!', 'success')
        //console.log("Map Pointer Down", e)
    }; */

    openMarker = (e)=>{
        Swal.fire('Ubicación ECI', 'Escuela Colombiana de Ingenieria Julio Garavito!!', 'success')
        console.log("Map Pointer Down", e)
    };

    render() {

        const markerIcon =
            '<svg width="24" height="24" ' +
            'xmlns="http://www.w3.org/2000/svg">' +
            '<rect stroke="white" fill="#1b468d" x="1" y="1" width="22" ' +
            'height="22" /><text x="12" y="18" font-size="12pt" ' +
            'font-family="Arial" font-weight="bold" text-anchor="middle" ' +
            'fill="white">H</text></svg>';
        return (
            <HPlatform
                app_id="brJ6TBcJKrZogyw9sYbT"
                apikey={"h7KGYvka383k_HIbgaUVPC3g0ub3Sr1Ja4reO5FKQXw"}
                useCIT
                useHTTPS
                interactive // Required for events
                includeUI
                includePlaces
                >
                <HMap
                    style={{
                    height: "200px",
                    width: "270px",
                    margin: "auto"
                    }}
                    mapOptions={{ center: { lat: 4.6359562, lng: -74.110048 },zoom:10 }}
                    useEvents // Required for events
                    // mapEvents={{ pointerdown: (e) => this.open(e) }} // event handlers
                >
                        <HMapMarker
                            coords={{ lat: this.state.lat, lng: this.state.lng }}
                            icon={markerIcon}
                            objectEvents={{
                                pointerdown: (e) => this.openMarker(e)}}
                            />
                </HMap>
            </HPlatform>
        )
    }
}

export default MapRouting;