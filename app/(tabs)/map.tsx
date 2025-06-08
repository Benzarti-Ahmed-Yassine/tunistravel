import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MapPin, Navigation, Star, Filter } from 'lucide-react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import { governorates } from '@/data/governorates';

const categories = ['All', 'Historic', 'Museums', 'Beaches', 'Archaeological', 'Oasis'];

export default function MapTab() {
  const [selectedCategory, setSelectedCategory] = useState('All');

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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Explore Tunisia</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color="#2563EB" />
        </TouchableOpacity>
      </View>

      {/* Map Placeholder */}
      <View style={styles.mapContainer}>
        <View style={styles.mapPlaceholder}>
          <MapPin size={48} color="#2563EB" />
          <Text style={styles.mapPlaceholderText}>Interactive Map</Text>
          <Text style={styles.mapPlaceholderSubtext}>
            Explore {allAttractions.length} attractions across 24 governorates
          </Text>
        </View>
        
        {/* Current Location Button */}
        <TouchableOpacity style={styles.currentLocationButton}>
          <Navigation size={20} color="#FFFFFF" />
        </TouchableOpacity>
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
            ? `All Attractions (${filteredAttractions.length})` 
            : `${selectedCategory} Attractions (${filteredAttractions.length})`
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
                <MapPin size={12} color="#64748B" />
                <Text style={styles.governorateText}>{attraction.governorate}</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.navigateButton}>
              <Navigation size={16} color="#2563EB" />
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1E293B',
  },
  filterButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#F1F5F9',
  },
  mapContainer: {
    height: 250,
    position: 'relative',
    backgroundColor: '#E2E8F0',
  },
  mapPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
  },
  mapPlaceholderText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginTop: 12,
  },
  mapPlaceholderSubtext: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 4,
    textAlign: 'center',
  },
  currentLocationButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: '#2563EB',
    borderRadius: 24,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  categoryContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: '#F1F5F9',
  },
  categoryButtonActive: {
    backgroundColor: '#2563EB',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748B',
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
    color: '#1E293B',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  locationCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 12,
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
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
    color: '#1E293B',
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
    color: '#1E293B',
  },
  locationType: {
    fontSize: 12,
    color: '#2563EB',
    fontWeight: '500',
    marginBottom: 4,
  },
  locationDescription: {
    fontSize: 12,
    color: '#64748B',
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
    color: '#64748B',
    fontWeight: '500',
  },
  navigateButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#F1F5F9',
  },
  bottomSpacing: {
    height: 100,
  },
});