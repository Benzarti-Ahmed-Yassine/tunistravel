import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, MapPin, Compass, BookOpen, Bell } from 'lucide-react-native';
import { useState, useEffect } from 'react';
import { router } from 'expo-router';
import GovernorateCard from '@/components/GovernorateCard';
import { governorates } from '@/data/governorates';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { useNotifications } from '@/contexts/NotificationContext';

const quickGuides = [
  { 
    title: 'Phrases arabes essentielles', 
    icon: '🗣️', 
    color: '#F59E0B',
    route: '/guide?category=phrases'
  },
  { 
    title: 'Guide de la cuisine locale', 
    icon: '🍽️', 
    color: '#10B981',
    route: '/guide?category=cuisine'
  },
  { 
    title: 'Conseils de transport', 
    icon: '🚌', 
    color: '#8B5CF6',
    route: '/guide?category=transport'
  },
  { 
    title: 'Étiquette culturelle', 
    icon: '🤝', 
    color: '#EF4444',
    route: '/guide?category=culture'
  }
];

export default function DiscoverTab() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());
  const { theme, isDark } = useTheme();
  const { user } = useAuth();
  const { scheduleLocalNotification } = useNotifications();

  const styles = createStyles(theme, isDark);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Welcome notification for new users
    if (user) {
      scheduleLocalNotification(
        'Bienvenue en Tunisie! 🇹🇳',
        'Découvrez les merveilles de la Tunisie avec notre guide de voyage.'
      );
    }
  }, [user]);

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

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Bonjour';
    if (hour < 18) return 'Bon après-midi';
    return 'Bonsoir';
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.greetingText}>{getGreeting()}</Text>
              <Text style={styles.userNameText}>{user?.name || 'Voyageur'}</Text>
            </View>
            <TouchableOpacity style={styles.notificationButton}>
              <Bell size={24} color={theme.colors.text} />
            </TouchableOpacity>
          </View>
          <Text style={styles.tunisiaText}>Découvrir la Tunisie</Text>
          <Text style={styles.subtitle}>Explorez les 24 gouvernorats de la Tunisie</Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Search size={20} color={theme.colors.textSecondary} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Rechercher gouvernorats, villes, attractions..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor={theme.colors.textSecondary}
          />
        </View>

        {/* Quick Guides */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Guides rapides</Text>
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
            <MapPin size={24} color={theme.colors.primary} />
            <Text style={styles.statNumber}>24</Text>
            <Text style={styles.statLabel}>Gouvernorats</Text>
          </View>
          <View style={styles.statCard}>
            <Compass size={24} color={theme.colors.secondary} />
            <Text style={styles.statNumber}>{governorates.reduce((sum, gov) => sum + gov.attractions.length, 0)}</Text>
            <Text style={styles.statLabel}>Attractions</Text>
          </View>
          <View style={styles.statCard}>
            <BookOpen size={24} color={theme.colors.warning} />
            <Text style={styles.statNumber}>{governorates.reduce((sum, gov) => sum + gov.cuisine.length, 0)}</Text>
            <Text style={styles.statLabel}>Plats locaux</Text>
          </View>
        </View>

        {/* Governorates */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>
            {searchQuery ? `Résultats de recherche (${filteredGovernorates.length})` : 'Tous les gouvernorats'}
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
          <Text style={styles.weatherTitle}>Aujourd'hui en Tunisie</Text>
          <View style={styles.weatherInfo}>
            <Text style={styles.temperature}>24°C</Text>
            <View style={styles.weatherDetails}>
              <Text style={styles.weatherCondition}>Ensoleillé</Text>
              <Text style={styles.weatherDescription}>Parfait pour explorer</Text>
              <Text style={styles.timeText}>
                {currentTime.toLocaleTimeString('fr-FR', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </Text>
            </View>
          </View>
        </View>

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
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  greetingText: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    fontWeight: '400',
  },
  userNameText: {
    fontSize: 20,
    fontWeight: '700',
    color: theme.colors.text,
  },
  notificationButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: isDark ? '#334155' : '#F1F5F9',
  },
  tunisiaText: {
    fontSize: 32,
    fontWeight: '700',
    color: theme.colors.text,
    marginVertical: 4,
  },
  subtitle: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    fontWeight: '400',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    margin: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: isDark ? 0.3 : 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: theme.colors.text,
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: theme.colors.text,
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  quickGuidesContainer: {
    paddingLeft: 20,
  },
  quickGuideCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    width: 140,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: isDark ? 0.3 : 0.05,
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
    color: theme.colors.text,
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
    backgroundColor: theme.colors.surface,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: isDark ? 0.3 : 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: theme.colors.text,
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginTop: 4,
    textAlign: 'center',
  },
  weatherContainer: {
    backgroundColor: theme.colors.primary,
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
  timeText: {
    fontSize: 12,
    color: '#BFDBFE',
    marginTop: 4,
  },
  bottomSpacing: {
    height: 100,
  },
});