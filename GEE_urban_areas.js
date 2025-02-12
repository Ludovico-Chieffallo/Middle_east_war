// Definisci il poligono per Gaza
var gaza = ee.Geometry.Rectangle([34.2, 31.2, 34.6, 31.6]);

// Carica il dataset ESA WorldCover 2021
var worldcover = ee.Image("ESA/WorldCover/v200/2021");

// Seleziona la banda 'Map' che contiene le classi di copertura del suolo
var landcover = worldcover.select("Map");

// Filtra solo le aree urbanizzate (Classe 50 = "Built-up" = aree costruite)
var urban_areas = landcover.eq(50).selfMask();

// Esporta la mappa urbana
Export.image.toDrive({
  image: urban_areas,
  description: 'Gaza_Urban_Areas',
  scale: 10,  // 🔹 Risoluzione molto alta (10m)
  region: gaza,
  fileFormat: "GeoTIFF"
});
