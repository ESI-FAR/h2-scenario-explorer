function gisMap(distance) {


  // Reset any existing map:
  if (window.map instanceof ol.Map) {
    window.map.setTarget(null); // Remove the map from the DOM.
  }
  // Clear the map container.
  document.getElementById('map').innerHTML = '';

  // 1. Create the base map centered on the Netherlands.
  //    Use the external distance to set the initial KML file.
  const kmlLayer = new ol.layer.Vector({
    source: new ol.source.Vector({
      url: 'klm/' + distance + '_km.kml', // Use the default distance provided
      format: new ol.format.KML({
        extractStyles: true  // use styles defined in the KML if available
      })
    })
  });
  
  // Store the new map instance globally.
  window.map = new ol.Map({
    target: 'map',
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      }),
      kmlLayer
    ],
    view: new ol.View({
      center: ol.proj.fromLonLat([5.1013, 53.2126]),
      zoom: 6.5
    })
  });
  
  // 2. Define a highlight style function for mouseover.
  const highlightStyleFunction = function(feature) {
    const geomType = feature.getGeometry().getType();
    if (geomType === 'Point') {
      const currentStyle = feature.getStyle && feature.getStyle();
      let iconSrc = (currentStyle && currentStyle.getImage && currentStyle.getImage().getSrc())
                      || 'https://upload.wikimedia.org/wikipedia/commons/e/ec/RedDot.svg';
      return new ol.style.Style({
        image: new ol.style.Icon({
          src: iconSrc,
          scale: 0.08  // increased scale for hover effect
        })
      });
    } else if (geomType === 'Polygon' || geomType === 'MultiPolygon') {
      return new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: '#FF0000',
          width: 3
        }),
        fill: new ol.style.Fill({
          color: 'rgba(255, 0, 0, 0.1)'
        })
      });
    }
    return null;
  };
  
  // 3. Add a pointer-move interaction to highlight features on mouseover.
  const selectPointerMove = new ol.interaction.Select({
    condition: ol.events.condition.pointerMove,
    style: function(feature) {
      return highlightStyleFunction(feature);
    }
  });
  window.map.addInteraction(selectPointerMove);
  
  // 4. Add a click handler to display feature info.
  window.map.on('click', function(evt) {
    window.map.forEachFeatureAtPixel(evt.pixel, function(feature) {
      const featureName = feature.get('name') || 'Unnamed Feature';
      alert('Feature clicked: ' + featureName);
    });
  });
  
 
}
