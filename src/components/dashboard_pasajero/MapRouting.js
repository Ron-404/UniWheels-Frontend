import React, { Component } from 'react';

export default class MapRouting extends Component {
    mapRef = React.createRef();
    state = {
        map: null
    };

    componentDidMount() {
        const H = window.H;
        const platform = new H.service.Platform({
            apikey: "t5F4KkchItOSCKZO3wWCQIKtAoIjmaZforgZxkdGKaw"
        });

        const defaultLayers = platform.createDefaultLayers();

        const map = new H.Map(
            this.mapRef.current,
            defaultLayers.vector.normal.map,
            {
                center: { lat: 4.782659, lng: -74.041970 },
                zoom: 10,
                pixelRatio: window.devicePixelRatio || 1
            }
        );
        var parisMarker = new H.map.Marker({lat: 4.782659, lng: -74.041970});
        map.addObject(parisMarker);

        // MapEvents enables the event system
        // Behavior implements default interactions for pan/zoom (also on mobile touch environments)
        // This variable is unused and is present for explanatory purposes
        const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

        // Create the default UI components to allow the user to interact with them
        // This variable is unused
        const ui = H.ui.UI.createDefault(map, defaultLayers);

        this.setState({ map });
    }

    componentWillUnmount() {
        this.state.map.dispose();
    }

    render() {
        return <div ref={this.mapRef} style={{ height: "250px",width: "270px" }} />;
    }
}