import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, MapPin, Compass, BookOpen } from 'lucide-react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import GovernorateCard from '@/components/GovernorateCard';
import { governorates } from '@/data/governorates';

const quickGuides = [
  { 
    title: 'Essential Arabic Phrases', 
    icon: '🗣️', 
    color: '#F59E0B',
    route: '/guide?category=phrases'
  },
  { 
    title: 'Local Cuisine Guide', 
    icon: '🍽️', 
    color: '#10B981',
    route: '/guide?category=cuisine'
  },
  { 
    title: 'Transportation Tips', 
    icon: '🚌', 
    color: '#8B5CF6',
    route: '/guide?category=transport'
  },
  { 
    title: 'Cultural Etiquette', 
    icon: '🤝', 
    color: '#EF4444',
    route: '/guide?category=culture'
  }
];

export default function DiscoverTab() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredGovernorates = governorates.filter(gov =>
    gov.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    gov.nameArabic.includes(searchQuery) ||
    gov.capital.toLowerCase().includes(searchQuery.toLowerCase()) ||
    gov.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleQuickGuidePress = (guide: typeof quickGuides[0]) => {
    router.push('/guide');
  };

  const handleGovernoratePress = (governorateId: string) => {
    router.push(`/governorate/${governorateId}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.welcomeText}>Discover</Text>
          <Text style={styles.tunisiaText}>Tunisia</Text>
          <Text style={styles.subtitle}>Explore all 24 governorates of Tunisia</Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Search size={20} color="#64748B" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search governorates, cities, attractions..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#64748B"
          />
        </View>

        {/* Quick Guides */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Quick Guides</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.quickGuidesContainer}>
            {quickGuides.map((guide, index) => (
              <TouchableOpacity 
                key={index} 
                style={[styles.quickGuideCard, { borderLeftColor: guide.color }]}
                onPress={() => handleQuickGuidePress(guide)}
              >
                <Text style={styles.quickGuideIcon}>{guide.icon}</Text>
                <Text style={styles.quickGuideTitle}>{guide.title}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Statistics */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <MapPin size={24} color="#2563EB" />
            <Text style={styles.statNumber}>24</Text>
            <Text style={styles.statLabel}>Governorates</Text>
          </View>
          <View style={styles.statCard}>
            <Compass size={24} color="#10B981" />
            <Text style={styles.statNumber}>{governorates.reduce((sum, gov) => sum + gov.attractions.length, 0)}</Text>
            <Text style={styles.statLabel}>Attractions</Text>
          </View>
          <View style={styles.statCard}>
            <BookOpen size={24} color="#F59E0B" />
            <Text style={styles.statNumber}>{governorates.reduce((sum, gov) => sum + gov.cuisine.length, 0)}</Text>
            <Text style={styles.statLabel}>Local Dishes</Text>
          </View>
        </View>

        {/* Governorates */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>
            {searchQuery ? `Search Results (${filteredGovernorates.length})` : 'All Governorates'}
          </Text>
          {filteredGovernorates.map((governorate) => (
            <GovernorateCard
              key={governorate.id}
              governorate={governorate}
              onPress={() => handleGovernoratePress(governorate.id)}
            />
          ))}
        </View>

        {/* Weather Widget */}
        <View style={styles.weatherContainer}>
          <Text style={styles.weatherTitle}>Today in Tunisia</Text>
          <View style={styles.weatherInfo}>
            <Text style={styles.temperature}>24°C</Text>
            <View style={styles.weatherDetails}>
              <Text style={styles.weatherCondition}>Sunny</Text>
              <Text style={styles.weatherDescription}>Perfect for exploring</Text>
            </View>
          </View>
        </View>

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
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  welcomeText: {
    fontSize: 16,
    color: '#64748B',
    fontWeight: '400',
  },
  tunisiaText: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1E293B',
    marginVertical: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '400',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    margin: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1E293B',
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1E293B',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  quickGuidesContainer: {
    paddingLeft: 20,
  },
  quickGuideCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    width: 140,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  quickGuideIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  quickGuideTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E293B',
    lineHeight: 18,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1E293B',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 4,
    textAlign: 'center',
  },
  weatherContainer: {
    backgroundColor: '#2563EB',
    borderRadius: 16,
    padding: 20,
    margin: 20,
    marginBottom: 20,
  },
  weatherTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  weatherInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  temperature: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
    marginRight: 16,
  },
  weatherDetails: {
    flex: 1,
  },
  weatherCondition: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  weatherDescription: {
    fontSize: 14,
    color: '#BFDBFE',
    marginTop: 2,
  },
  bottomSpacing: {
    height: 100,
  },
});