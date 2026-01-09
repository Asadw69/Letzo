import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Search, Loader2 } from 'lucide-react';

interface Location {
  display_name: string;
  lat: string;
  lon: string;
  place_id: number;
  address: {
    city?: string;
    town?: string;
    village?: string;
    state?: string;
    country?: string;
  };
}

const HomeLocationSelector: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [locations, setLocations] = useState<Location[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null);

  const searchLocations = async (query: string) => {
    if (query.length < 3) {
      setLocations([]);
      return;
    }

    setIsSearching(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&addressdetails=1&limit=10`,
        {
          headers: {
            'Accept': 'application/json',
            'User-Agent': 'LetzoApp/1.0'
          }
        }
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: Location[] = await response.json();
      setLocations(data);
    } catch (error) {
      console.error('Error fetching locations:', error);
      setLocations([]);
    } finally {
      setIsSearching(false);
    }
  };

  useEffect(() => {
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    const timer = setTimeout(() => {
      searchLocations(searchTerm);
    }, 500);

    setDebounceTimer(timer);

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [searchTerm]);

  const formatLocationName = (location: Location): string => {
    const parts: string[] = [];
    const addr = location.address;
    
    if (addr.city) parts.push(addr.city);
    else if (addr.town) parts.push(addr.town);
    else if (addr.village) parts.push(addr.village);
    
    if (addr.state) parts.push(addr.state);
    if (addr.country) parts.push(addr.country);
    
    return parts.length > 0 ? parts.join(', ') : location.display_name;
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold mb-2" style={{ fontFamily: 'Georgia, serif', color: '#FF002F' }}>
            Letzzo
          </h1>
          <p className="text-gray-700 text-sm">Find your kind of people anywhere</p>
        </div>

        {/* Main Question */}
        <h2 className="text-3xl font-bold text-center mb-8" style={{ fontFamily: 'Georgia, serif' }}>
          Where is your home?
        </h2>

        {/* Search Location Label */}
        <p className="text-gray-600 text-sm mb-4 text-center">Search for your location</p>

        {/* Search Bar */}
        <div className="relative mb-2">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Enter city, town, or address..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 bg-white"
            style={{ borderColor: searchTerm ? '#FF002F' : '#d1d5db' }}
            onFocus={(e) => e.target.style.borderColor = '#FF002F'}
            onBlur={(e) => {
              if (!searchTerm) e.target.style.borderColor = '#d1d5db';
            }}
          />
          {isSearching && (
            <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 animate-spin" />
          )}
        </div>

        {/* Helper Text */}
        <p className="text-xs text-gray-500 mb-4">Type at least 3 characters to search</p>

        {/* Locations List */}
        {locations.length > 0 && (
          <div className="border border-gray-300 rounded-lg mb-6 max-h-64 overflow-y-auto">
            {locations.map((location) => (
              <button
                key={location.place_id}
                onClick={() => {
                  setSelectedLocation(location);
                  setSearchTerm(formatLocationName(location));
                  setLocations([]);
                }}
                className={`w-full text-left px-4 py-3 border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition-colors flex items-start gap-3 ${
                  selectedLocation?.place_id === location.place_id ? 'font-semibold' : 'text-gray-700'
                }`}
                style={selectedLocation?.place_id === location.place_id ? { backgroundColor: '#fff0f3', color: '#FF002F' } : {}}
              >
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: '#FF002F' }} />
                <div className="flex-1">
                  <div className="font-medium">{formatLocationName(location)}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{location.display_name}</div>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* No Results Message */}
        {searchTerm.length >= 3 && !isSearching && locations.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <MapPin className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>No locations found. Try a different search term.</p>
          </div>
        )}

        {/* Continue Button */}
        <button
          onClick={() => {
            if (selectedLocation) {
              console.log("Selected location:", selectedLocation);
              navigate("/profileadd");
            }
          }}
          disabled={!selectedLocation}
          className={`w-full py-4 rounded-full font-semibold text-white text-lg mb-4 transition-all ${
            selectedLocation
              ? 'cursor-pointer'
              : 'bg-gray-300 cursor-not-allowed'
          }`}
          style={selectedLocation ? { backgroundColor: '#FF002F' } : {}}
          onMouseEnter={(e) => {
            if (selectedLocation) e.currentTarget.style.backgroundColor = '#E6002A';
          }}
          onMouseLeave={(e) => {
            if (selectedLocation) e.currentTarget.style.backgroundColor = '#FF002F';
          }}
        >
          Continue
        </button>

        {/* Back Button */}
        <button 
          onClick={() => navigate("/country")}
          className="w-full py-4 rounded-full font-semibold text-gray-700 text-lg border-2 border-gray-300 hover:bg-gray-50 transition-colors"
        >
          Back to previous step
        </button>
      </div>
    </div>
  );
};

export default HomeLocationSelector;