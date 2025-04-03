window.onload = function() {
    // 1. Create the base map centered on the Netherlands.
    const map = new ol.Map({
      target: 'map',
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        }),
        // 2. Load the KML file containing wind farm data.
        new ol.layer.Vector({
          source: new ol.source.Vector({
            url: '50_100_km.kml',
            format: new ol.format.KML({
              extractStyles: true  // use styles defined in the KML if available
            })
          })
        })
      ],
      view: new ol.View({
        center: ol.proj.fromLonLat([5.1013, 53.2126]),
        zoom: 6.5
      })
    });
    
    // 3. Define a highlight style function for mouseover.
    //    For points, we increase the scale; for polygons we change stroke and fill.
    const highlightStyleFunction = function(feature) {
      const geomType = feature.getGeometry().getType();
      if (geomType === 'Point') {
        // Use the current icon source if available, or fallback to a red dot.
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
      // For other geometry types, return no custom highlight.
      return null;
    };
    
    // 4. Add a pointer-move interaction to highlight features on mouseover.
    const selectPointerMove = new ol.interaction.Select({
      condition: ol.events.condition.pointerMove,
      style: function(feature) {
        return highlightStyleFunction(feature);
      }
    });
    map.addInteraction(selectPointerMove);
    
    // 5. Add a click handler to display feature info.
    map.on('click', function(evt) {
      map.forEachFeatureAtPixel(evt.pixel, function(feature) {
        const featureName = feature.get('name') || 'Unnamed Feature';
        alert('Feature clicked: ' + featureName);
      });
    });
  };