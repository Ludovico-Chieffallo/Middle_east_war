// Definisci il poligono per Gaza
var gaza = ee.Geometry.Rectangle([34.2, 31.2, 34.6, 31.6]);

// Funzione per ottenere il mosaico di luci notturne (VIIRS)
function getVIIRSMosaic(startDate, endDate) {
  return ee.ImageCollection("NOAA/VIIRS/DNB/MONTHLY_V1/VCMSLCFG")
    .filterBounds(gaza)
    .filterDate(ee.Date(startDate), ee.Date(endDate))
    .select("avg_rad") // Seleziona la luminosità media
    .mean()
    .clip(gaza);
}

// Estrai le immagini prima e dopo il conflitto
var before_lights = getVIIRSMosaic('2023-09-01', '2023-10-01');
var after_lights = getVIIRSMosaic('2024-02-01', '2024-02-15');

// Esporta le luci notturne su Google Drive
Export.image.toDrive({
  image: before_lights,
  description: 'Gaza_Lights_Before',
  scale: 500,
  region: gaza,
  fileFormat: 'GeoTIFF'
});

Export.image.toDrive({
  image: after_lights,
  description: 'Gaza_Lights_After',
  scale: 500,
  region: gaza,
  fileFormat: 'GeoTIFF'
});
