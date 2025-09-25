// -----------------------------
// PM2.5 YEARLY IMAGES (2000–2021) AS ONE MULTIBAND IMAGE
// -----------------------------

// Scaling function to convert raw PM2.5 to μg/m³
var scale = function(image) {
  var year = ee.Date(image.get('system:time_start')).get('year');
  return image.multiply(0.1)
              .rename(ee.String('PM25_').cat(year.format()))
              .copyProperties(image, ['system:time_start', 'system:time_end']);
};

// Load the Global Yearly PM2.5 dataset
var pm25_yearly = ee.ImageCollection('projects/sat-io/open-datasets/GLOBAL-SATELLITE-PM25/ANNUAL')
  .filterDate('2000-01-01', '2021-12-31')
  .select('b1')
  .map(scale);

// Convert ImageCollection (22 yearly images) into one multiband image
var pm25_multiband = pm25_yearly.toBands();

// Print and check
print('Multiband PM2.5 image (2000–2021)', pm25_multiband);

// Example visualization: 2000 band
Map.addLayer(pm25_multiband, 
             {}, 
             'PM2.5 - 2000');
Map.setCenter(0, 20, 2);


// EXPORT TO GOOGLE DRIVE

Export.image.toDrive({
  image: pm25_multiband,
  description: 'PM25_2000_2021_multiband',
  folder: 'PM25_YEARLY',
  fileNamePrefix: 'PM25_2000_2021_multiband',
  region: ee.Geometry.Rectangle([-180, -90, 180, 90]),
  scale: 10000,   // 10 km resolution
  crs: 'EPSG:4326',
  maxPixels: 1e13
});
