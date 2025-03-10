import { useState } from 'react';
import Map, { MapRef, Marker, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface Destination {
  id: number;
  name: string;
  location: [number, number];
  description: string;
  image: string;
}

const DESTINATIONS: Destination[] = [
  {
    id: 1,
    name: "Maldives Luxury Resort",
    location: [73.5, 4.2],
    description: "Experience paradise in the Indian Ocean",
    image: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=600"
  },
  {
    id: 2,
    name: "Swiss Alps Retreat",
    location: [8.2, 46.8],
    description: "Mountain luxury at its finest",
    image: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=600"
  },
  {
    id: 3,
    name: "Santorini Villa",
    location: [25.4, 36.4],
    description: "Mediterranean elegance and charm",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=600"
  }
];

export function FeaturedDestinationsMap() {
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [viewState, setViewState] = useState({
    longitude: 0,
    latitude: 20,
    zoom: 1.5
  });

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
          Featured Destinations
        </h2>

        <div className="h-[500px] w-full rounded-xl overflow-hidden shadow-lg">
          <Map
            {...viewState}
            onMove={evt => setViewState(evt.viewState)}
            mapStyle="mapbox://styles/mapbox/light-v11"
            mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
          >
            {DESTINATIONS.map((destination) => (
              <Marker
                key={destination.id}
                longitude={destination.location[0]}
                latitude={destination.location[1]}
                anchor="bottom"
                onClick={(e) => {
                  e.originalEvent.stopPropagation();
                  setSelectedDestination(destination);
                }}
              >
                <div className="cursor-pointer p-2 rounded-full bg-primary/90 text-white hover:bg-primary transition-colors">
                  📍
                </div>
              </Marker>
            ))}

            {selectedDestination && (
              <Popup
                longitude={selectedDestination.location[0]}
                latitude={selectedDestination.location[1]}
                anchor="bottom"
                onClose={() => setSelectedDestination(null)}
                closeButton={true}
                closeOnClick={false}
                className="rounded-lg overflow-hidden"
              >
                <div className="p-2">
                  <img
                    src={selectedDestination.image}
                    alt={selectedDestination.name}
                    className="w-full h-32 object-cover rounded-lg mb-2"
                  />
                  <h3 className="font-semibold text-lg">{selectedDestination.name}</h3>
                  <p className="text-sm text-gray-600">{selectedDestination.description}</p>
                </div>
              </Popup>
            )}
          </Map>
        </div>
      </div>
    </section>
  );
}