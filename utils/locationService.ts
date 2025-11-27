import { Platform } from 'react-native';

export interface LocationData {
  latitude: number;
  longitude: number;
  city: string;
  region: string;
}

const DEFAULT_LOCATION: LocationData = {
  latitude: -6.8976,
  longitude: 112.0478,
  city: 'Tuban',
  region: 'Jawa Timur',
};

export async function requestLocationPermission(): Promise<boolean> {
  if (Platform.OS === 'web') {
    return true;
  }

  try {
    const Location = require('expo-location');
    const { status } = await Location.requestForegroundPermissionsAsync();
    return status === 'granted';
  } catch (error) {
    console.error('Error requesting location permission:', error);
    return false;
  }
}

export async function getCurrentLocation(): Promise<LocationData> {
  if (Platform.OS === 'web') {
    return getWebLocation();
  }

  try {
    const Location = require('expo-location');
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) {
      return DEFAULT_LOCATION;
    }

    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced,
    });

    const { latitude, longitude } = location.coords;

    const geocode = await Location.reverseGeocodeAsync({
      latitude,
      longitude,
    });

    if (geocode && geocode.length > 0) {
      const address = geocode[0];
      return {
        latitude,
        longitude,
        city: address.city || address.subregion || 'Unknown',
        region: address.region || address.country || 'Unknown',
      };
    }

    return {
      latitude,
      longitude,
      city: 'Unknown',
      region: 'Unknown',
    };
  } catch (error) {
    console.error('Error getting location:', error);
    return DEFAULT_LOCATION;
  }
}

async function getWebLocation(): Promise<LocationData> {
  // HARDCODE: Langsung return lokasi Tuban tanpa menggunakan navigator.geolocation
  // Ini untuk memastikan jadwal salat selalu akurat untuk Tuban
  return DEFAULT_LOCATION;
}
