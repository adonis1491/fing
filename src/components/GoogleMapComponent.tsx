import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import MapPlaceholder from './MapPlaceholder';

interface Props {
  location: {
    lat: number;
    lng: number;
  };
}

const containerStyle = {
  width: '100%',
  height: '100%',
  borderRadius: '0.5rem'
};

const mapOptions = {
  zoomControl: true,
  mapTypeControl: false,
  streetViewControl: false,
  fullscreenControl: false,
  styles: [
    {
      featureType: 'all',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#4a5568' }]
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [{ color: '#edf2f7' }]
    }
  ]
};

export default function GoogleMapComponent({ location }: Props) {
  const [mapError, setMapError] = useState(false);

  if (!import.meta.env.VITE_GOOGLE_MAPS_API_KEY || mapError) {
    return <MapPlaceholder />;
  }

  return (
    <LoadScript
      googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
      onError={() => setMapError(true)}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={location}
        zoom={13}
        options={mapOptions}
        onLoad={() => console.log('Map loaded successfully')}
        onError={() => setMapError(true)}
      >
        <Marker position={location} />
      </GoogleMap>
    </LoadScript>
  );
}