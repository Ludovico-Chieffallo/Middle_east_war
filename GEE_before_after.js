// Definisci il poligono per Gaza
var gaza = ee.Geometry.Rectangle([34.2, 31.2, 34.6, 31.6]);

// Funzione per ottenere i dati di NO₂
function getNO2Mosaic(startDate, endDate) {
  return ee.ImageCollection("COPERNICUS/S5P/OFFL/L3_NO2")
    .filterBounds(gaza)
    .filterDate(ee.Date(startDate), ee.Date(endDate))
    .mean() // Calcola la media per ridurre variazioni giornaliere
    .clip(gaza);
}

// Estrai le immagini prima e dopo il conflitto
var before_no2 = getNO2Mosaic('2023-09-01', '2023-10-01');
var after_no2 = getNO2Mosaic('2024-02-01', '2024-02-15');

// Esporta NO2 su Google Drive
Export.image.toDrive({
  image: before_no2,
  description: 'Gaza_NO2_Before',
  scale: 1113, // Risoluzione Sentinel-5P
  region: gaza,
  fileFormat: 'GeoTIFF'
});

Export.image.toDrive({
  image: after_no2,
  description: 'Gaza_NO2_After',
  scale: 1113,
  region: gaza,
  fileFormat: 'GeoTIFF'
});
