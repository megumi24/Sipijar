import L from 'leaflet';
import 'leaflet.heat';
import { useEffect, useState } from 'react';

const dataPembangkit = [
  {
    id: 1,
    name: 'PLTU Suralaya',
    lat: -6.02,
    lon: 105.95,
    type: 'pembangkit',
    status: 'aktif',
    kasus: 'blackout',
    jumlah: 8,
  },
  {
    id: 2,
    name: 'PLTA Saguling',
    lat: -6.85,
    lon: 107.33,
    type: 'pembangkit',
    status: 'proyek',
    kasus: 'distribusi',
    jumlah: 4,
  },
  {
    id: 3,
    name: 'PLTG Tambak Lorok',
    lat: -6.97,
    lon: 110.44,
    type: 'pembangkit',
    status: 'shutdown',
    kasus: 'p2tl',
    jumlah: 6,
  },
];

const dataTransmisi = [
  {
    id: 101,
    name: 'SUTET Jawa-Bali',
    lat: -7.0,
    lon: 108.5,
    type: 'transmisi',
    status: 'aktif',
    kasus: 'blackout',
    jumlah: 10,
  },
  {
    id: 102,
    name: 'SUTET Kalimantan',
    lat: -1.5,
    lon: 113.0,
    type: 'transmisi',
    status: 'proyek',
    kasus: 'psn',
    jumlah: 3,
  },
];

export default function Leaflet() {
  const [map, setMap] = useState<L.Map | null>(null);
  const [layerGroup, setLayerGroup] = useState<L.LayerGroup | null>(null);
  const [type, setType] = useState('semua');
  const [status, setStatus] = useState('semua');
  const [heatType, setHeatType] = useState('semua');

  const getColor = (status: string) => {
    switch (status) {
      case 'aktif':
        return 'green';
      case 'proyek':
        return 'orange';
      case 'shutdown':
        return 'red';
      default:
        return 'gray';
    }
  };

  useEffect(() => {
    const mapInstance = L.map('map').setView([-2.5, 117], 5);

    const baseMaps = {
      OpenStreetMap: L.tileLayer(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        { attribution: '&copy; OSM' },
      ),
      Dark: L.tileLayer(
        'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
        { attribution: '&copy; Carto' },
      ),
      Satellite: L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      ),
    };

    baseMaps['OpenStreetMap'].addTo(mapInstance);
    L.control.layers(baseMaps).addTo(mapInstance);

    const legend = new L.Control({ position: 'bottomright' });
    legend.onAdd = function () {
      const div = L.DomUtil.create('div', 'legend');
      div.innerHTML = `
        <strong>Status</strong><br>
        <i style="background: green"></i> Aktif<br>
        <i style="background: orange"></i> Proyek<br>
        <i style="background: red"></i> Shutdown<br>
      `;
      return div;
    };
    legend.addTo(mapInstance);

    setMap(mapInstance);
    setLayerGroup(L.layerGroup().addTo(mapInstance));

    return () => {
      mapInstance.remove();
    };
  }, []);

  useEffect(() => {
    if (!map || !layerGroup) return;

    layerGroup.clearLayers();

    let combinedData = [];
    if (type === 'semua' || type === 'pembangkit')
      combinedData.push(...dataPembangkit);
    if (type === 'semua' || type === 'transmisi')
      combinedData.push(...dataTransmisi);

    if (status !== 'semua') {
      combinedData = combinedData.filter((d) => d.status === status);
    }

    // Marker per titik
    combinedData.forEach((d) => {
      L.circleMarker([d.lat, d.lon], {
        radius: 8,
        fillColor: getColor(d.status),
        color: '#000',
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8,
      })
        .bindPopup(
          `<b>${d.name}</b><br>Tipe: ${d.type}<br>Status: ${d.status}<br>Kasus: ${d.kasus}`,
        )
        .addTo(layerGroup);
    });

    // Heatmap
    let filteredHeat = combinedData;
    if (heatType !== 'semua')
      filteredHeat = filteredHeat.filter((d) => d.kasus === heatType);

    const heatPoints: [number, number, number?][] = filteredHeat.map((d) => [
      d.lat,
      d.lon,
      d.jumlah,
    ]);
    if (heatPoints.length > 0) {
      L.heatLayer(heatPoints, { radius: 25, blur: 20, maxZoom: 8 }).addTo(
        layerGroup,
      );
    }
  }, [map, layerGroup, type, status, heatType]);

  return (
    <div>
      <div className="controls">
        <label>Tipe Data</label>
        <select onChange={(e) => setType(e.target.value)}>
          <option value="semua">Semua</option>
          <option value="pembangkit">Pembangkit</option>
          <option value="transmisi">Transmisi</option>
        </select>

        <label>Status</label>
        <select onChange={(e) => setStatus(e.target.value)}>
          <option value="semua">Semua</option>
          <option value="aktif">Aktif</option>
          <option value="proyek">Proyek</option>
          <option value="shutdown">Shutdown</option>
        </select>

        <label>Kasus ATHG</label>
        <select onChange={(e) => setHeatType(e.target.value)}>
          <option value="semua">Semua</option>
          <option value="blackout">Blackout</option>
          <option value="p2tl">P2TL</option>
          <option value="mangkarak">Mangkarak</option>
          <option value="distribusi">Distribusi</option>
          <option value="psn">PSN</option>
        </select>
      </div>
      <div id="map" className="h-[80vh] w-full"></div>
    </div>
  );
}
