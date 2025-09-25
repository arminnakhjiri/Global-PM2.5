// PM2.5 monthly time-series per country, yearly exports

// Scale raw PM2.5 to μg/m³
var scale = function(image) {
  return image.multiply(0.1)
              .copyProperties(image, ['system:time_start', 'system:time_end'])
              .set('system:id', image.id());
};

// Load and scale Global Monthly PM2.5 dataset
var pm25_monthly = ee.ImageCollection('projects/sat-io/open-datasets/GLOBAL-SATELLITE-PM25/MONTHLY')
  .filterDate('2000-01-01', '2021-12-31')
  .select('b1')
  .map(scale);

// Load country boundaries
var countries = ee.FeatureCollection('FAO/GAUL/2015/level0');

// Compute zonal mean for a single image
var imageToCountryMeans = function(image) {
  var dateStr = image.date().format('YYYY-MM-dd');
  var reduced = image.reduceRegions({
    collection: countries,
    reducer: ee.Reducer.mean(),
    scale: 10000,
    tileScale: 4
  });
  return reduced.map(function(f) {
    return f.set({
      'date': dateStr,
      'country_name': f.get('ADM0_NAME'),
      'country_code': f.get('ADM0_CODE'),
      'pm25_ug_m3': ee.Number(f.get('mean'))
    }).select(['country_name', 'country_code', 'date', 'pm25_ug_m3']);
  });
};

// Split export by year to avoid size limit
var years = ee.List.sequence(2000, 2021);

years.evaluate(function(yrList) {
  yrList.forEach(function(y) {
    var yearly = pm25_monthly
      .filterDate(ee.Date.fromYMD(y, 1, 1), ee.Date.fromYMD(y, 12, 31))
      .map(imageToCountryMeans)
      .flatten();

    // Preview first 10 rows
    print('Year ' + y + ' sample', yearly.limit(10));

    // Export yearly data to Drive
    Export.table.toDrive({
      collection: yearly,
      description: 'PM25_monthly_country_timeseries_' + y,
      fileNamePrefix: 'PM25_monthly_country_timeseries_' + y,
      fileFormat: 'CSV'
    });
  });
});

// Notes:
// - Each CSV has ≈ number_of_countries × 12 rows per year.
// - Adjust scale for higher resolution, but expect longer processing.
// - Start tasks manually in Earth Engine Tasks tab.
