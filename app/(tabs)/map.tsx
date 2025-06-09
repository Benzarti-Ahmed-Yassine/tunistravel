import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Platform, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MapPin, Navigation, Star, Filter, Locate } from 'lucide-react-native';
import { router } from 'expo-router';
import { governorates } from '@/data/governorates';
import { useTheme } from '@/contexts/ThemeContext';
import * as Location from 'expo-location';

// Mock MapView component for web compatibility
const MapView = Platform.OS === 'web' ? 
  ({ style, children }: any) => (
    <View style={[style, { backgroundColor: '#E5E7EB', justifyContent: 'center', alignItems: 'center' }]}>
      <MapPin size={48} color="#6B7280" />
      <Text style={{ color: '#6B7280', marginTop: 8 }}>Carte interactive</Text>
      <Text style={{ color: '#9CA3AF', fontSize: 12, marginTop: 4 }}>
        Disponible sur mobile
      </Text>
      {children}
    </View>
  ) : 
  require('react-native-maps').default;

const Marker = Platform.OS === 'web' ? 
  ({ children }: any) => <View>{children}</View> : 
  require('react-native-maps').Marker;

const categories = ['All', 'Historic', 'Museums', 'Beaches', 'Archaeological', 'Oasis'];

interface UserLocation {
  latitude: number;
  longitude: number;
}

export default function MapTab() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [locationPermission, setLocationPermission] = useState<boolean>(false);
  const { theme, isDark } = useTheme();

  const styles = createStyles(theme, isDark);

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        setLocationPermission(true);
        getCurrentLocation();
      } else {
        setLocationPermission(false);
        Alert.alert(
          'Permission refusée',
          'L\'accès à la localisation est nécessaire pour afficher votre position sur la carte.'
        );
      }
    } catch (error) {
      console.error('Error requesting location permission:', error);
    }
  };

  const getCurrentLocation = async () => {
    try {
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    } catch (error) {
      console.error('Error getting current location:', error);
    }
  };

  // Get all attractions from all governorates
  const allAttractions = governorates.flatMap(gov => 
    gov.attractions.map(attraction => ({
      ...attraction,
      governorate: gov.name,
      governorateId: gov.id
    }))
  );

  // Filter attractions by category
  const filteredAttractions = selectedCategory === 'All' 
    ? allAttractions 
    : allAttractions.filter(attraction => 
        attraction.type.toLowerCase().includes(selectedCategory.toLowerCase())
      );

  const handleAttractionPress = (governorateId: string) => {
    router.push(`/governorate/${governorateId}`);
  };

  const handleCurrentLocationPress = () => {
    if (locationPermission) {
      getCurrentLocation();
    } else {
      requestLocationPermission();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Explore Tunisia</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color={theme.colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Map Container */}
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 33.8869,
            longitude: 9.5375,
            latitudeDelta: 4.0,
            longitudeDelta: 4.0,
          }}
          region={userLocation ? {
            latitude: userLocation.latitude,
            longitude: userLocation.longitude,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          } : undefined}
        >
          {Platform.OS !== 'web' && filteredAttractions.map((attraction) => (
            <Marker
              key={`${attraction.governorateId}-${attraction.id}`}
              coordinate={{
                latitude: attraction.coordinates.lat,
                longitude: attraction.coordinates.lng,
              }}
              title={attraction.name}
              description={attraction.description}
            />
          ))}
          
          {Platform.OS !== 'web' && userLocation && (
            <Marker
              coordinate={userLocation}
              title="Ma position"
              pinColor="blue"
            />
          )}
        </MapView>
        
        {/* Current Location Button */}
        <TouchableOpacity 
          style={styles.currentLocationButton}
          onPress={handleCurrentLocationPress}
        >
          <Locate size={20} color="#FFFFFF" />
        </TouchableOpacity>

        {/* Real-time info overlay */}
        <View style={styles.infoOverlay}>
          <Text style={styles.infoText}>
            📍 {filteredAttractions.length} attractions • 🌡️ 24°C
          </Text>
        </View>
      </View>

      {/* Category Filter */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryContainer}>
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.categoryButtonActive
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category && styles.categoryTextActive
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Attractions List */}
      <ScrollView style={styles.locationsList} showsVerticalScrollIndicator={false}>
        <Text style={styles.locationsTitle}>
          {selectedCategory === 'All' 
            ? `Toutes les attractions (${filteredAttractions.length})` 
            : `${selectedCategory} (${filteredAttractions.length})`
          }
        </Text>
        {filteredAttractions.map((attraction) => (
          <TouchableOpacity 
            key={`${attraction.governorateId}-${attraction.id}`} 
            style={styles.locationCard}
            onPress={() => handleAttractionPress(attraction.governorateId)}
          >
            <Image source={{ uri: attraction.image }} style={styles.locationImage} />
            <View style={styles.locationInfo}>
              <View style={styles.locationHeader}>
                <Text style={styles.locationName}>{attraction.name}</Text>
                <View style={styles.ratingContainer}>
                  <Star size={14} color="#F59E0B" fill="#F59E0B" />
                  <Text style={styles.ratingText}>{attraction.rating}</Text>
                </View>
              </View>
              <Text style={styles.locationType}>{attraction.type}</Text>
              <Text style={styles.locationDescription} numberOfLines={2}>
                {attraction.description}
              </Text>
              <View style={styles.locationMeta}>
                <MapPin size={12} color={theme.colors.textSecondary} />
                <Text style={styles.governorateText}>{attraction.governorate}</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.navigateButton}>
              <Navigation size={16} color={theme.colors.primary} />
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
}

const createStyles = (theme: any, isDark: boolean) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: theme.colors.text,
  },
  filterButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: isDark ? '#334155' : '#F1F5F9',
  },
  mapContainer: {
    height: 250,
    position: 'relative',
    backgroundColor: theme.colors.border,
  },
  map: {
    flex: 1,
  },
  currentLocationButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: theme.colors.primary,
    borderRadius: 24,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  infoOverlay: {
    position: 'absolute',
    top: 16,
    left: 16,
    right: 16,
    backgroundColor: theme.colors.surface,
    borderRadius: 8,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoText: {
    fontSize: 14,
    color: theme.colors.text,
    textAlign: 'center',
    fontWeight: '500',
  },
  categoryContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: isDark ? '#334155' : '#F1F5F9',
  },
  categoryButtonActive: {
    backgroundColor: theme.colors.primary,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.textSecondary,
  },
  categoryTextActive: {
    color: '#FFFFFF',
  },
  locationsList: {
    flex: 1,
  },
  locationsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.text,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  locationCard: {
    flexDirection: 'row',
    backgroundColor: theme.colors.surface,
    marginHorizontal: 20,
    marginBottom: 12,
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: isDark ? 0.3 : 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  locationImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  locationInfo: {
    flex: 1,
  },
  locationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 2,
  },
  locationName: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
    flex: 1,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 2,
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.text,
  },
  locationType: {
    fontSize: 12,
    color: theme.colors.primary,
    fontWeight: '500',
    marginBottom: 4,
  },
  locationDescription: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    lineHeight: 16,
    marginBottom: 4,
  },
  locationMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  governorateText: {
    marginLeft: 4,
    fontSize: 12,
    color: theme.colors.textSecondary,
    fontWeight: '500',
  },
  navigateButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: isDark ? '#334155' : '#F1F5F9',
  },
  bottomSpacing: {
    height: 100,
  },
});