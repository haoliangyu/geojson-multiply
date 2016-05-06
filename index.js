function multiply(geojsons, options) {

  if (!geojsons) {
    return null;
  }

  if (geojsons.type === 'FeatureCollection') {
    geojsons = geojsons.features;
  }

  if (Array.isArray(geojsons) && geojsons.length === 0) {
    return null;
  }

  if (!Array.isArray(geojsons)) {
    geojsons = [geojsons];
  }

  var properties, onEachFeature;
  if (options) {
    properties = options.properties || {};
    onEachFeature = options.onEachFeature;
  } else {
    properties = {};
  }

  var geomType = geojsons[0].geometry.type;
  var result = {
    type: 'Feature',
    geometry: { coordinates: [] },
    properties: properties
  };

  switch(geomType) {
    case 'Point':
    case 'LineString':
    case 'Polygon':
      result.geometry.type = 'Multi' + geomType;
      break;
    default:
      return null;
  }

  for (var i = 0, n = geojsons.length; i < n; i++) {

    var geojson = geojsons[i];

    if (geojson.geometry.type !== geomType) { return null; }

    result.geometry.coordinates.push(geojson.geometry.coordinates);

    if (onEachFeature) {
      result.properties = onEachFeature(properties, geojson.properties, i, geojsons);
    }
  }

  return result;
}

module.exports = multiply;
