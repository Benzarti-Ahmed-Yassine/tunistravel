import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Switch, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, Settings, Heart, MapPin, Bell, Globe, Moon, CircleHelp as HelpCircle, LogOut, CreditCard as Edit } from 'lucide-react-native';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useNotifications } from '@/contexts/NotificationContext';
import { router } from 'expo-router';

const savedPlaces = [
  {
    id: 1,
    name: 'Sidi Bou Said',
    image: 'https://images.pexels.com/photos/2549018/pexels-photo-2549018.jpeg?auto=compress&cs=tinysrgb&w=200',
    type: 'Historic Village'
  },
  {
    id: 2,
    name: 'Carthage Ruins',
    image: 'https://images.pexels.com/photos/17829148/pexels-photo-17829148.jpeg?auto=compress&cs=tinysrgb&w=200',
    type: 'Archaeological Site'
  },
  {
    id: 3,
    name: 'Tunis Medina',
    image: 'https://images.pexels.com/photos/9552935/pexels-photo-9552935.jpeg?auto=compress&cs=tinysrgb&w=200',
    type: 'Historic District'
  }
];

export default function ProfileTab() {
  const { user, logout } = useAuth();
  const { theme, themeMode, setThemeMode, isDark } = useTheme();
  const { notificationsEnabled, setNotificationsEnabled } = useNotifications();

  const styles = createStyles(theme, isDark);

  const handleLogout = () => {
    Alert.alert(
      'Déconnexion',
      'Êtes-vous sûr de vouloir vous déconnecter ?',
      [
        { text: 'Annuler', style: 'cancel' },
        { 
          text: 'Déconnexion', 
          style: 'destructive',
          onPress: async () => {
            await logout();
            router.replace('/(auth)/login');
          }
        }
      ]
    );
  };

  const handleThemeChange = (value: boolean) => {
    setThemeMode(value ? 'dark' : 'light');
  };

  const menuItems = [
    { 
      title: 'Notifications', 
      icon: Bell, 
      hasSwitch: true,
      value: notificationsEnabled,
      onToggle: setNotificationsEnabled
    },
    { 
      title: 'Langue', 
      icon: Globe, 
      subtitle: 'Français', 
      hasArrow: true,
      onPress: () => Alert.alert('Langue', 'Fonctionnalité à venir')
    },
    { 
      title: 'Mode sombre', 
      icon: Moon, 
      hasSwitch: true,
      value: themeMode === 'dark' || (themeMode === 'system' && isDark),
      onToggle: handleThemeChange
    },
    { 
      title: 'Aide & Support', 
      icon: HelpCircle, 
      hasArrow: true,
      onPress: () => Alert.alert('Aide', 'Contactez-nous à support@tunisia-travel.com')
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.profileImageContainer}>
            {user?.avatar ? (
              <Image source={{ uri: user.avatar }} style={styles.profileImage} />
            ) : (
              <User size={40} color="#FFFFFF" />
            )}
          </View>
          <Text style={styles.profileName}>{user?.name || 'Voyageur'}</Text>
          <Text style={styles.profileEmail}>{user?.email}</Text>
          <TouchableOpacity style={styles.editProfileButton}>
            <Edit size={16} color={theme.colors.primary} />
            <Text style={styles.editProfileText}>Modifier le profil</Text>
          </TouchableOpacity>
        </View>

        {/* Trip Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <MapPin size={20} color={theme.colors.primary} />
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Lieux visités</Text>
          </View>
          <View style={styles.statCard}>
            <Heart size={20} color={theme.colors.error} />
            <Text style={styles.statNumber}>8</Text>
            <Text style={styles.statLabel}>Favoris</Text>
          </View>
        </View>

        {/* Saved Places */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Lieux sauvegardés</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>Voir tout</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.savedPlacesContainer}>
            {savedPlaces.map((place) => (
              <TouchableOpacity key={place.id} style={styles.savedPlaceCard}>
                <Image source={{ uri: place.image }} style={styles.savedPlaceImage} />
                <View style={styles.savedPlaceInfo}>
                  <Text style={styles.savedPlaceName}>{place.name}</Text>
                  <Text style={styles.savedPlaceType}>{place.type}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Travel Preferences */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Préférences de voyage</Text>
          <View style={styles.preferencesContainer}>
            <TouchableOpacity style={styles.preferenceChip}>
              <Text style={styles.preferenceText}>🏛️ Sites historiques</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.preferenceChip}>
              <Text style={styles.preferenceText}>🏖️ Plages</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.preferenceChip}>
              <Text style={styles.preferenceText}>🍽️ Cuisine locale</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.preferenceChip}>
              <Text style={styles.preferenceText}>🛍️ Shopping</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Settings Menu */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Paramètres</Text>
          <View style={styles.menuContainer}>
            {menuItems.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <TouchableOpacity 
                  key={index} 
                  style={styles.menuItem}
                  onPress={item.onPress}
                >
                  <View style={styles.menuItemLeft}>
                    <IconComponent size={20} color={theme.colors.textSecondary} />
                    <View style={styles.menuItemText}>
                      <Text style={styles.menuItemTitle}>{item.title}</Text>
                      {item.subtitle && (
                        <Text style={styles.menuItemSubtitle}>{item.subtitle}</Text>
                      )}
                    </View>
                  </View>
                  {item.hasSwitch && (
                    <Switch
                      value={item.value}
                      onValueChange={item.onToggle}
                      thumbColor="#FFFFFF"
                      trackColor={{ true: theme.colors.primary, false: theme.colors.border }}
                    />
                  )}
                  {item.hasArrow && (
                    <Text style={styles.arrowText}>›</Text>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* About Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>À propos</Text>
          <View style={styles.aboutContainer}>
            <Text style={styles.aboutText}>
              Tunisia Travel Guide vous aide à découvrir la richesse culturelle, l'histoire et la beauté de la Tunisie. 
              De l'ancienne Carthage aux rues bleues et blanches de Sidi Bou Said, explorez tout en toute confiance.
            </Text>
            <Text style={styles.versionText}>Version 1.0.0</Text>
          </View>
        </View>

        {/* Sign Out */}
        <TouchableOpacity style={styles.signOutButton} onPress={handleLogout}>
          <LogOut size={20} color={theme.colors.error} />
          <Text style={styles.signOutText}>Se déconnecter</Text>
        </TouchableOpacity>

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
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 32,
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  profileImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    overflow: 'hidden',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileName: {
    fontSize: 24,
    fontWeight: '700',
    color: theme.colors.text,
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginBottom: 16,
  },
  editProfileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: isDark ? '#334155' : '#F1F5F9',
  },
  editProfileText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.primary,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: theme.colors.surface,
    borderRadius: 12,
    padding: 20,
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
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.text,
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.primary,
  },
  savedPlacesContainer: {
    paddingLeft: 20,
  },
  savedPlaceCard: {
    width: 120,
    marginRight: 12,
    backgroundColor: theme.colors.surface,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: isDark ? 0.3 : 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  savedPlaceImage: {
    width: '100%',
    height: 80,
    resizeMode: 'cover',
  },
  savedPlaceInfo: {
    padding: 12,
  },
  savedPlaceName: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 2,
  },
  savedPlaceType: {
    fontSize: 10,
    color: theme.colors.textSecondary,
  },
  preferencesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    gap: 8,
  },
  preferenceChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: isDark ? '#334155' : '#F1F5F9',
  },
  preferenceText: {
    fontSize: 12,
    fontWeight: '500',
    color: theme.colors.text,
  },
  menuContainer: {
    backgroundColor: theme.colors.surface,
    marginHorizontal: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: isDark ? 0.3 : 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuItemText: {
    marginLeft: 12,
  },
  menuItemTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: theme.colors.text,
  },
  menuItemSubtitle: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginTop: 2,
  },
  arrowText: {
    fontSize: 20,
    color: theme.colors.border,
  },
  aboutContainer: {
    backgroundColor: theme.colors.surface,
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: isDark ? 0.3 : 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  aboutText: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    lineHeight: 20,
    marginBottom: 12,
  },
  versionText: {
    fontSize: 12,
    color: theme.colors.textSecondary,
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: isDark ? '#7F1D1D' : '#FEF2F2',
    borderWidth: 1,
    borderColor: isDark ? '#DC2626' : '#FECACA',
  },
  signOutText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.error,
  },
  bottomSpacing: {
    height: 100,
  },
});