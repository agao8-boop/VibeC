import { useEffect, useState, useCallback, useRef } from 'react';
import { MapContainer, TileLayer, GeoJSON as GeoJSONLayer } from 'react-leaflet';
import * as topojson from 'topojson-client';
import type { Topology, GeometryCollection } from 'topojson-specification';
import type { Feature, FeatureCollection, Geometry } from 'geojson';
import type { Layer, LeafletMouseEvent, GeoJSON as LeafletGeoJSON } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { COUNTIES, COMPARISON_COLOR, type CountyRecord } from '@/data/counties';

const TOPOLOGY_URL = 'https://cdn.jsdelivr.net/npm/us-atlas@3/counties-10m.json';

const CA_CENTER: [number, number] = [37.15, -119.4];
const CA_BOUNDS: [[number, number], [number, number]] = [
  [32.3, -125.3],
  [42.3, -113.8],
];

interface CountyProps {
  name: string;
}

interface CountyMapProps {
  selectedFips: string | null;
  onSelectCounty: (county: CountyRecord) => void;
}

export default function CountyMap({ selectedFips, onSelectCounty }: CountyMapProps) {
  const [caCounties, setCaCounties] = useState<FeatureCollection<Geometry, CountyProps> | null>(null);
  const [tracked, setTracked] = useState<FeatureCollection<Geometry, CountyProps> | null>(null);
  const layerRef = useRef<LeafletGeoJSON | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(TOPOLOGY_URL)
      .then((res) => res.json())
      .then((topology: Topology) => {
        if (cancelled) return;
        const countiesGeom = topology.objects.counties as GeometryCollection;
        const all = topojson.feature(topology, countiesGeom) as unknown as FeatureCollection<Geometry, CountyProps>;
        const ca: FeatureCollection<Geometry, CountyProps> = {
          type: 'FeatureCollection',
          features: all.features.filter((f) => String(f.id).startsWith('06')),
        };
        const trackedFips = new Set(COUNTIES.map((c) => c.fips));
        const highlighted: FeatureCollection<Geometry, CountyProps> = {
          type: 'FeatureCollection',
          features: ca.features.filter((f) => trackedFips.has(String(f.id))),
        };
        setCaCounties(ca);
        setTracked(highlighted);
      })
      .catch(() => {
        /* offline or CDN unreachable: map renders with basemap + no overlay */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const recordFor = useCallback((fips: string) => COUNTIES.find((c) => c.fips === fips), []);

  const styleTracked = useCallback(
    (feature?: Feature<Geometry, CountyProps>) => {
      const fips = String(feature?.id);
      const record = recordFor(fips);
      const isSelected = fips === selectedFips;
      return {
        color: '#000000',
        weight: isSelected ? 3 : 1.25,
        fillColor: record ? COMPARISON_COLOR[record.comparison] : '#cccccc',
        fillOpacity: isSelected ? 0.75 : 0.55,
      };
    },
    [selectedFips, recordFor]
  );

  const onEachTracked = useCallback(
    (feature: Feature<Geometry, CountyProps>, layer: Layer) => {
      const record = recordFor(String(feature.id));
      if (!record) return;
      layer.bindTooltip(
        `<strong>${record.name}</strong><br/>Permitting: ${record.permittingDisplay}<br/>Mapped: ${record.mappedMw.toLocaleString()} MW`,
        { sticky: true, className: 'gt-tooltip' }
      );
      layer.on({
        mouseover: (e: LeafletMouseEvent) => e.target.setStyle({ weight: 3 }),
        mouseout: (e: LeafletMouseEvent) => {
          if (String(feature.id) !== selectedFips) e.target.setStyle({ weight: 1.25 });
        },
        click: () => onSelectCounty(record),
      });
    },
    [recordFor, onSelectCounty, selectedFips]
  );

  return (
    <MapContainer
      center={CA_CENTER}
      zoom={6}
      minZoom={5}
      maxZoom={10}
      maxBounds={CA_BOUNDS}
      className="w-full h-full"
      zoomControl={true}
      attributionControl={true}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        subdomains="abcd"
      />
      {caCounties && (
        <GeoJSONLayer
          data={caCounties}
          style={{ color: '#d8d8d8', weight: 0.75, fillColor: '#f4f4f4', fillOpacity: 0.5 }}
          interactive={false}
        />
      )}
      {tracked && (
        <GeoJSONLayer
          key={selectedFips ?? 'none'}
          ref={layerRef}
          data={tracked}
          style={styleTracked}
          onEachFeature={onEachTracked}
        />
      )}
    </MapContainer>
  );
}
