var chai = require('chai');
var multiply = require('../index.js');
var expect = chai.expect;

describe('Multiply geojsons', function() {

  var geojsonA = {
    type: 'Feature',
    geometry: { type: 'Point', coordinates: [12, 43] },
    properties: { count: 5 }
  };

  var geojsonB = {
    type: 'Feature',
    geometry: { type: 'Point', coordinates: [13, 34] },
    properties: { count: 5 }
  };

  var geojsonC = {
    type: 'Feature',
    geometry: { type: 'LineString', coordinates: [[13, 34], [70, 60]] },
    properties: {}
  };

  it('It should return null if no geojson is provided.', function() {
    var result = multiply([]);
    expect(result).to.be.null;
  });

  it('It should return a Multi geometry feature if geojsons are given', function() {
    var result = multiply([geojsonA, geojsonB]);
    expect(result.geometry.type).to.equal('MultiPoint');
    expect(result.geometry.coordinates.length).to.equal(2);
  });

  it('It should return null if input geojsons are of different types', function() {
    var result = multiply([geojsonA, geojsonC]);
    expect(result).to.be.null;
  });

  it('It should return a geojson with property Count equal to 10', function() {
    var onEachFeature = function(properties, featureProp) {
      properties.count += featureProp.count;
      return properties;
    };

    var result = multiply([geojsonA, geojsonB], {
      properties: { count: 0 },
      onEachFeature: onEachFeature
    });

    expect(result.properties.count).to.equal(10);
  });

  it('It should return a multi type if a geojson feature collection is given', function() {
    var geojson = { 'type': 'FeatureCollection', 'features': [geojsonA, geojsonB] };
    var result = multiply(geojson);
    expect(result.geometry.type).to.equal('MultiPoint');
    expect(result.geometry.coordinates.length).to.equal(2);
  });

});
