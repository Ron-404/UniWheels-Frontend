import React, { Component } from 'react';

import HPlatform, {
    HMap,
    HMapRoute,
    HMapMarker,
    HMapPolyLine
} from "react-here-map";

class MapRouting extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            shape: []
        }
    }

    render() {
        // Create the parameters for the routing request:
        var routeParams = {
            // The routing mode:
            mode: "fastest;car",
            // The start point of the route:
            waypoint0: "4.782705,-74.042735",
            // The end point of the route:
            waypoint1: "4.751075,-74.054736",
            // To retrieve the shape of the route we choose the route
            // representation mode 'display'
            representation: "display",
        };
        const routeLineOptions = {
            style: { strokeColor: "blue", lineWidth: 10 },
            arrows: { fillColor: "white", frequency: 2, width: 0.8, length: 0.7 },
        };
        
        const icon =
        '<svg width="24" height="24" ' +
        'xmlns="http://www.w3.org/2000/svg">' +
        '<rect stroke="white" fill="#1b468d" x="1" y="1" width="22" ' +
        'height="22" /><text x="12" y="18" font-size="12pt" ' +
        'font-family="Arial" font-weight="bold" text-anchor="middle" ' +
        'fill="white">H</text></svg>';
        
        // Handles manipulation of the path between the two points
        const RouteMarker = ({ map, platform, ui, route, key, routeShape }) => {
            // Retrieve the mapped positions of the requested waypoints:
            const startPoint = route.waypoint[0].mappedPosition;
            const endPoint = route.waypoint[1].mappedPosition;
        
            console.log("startPoint:",startPoint)
            console.log("endPoint:",endPoint)
            // Create a marker for the start point:
            const startMarker = { lat: startPoint.latitude, lng: startPoint.longitude };
            // Create a marker for the end point:
            const endMarker = { lat: endPoint.latitude, lng: endPoint.longitude };
        
            return (
            <React.Fragment>
                {console.log("startPoint:")}
                <HMapPolyLine points={routeShape} map={map} setViewBounds />
                <HMapMarker
                coords={startMarker}
                map={map}
                platform={platform}
                icon={icon}
                setViewBounds
                />
                <HMapMarker
                coords={endMarker}
                map={map}
                platform={platform}
                icon={icon}
                setViewBounds={false}
                />
            </React.Fragment>
            );
        };
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
                    mapOptions={{ center: { lat: 4.6359562, lng: -74.110048 },zoom:5 }}
                >
                    <HMapRoute
                    routeParams={routeParams}
                    icon={icon}
                    defaultDisplay
                    lineOptions={routeLineOptions}
                    >
                    <RouteMarker/>
                    </HMapRoute>
                </HMap>
            </HPlatform>
        )
    }
}

export default MapRouting;