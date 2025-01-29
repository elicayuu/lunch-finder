import { FC, useRef, useEffect } from 'react'
import L from "leaflet"
import "leaflet/dist/leaflet.css"

const OSMUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

interface OpenStreetMapProps {
  width: string | number;
  height: string | number;
  defaultLocation: L.LatLngExpression;
  zoom?: number;
  marker?: L.LatLngExpression;
}

export const OpenStreetMap:FC<OpenStreetMapProps> = ({
  width,
  height,
  defaultLocation,
  zoom = 15,
  marker,
}) => {
  const domRef = useRef<HTMLDivElement | null>(null)
  const mapRef = useRef<L.Map | null>(null)

  // Initialize map
  useEffect(() => {
    if (domRef.current === null || mapRef.current) return

    mapRef.current = L.map(domRef.current, {
      center: defaultLocation,
      zoom: zoom,
    });

    L.tileLayer(OSMUrl).addTo(mapRef.current);
  }, [defaultLocation, zoom])

  // Change marker
  useEffect(() => {
    if (!mapRef.current) return

    if (marker) {
      const lastMarker = L.marker(marker).addTo(mapRef.current)
      mapRef.current.panTo(marker)

      return () => {
        lastMarker.remove()
      }
    }
  }, [marker])

  return <div ref={domRef} style={{ height: height, width: width }} />
}