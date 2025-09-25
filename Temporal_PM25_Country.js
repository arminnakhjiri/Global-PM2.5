// -----------------------------
// PM2.5 monthly timeseries per country (2000–2021)
// -----------------------------

// Scale to µg/m³
var scale = function(image) {
  return image.multiply(0.1)
              .copyProperties(image, ['system:time_start', 'system:time_end'])
              .set('system:id', image.id());
}; 

// Load dataset & scale
var pm25_monthly = ee.ImageCollection('projects/sat-io/open-datasets/GLOBAL-SATELLITE-PM25/MONTHLY')
  .filterDate('2000-01-01', '2021-12-31')
  .select('b1')
  .map(scale);

// Country boundaries
var countries = ee.FeatureCollection('FAO/GAUL/2015/level0');

// Map layer
Map.addLayer(countries.style({color: '000000', fillColor: '00000000', width: 1}), {}, 'Countries');
Map.setCenter(0, 20, 2);

// Zonal mean function
var imageToCountryMeans = function(image) {
  var dateStr = image.date().format('YYYY-MM-dd');
  var reduced = image.reduceRegions({
    collection: countries,
    reducer: ee.Reducer.mean(),
    scale: 10000,
    tileScale: 4
  });
  reduced = reduced.map(function(f) {
    return f.set({
      'date': dateStr,
      'image_id': image.id(),
      'country_name': f.get('ADM0_NAME'),
      'country_code': f.get('ADM0_CODE'),
      'pm25_ug_m3': ee.Number(f.get('mean'))
    }).select(['country_name', 'country_code', 'date', 'pm25_ug_m3', 'image_id']);
  });
  return reduced; 
};

// Build full timeseries
var timeseriesFC = pm25_monthly.map(imageToCountryMeans).flatten();

// Preview
print('Sample', timeseriesFC.limit(20));

// Export to Drive
Export.table.toDrive({
  collection: timeseriesFC,
  description: 'PM25_monthly_country_timeseries_2000_2021',
  fileNamePrefix: 'PM25_monthly_country_timeseries_2000_2021',
  fileFormat: 'CSV'
});
