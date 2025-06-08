import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import { ArrowLeft, MapPin, Star, Clock, Utensils, Users, Car, Camera } from 'lucide-react-native';
import { getGovernorateById } from '@/data/governorates';

const categories = [
  { id: 'attractions', title: 'Attractions', icon: Camera },
  { id: 'cuisine', title: 'Cuisine', icon: Utensils },
  { id: 'culture', title: 'Culture', icon: Users },
  { id: 'transport', title: 'Transport', icon: Car },
];

export default function GovernorateDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [selectedCategory, setSelectedCategory] = useState('attractions');
  
  const governorate = getGovernorateById(id!);

  if (!governorate) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Governorate not found</Text>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Text style={styles.backButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const renderContent = () => {
    switch (selectedCategory) {
      case 'attractions':
        return (
          <View>
            {governorate.attractions.map((attraction) => (
              <View key={attraction.id} style={styles.attractionCard}>
                <Image source={{ uri: attraction.image }} style={styles.attractionImage} />
                <View style={styles.attractionInfo}>
                  <View style={styles.attractionHeader}>
                    <Text style={styles.attractionName}>{attraction.name}</Text>
                    <View style={styles.ratingContainer}>
                      <Star size={16} color="#F59E0B" fill="#F59E0B" />
                      <Text style={styles.ratingText}>{attraction.rating}</Text>
                    </View>
                  </View>
                  <Text style={styles.attractionType}>{attraction.type}</Text>
                  <Text style={styles.attractionDescription}>{attraction.description}</Text>
                  <View style={styles.attractionMeta}>
                    <View style={styles.durationContainer}>
                      <Clock size={14} color="#64748B" />
                      <Text style={styles.durationText}>{attraction.duration}</Text>
                    </View>
                    <TouchableOpacity style={styles.viewOnMapButton}>
                      <MapPin size={14} color="#2563EB" />
                      <Text style={styles.viewOnMapText}>View on Map</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </View>
        );

      case 'cuisine':
        return (
          <View>
            {governorate.cuisine.map((dish, index) => (
              <View key={index} style={styles.cuisineCard}>
                <View style={styles.cuisineHeader}>
                  <Text style={styles.dishName}>{dish.name}</Text>
                  {dish.isSpecialty && (
                    <View style={styles.specialtyBadge}>
                      <Text style={styles.specialtyText}>Specialty</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.dishDescription}>{dish.description}</Text>
              </View>
            ))}
          </View>
        );

      case 'culture':
        return (
          <View>
            {governorate.culture.map((culture, index) => (
              <View key={index} style={styles.cultureCard}>
                <Text style={styles.cultureTip}>{culture.tip}</Text>
                <Text style={styles.cultureInfo}>{culture.info}</Text>
              </View>
            ))}
          </View>
        );

      case 'transport':
        return (
          <View>
            {governorate.transportation.map((transport, index) => (
              <View key={index} style={styles.transportCard}>
                <Text style={styles.transportTitle}>{transport.title}</Text>
                <Text style={styles.transportInfo}>{transport.info}</Text>
              </View>
            ))}
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#1E293B" />
        </TouchableOpacity>
        <View style={styles.headerTitles}>
          <Text style={styles.headerTitle}>{governorate.name}</Text>
          <Text style={styles.headerSubtitle}>{governorate.nameArabic}</Text>
        </View>
      </View>

      {/* Hero Image */}
      <View style={styles.heroContainer}>
        <Image source={{ uri: governorate.image }} style={styles.heroImage} />
        <View style={styles.heroOverlay}>
          <Text style={styles.heroTitle}>{governorate.name}</Text>
          <Text style={styles.heroSubtitle}>Capital: {governorate.capital}</Text>
        </View>
      </View>

      {/* Description */}
      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>{governorate.description}</Text>
      </View>

      {/* Category Selector */}
      <View style={styles.categorySelector}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryButton,
                  selectedCategory === category.id && styles.categoryButtonActive
                ]}
                onPress={() => setSelectedCategory(category.id)}
              >
                <IconComponent
                  size={20}
                  color={selectedCategory === category.id ? '#FFFFFF' : '#64748B'}
                />
                <Text
                  style={[
                    styles.categoryButtonText,
                    selectedCategory === category.id && styles.categoryButtonTextActive
                  ]}
                >
                  {category.title}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Content */}
      <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false}>
        {renderContent()}
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
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  backButton: {
    padding: 8,
    marginRight: 12,
  },
  headerTitles: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1E293B',
  },
  headerSubtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2563EB',
  },
  heroContainer: {
    position: 'relative',
    height: 200,
  },
  heroImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  heroOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 20,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#BFDBFE',
    marginTop: 4,
  },
  descriptionContainer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  description: {
    fontSize: 16,
    color: '#64748B',
    lineHeight: 24,
  },
  categorySelector: {
    paddingVertical: 16,
    paddingLeft: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: '#F1F5F9',
  },
  categoryButtonActive: {
    backgroundColor: '#2563EB',
  },
  categoryButtonText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '600',
    color: '#64748B',
  },
  categoryButtonTextActive: {
    color: '#FFFFFF',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  attractionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    overflow: 'hidden',
  },
  attractionImage: {
    width: '100%',
    height: 160,
    resizeMode: 'cover',
  },
  attractionInfo: {
    padding: 16,
  },
  attractionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  attractionName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
    flex: 1,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: '600',
    color: '#1E293B',
  },
  attractionType: {
    fontSize: 12,
    color: '#2563EB',
    fontWeight: '600',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  attractionDescription: {
    fontSize: 14,
    color: '#64748B',
    lineHeight: 20,
    marginBottom: 12,
  },
  attractionMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  durationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  durationText: {
    marginLeft: 4,
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  viewOnMapButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#F1F5F9',
  },
  viewOnMapText: {
    marginLeft: 4,
    fontSize: 12,
    fontWeight: '600',
    color: '#2563EB',
  },
  cuisineCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cuisineHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  dishName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B',
    flex: 1,
  },
  specialtyBadge: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  specialtyText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#D97706',
    textTransform: 'uppercase',
  },
  dishDescription: {
    fontSize: 14,
    color: '#64748B',
    lineHeight: 20,
  },
  cultureCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cultureTip: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 8,
  },
  cultureInfo: {
    fontSize: 14,
    color: '#64748B',
    lineHeight: 20,
  },
  transportCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  transportTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 8,
  },
  transportInfo: {
    fontSize: 14,
    color: '#64748B',
    lineHeight: 20,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#EF4444',
    marginBottom: 20,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2563EB',
  },
  bottomSpacing: {
    height: 100,
  },
});