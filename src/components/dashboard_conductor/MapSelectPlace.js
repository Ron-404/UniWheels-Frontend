import React, { Component } from 'react';


export default class MapSelectPlace extends Component {
    mapRef = React.createRef();
    constructor(props) {
        super(props);
        this.state = {
            map: null,
            lugar:this.props.lugar
        };

    }

    addDraggableMarker = (map, behavior) => {
        const lugar = this.state.lugar;
        const H = window.H;
        var marker = new H.map.Marker({ lat: lugar.lat, lng: lugar.lng }, {
            // mark the object as volatile for the smooth dragging
            volatility: true
        });
        // Ensure that the marker can receive drag events
        marker.draggable = true;
        map.addObject(marker);

        // disable the default draggability of the underlying map
        // and calculate the offset between mouse and target's position
        // when starting to drag a marker object:
        map.addEventListener('dragstart', function (ev) {
            var target = ev.target,
                pointer = ev.currentPointer;
            if (target instanceof H.map.Marker) {
                var targetPosition = map.geoToScreen(target.getGeometry());
                target['offset'] = new H.math.Point(pointer.viewportX - targetPosition.x, pointer.viewportY - targetPosition.y);
                behavior.disable();
            }
        }, false);


        // re-enable the default draggability of the underlying map
        // when dragging has completed
        map.addEventListener('dragend', function (ev) {
            var target = ev.target,
                pointer = ev.currentPointer;
            if (target instanceof H.map.Marker) {
                behavior.enable();
                console.log("posicion escogida", map.screenToGeo(pointer.viewportX - target['offset'].x, pointer.viewportY - target['offset'].y))
            }
        }, false);

        // Listen to the drag event and move the position of the marker
        // as necessary
        map.addEventListener('drag', function (ev) {
            var target = ev.target,
                pointer = ev.currentPointer;
            if (target instanceof H.map.Marker) {
                target.setGeometry(map.screenToGeo(pointer.viewportX - target['offset'].x, pointer.viewportY - target['offset'].y));
            }
        }, false);

        this.setState({ map });
    }

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

        // MapEvents enables the event system
        // add a resize listener to make sure that the map occupies the whole container
        window.addEventListener('resize', () => map.getViewPort().resize());
        // Behavior implements default interactions for pan/zoom (also on mobile touch environments)
        // This variable is unused and is present for explanatory purposes
        const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

        // Create the default UI components to allow the user to interact with them
        // This variable is unused
        const ui = H.ui.UI.createDefault(map, defaultLayers);

        this.addDraggableMarker(map, behavior);

        this.setState({ map });

    }

    componentWillUnmount(props) {
        this.setState({ map : null });
    }

    render() {
        return <div ref={this.mapRef} style={{ height: "250px", width: "370px" }} />;
    }
}