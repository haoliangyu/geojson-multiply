
# geojson-multiply

Multiply single type geojsons into a multi type geojson

## Install

```
npm install geojson-multiply
```

## How to Use

`geojson-multiply` provides following function:

* `multiply(geojsons[, options])`

Where,

* `geojson` - a geojson feauture, an array of geojson features, or a geojson feature collection

* `options` - some additional options for property aggregation:

  * `properties` - the default properties of result geojson

  * `onEachFeature` - a function to aggregate properties. It has four parameters:

    * `properties` - the result geojson's properties

    * `featureProp` - input feature geojson's properties

    * `index` - input feature geojson's index in the array

    * `geojsons` - geojson array.

    Similar to [reduce()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce).

If successes, the function will return a feature geojson with Multi geometry type.

If fails, the function will return a `null`.

## Example

``` javascript

var multiply = require('geojson-multiply');

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

var onEachFeature = function(properties, featureProp) {
  properties.count += featureProp.count;
  return properties;
};

var result = multiply([geojsonA, geojsonB], {
  properties: { count: 0 },
  onEachFeature: onEachFeature
});

/**
The reuslt geojson should be
{
  type: 'Feature'
  geometry: {
    type: 'MultiPoint',
    coordinates: [[12, 43], [14, 34]]
  },
  properties: {
    count: 10
  }
}
*/

```
