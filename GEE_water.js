// Definisci il poligono per Gaza
var gaza = ee.Geometry.Rectangle([34.2, 31.2, 34.6, 31.6]);

// Funzione per calcolare NDWI selezionando solo B3 e B8
function getNDWI(startDate, endDate) {
  var image = ee.ImageCollection("COPERNICUS/S2")
    .filterBounds(gaza)
    .filterDate(ee.Date(startDate), ee.Date(endDate))
    .filter(ee.Filter.lt("CLOUDY_PIXEL_PERCENTAGE", 20))  // Filtra nuvole
    .select(["B3", "B8"])  // Selezioniamo solo le bande necessarie
    .median()
    .clip(gaza);

  // NDWI = (B3 - B8) / (B3 + B8)
  return image.normalizedDifference(["B3", "B8"]).rename("NDWI");
}

// Ottieni NDWI prima e dopo il conflitto
var ndwi_before = getNDWI('2023-09-01', '2023-10-01');
var ndwi_after = getNDWI('2024-02-01', '2024-02-15');

// Esporta i dati su Google Drive
Export.image.toDrive({
  image: ndwi_before,
  description: 'Gaza_NDWI_Before',
  scale: 10,
  region: gaza,
  fileFormat: 'GeoTIFF'
});

Export.image.toDrive({
  image: ndwi_after,
  description: 'Gaza_NDWI_After',
  scale: 10,
  region: gaza,
  fileFormat: 'GeoTIFF'
});
