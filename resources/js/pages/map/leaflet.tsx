import { masterPembangkitQueries } from '@/services/master-pembangkit';
import L from 'leaflet';
import 'leaflet.heat';
import { useEffect, useMemo, useState } from 'react';
import './styles.css';

export default function Leaflet() {
  const [map, setMap] = useState<L.Map | null>(null);
  const [layerGroup, setLayerGroup] = useState<L.LayerGroup | null>(null);
  const [type, setType] = useState('semua');
  const [status, setStatus] = useState('semua');
  //   const [heatType, setHeatType] = useState('semua');

  const { data } = masterPembangkitQueries.situationData.useQuery();
  const dataPembangkit = useMemo(() => {
    return data?.pembangkit;
  }, [data]);
  const dataTransmisi = useMemo(() => {
    return data?.transmisi
      .filter((t) => t.koordinat.length > 0)
      .map(({ koordinat, ...rest }) => ({
        ...rest,
        latitude: koordinat[0][0],
        longitude: koordinat[0][1],
      }));
  }, [data]);

  const getColor = (status: string) => {
    switch (status) {
      case 'Aktif':
        return 'green';
      case 'Project':
        return 'orange';
      case 'Tutup':
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
    if (dataPembangkit && (type === 'semua' || type === 'pembangkit'))
      combinedData.push(...dataPembangkit);
    if (dataTransmisi && (type === 'semua' || type === 'transmisi'))
      combinedData.push(...dataTransmisi);

    if (status !== 'semua') {
      combinedData = combinedData.filter((d) => d.status === status);
    }

    // Marker per titik
    combinedData.forEach((d) => {
      L.circleMarker([d.latitude, d.longitude], {
        radius: 8,
        fillColor: getColor(d.status),
        color: '#000',
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8,
      })
        .bindPopup(`<b>${d.nama}</b><br>Tipe: ${d.tipe}<br>Status: ${d.status}`)
        .addTo(layerGroup);
    });

    // Heatmap
    // let filteredHeat = combinedData;
    // if (heatType !== 'semua')
    //   filteredHeat = filteredHeat.filter((d) => d.kasus === heatType);

    // const heatPoints: [number, number, number?][] = filteredHeat.map((d) => [
    //   d.lat,
    //   d.lon,
    //   d.jumlah,
    // ]);
    // if (heatPoints.length > 0) {
    //   L.heatLayer(heatPoints, { radius: 25, blur: 20, maxZoom: 8 }).addTo(
    //     layerGroup,
    //   );
    // }
  }, [map, layerGroup, type, status, dataPembangkit, dataTransmisi]);

  return (
    <div className="relative text-black">
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
          <option value="Aktif">Aktif</option>
          <option value="Project">Proyek</option>
          <option value="Tutup">Shutdown</option>
        </select>

        {/* <label>Kasus ATHG</label>
        <select onChange={(e) => setHeatType(e.target.value)}>
          <option value="semua">Semua</option>
          <option value="blackout">Blackout</option>
          <option value="p2tl">P2TL</option>
          <option value="mangkarak">Mangkarak</option>
          <option value="distribusi">Distribusi</option>
          <option value="psn">PSN</option>
        </select> */}
      </div>
      <div id="map" className="h-[80vh] w-full"></div>
    </div>
  );
}
