'use client';

export interface Location {
  lat: number;
  lng: number;
  address: string;
  city: string;
  state: string;
}

export interface Supplier {
  id: string;
  name: string;
  location: Location;
  products: string[];
  rating: number;
  priceRange: string;
  deliveryTime: string;
  phone: string;
  email: string;
}

export interface Vendor {
  id: string;
  name: string;
  location: Location;
  businessType: string;
  contact: string;
  email: string;
}

export const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

export const getLocationFromAddress = async (address: string): Promise<Location | null> => {
  try {
    const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=YOUR_API_KEY`);
    const data = await response.json();
    
    if (data.results && data.results.length > 0) {
      const result = data.results[0];
      return {
        lat: result.geometry.lat,
        lng: result.geometry.lng,
        address: result.formatted,
        city: result.components.city || result.components.town || '',
        state: result.components.state || ''
      };
    }
    return null;
  } catch (error) {
    console.error('Error fetching location:', error);
    return null;
  }
};

export const getCurrentLocation = (): Promise<Location> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by this browser'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        try {
          const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=YOUR_API_KEY`);
          const data = await response.json();
          
          if (data.results && data.results.length > 0) {
            const result = data.results[0];
            resolve({
              lat: latitude,
              lng: longitude,
              address: result.formatted,
              city: result.components.city || result.components.town || '',
              state: result.components.state || ''
            });
          } else {
            resolve({
              lat: latitude,
              lng: longitude,
              address: `${latitude}, ${longitude}`,
              city: '',
              state: ''
            });
          }
        } catch (error) {
          resolve({
            lat: latitude,
            lng: longitude,
            address: `${latitude}, ${longitude}`,
            city: '',
            state: ''
          });
        }
      },
      (error) => {
        reject(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
    );
  });
};

export const getSuppliersNearLocation = (
  userLocation: Location,
  suppliers: Supplier[],
  maxDistance: number = 50
): (Supplier & { distance: number })[] => {
  return suppliers
    .map(supplier => ({
      ...supplier,
      distance: calculateDistance(
        userLocation.lat,
        userLocation.lng,
        supplier.location.lat,
        supplier.location.lng
      )
    }))
    .filter(supplier => supplier.distance <= maxDistance)
    .sort((a, b) => a.distance - b.distance);
};

export const formatDistance = (distance: number): string => {
  if (distance < 1) {
    return `${Math.round(distance * 1000)}m`;
  }
  return `${distance.toFixed(1)}km`;
};

export const mockSuppliers: Supplier[] = [
  {
    id: 'SUP-001',
    name: 'Fresh Vegetables Co.',
    location: {
      lat: 28.6139,
      lng: 77.2090,
      address: 'Connaught Place, New Delhi, Delhi 110001',
      city: 'Delhi',
      state: 'Delhi'
    },
    products: ['Vegetables', 'Fruits'],
    rating: 4.8,
    priceRange: '₹20-100/kg',
    deliveryTime: '2-3 hours',
    phone: '+91 9876543210',
    email: 'contact@freshveggies.com'
  },
  {
    id: 'SUP-002',
    name: 'Spice Masters',
    location: {
      lat: 28.6304,
      lng: 77.2177,
      address: 'Chandni Chowk, New Delhi, Delhi 110006',
      city: 'Delhi',
      state: 'Delhi'
    },
    products: ['Spices', 'Masalas'],
    rating: 4.5,
    priceRange: '₹100-500/kg',
    deliveryTime: '4-5 hours',
    phone: '+91 9876543211',
    email: 'info@spicemasters.com'
  },
  {
    id: 'SUP-003',
    name: 'Mumbai Spice Hub',
    location: {
      lat: 19.0760,
      lng: 72.8777,
      address: 'Crawford Market, Mumbai, Maharashtra 400001',
      city: 'Mumbai',
      state: 'Maharashtra'
    },
    products: ['Spices', 'Condiments'],
    rating: 4.3,
    priceRange: '₹80-400/kg',
    deliveryTime: '2-3 days',
    phone: '+91 9876543215',
    email: 'mumbai@spicehub.com'
  }
];

export const mockVendors: Vendor[] = [
  {
    id: 'VEN-001',
    name: 'Street Food Corner',
    location: {
      lat: 28.6129,
      lng: 77.2295,
      address: 'India Gate, New Delhi, Delhi 110003',
      city: 'Delhi',
      state: 'Delhi'
    },
    businessType: 'Street Food',
    contact: '+91 9876543210',
    email: 'owner@streetfoodcorner.com'
  },
  {
    id: 'VEN-002',
    name: 'Spicy Delights',
    location: {
      lat: 19.0896,
      lng: 72.8656,
      address: 'Linking Road, Bandra, Mumbai, Maharashtra 400050',
      city: 'Mumbai',
      state: 'Maharashtra'
    },
    businessType: 'Street Food',
    contact: '+91 9876543211',
    email: 'contact@spicydelights.com'
  }
];