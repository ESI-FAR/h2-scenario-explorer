window.onload = function() {
    const map = new ol.Map({
        target: 'map',
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM()
            })
        ],
        view: new ol.View({
            center: ol.proj.fromLonLat([5.2913, 52.1326]),  // Center on the Netherlands
            zoom: 7
        })
    });
};