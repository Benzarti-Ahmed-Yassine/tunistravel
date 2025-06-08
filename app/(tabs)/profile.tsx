import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, Settings, Heart, MapPin, Bell, Globe, Moon, CircleHelp as HelpCircle, LogOut } from 'lucide-react-native';
import { useState } from 'react';

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

const menuItems = [
  { title: 'Notifications', icon: Bell, hasSwitch: true },
  { title: 'Language', icon: Globe, subtitle: 'English', hasArrow: true },
  { title: 'Dark Mode', icon: Moon, hasSwitch: true },
  { title: 'Help & Support', icon: HelpCircle, hasArrow: true },
];

export default function ProfileTab() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.profileImageContainer}>
            <User size={40} color="#FFFFFF" />
          </View>
          <Text style={styles.profileName}>Welcome, Traveler!</Text>
          <Text style={styles.profileSubtitle}>Exploring the beauty of Tunisia</Text>
          <TouchableOpacity style={styles.editProfileButton}>
            <Settings size={16} color="#2563EB" />
            <Text style={styles.editProfileText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Trip Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <MapPin size={20} color="#2563EB" />
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Places Visited</Text>
          </View>
          <View style={styles.statCard}>
            <Heart size={20} color="#EF4444" />
            <Text style={styles.statNumber}>8</Text>
            <Text style={styles.statLabel}>Favorites</Text>
          </View>
        </View>

        {/* Saved Places */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Saved Places</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
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
          <Text style={styles.sectionTitle}>Travel Preferences</Text>
          <View style={styles.preferencesContainer}>
            <TouchableOpacity style={styles.preferenceChip}>
              <Text style={styles.preferenceText}>🏛️ Historical Sites</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.preferenceChip}>
              <Text style={styles.preferenceText}>🏖️ Beaches</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.preferenceChip}>
              <Text style={styles.preferenceText}>🍽️ Local Cuisine</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.preferenceChip}>
              <Text style={styles.preferenceText}>🛍️ Shopping</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Settings Menu */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          <View style={styles.menuContainer}>
            {menuItems.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <TouchableOpacity key={index} style={styles.menuItem}>
                  <View style={styles.menuItemLeft}>
                    <IconComponent size={20} color="#64748B" />
                    <View style={styles.menuItemText}>
                      <Text style={styles.menuItemTitle}>{item.title}</Text>
                      {item.subtitle && (
                        <Text style={styles.menuItemSubtitle}>{item.subtitle}</Text>
                      )}
                    </View>
                  </View>
                  {item.hasSwitch && item.title === 'Notifications' && (
                    <Switch
                      value={notifications}
                      onValueChange={setNotifications}
                      thumbColor="#FFFFFF"
                      trackColor={{ true: '#2563EB', false: '#CBD5E1' }}
                    />
                  )}
                  {item.hasSwitch && item.title === 'Dark Mode' && (
                    <Switch
                      value={darkMode}
                      onValueChange={setDarkMode}
                      thumbColor="#FFFFFF"
                      trackColor={{ true: '#2563EB', false: '#CBD5E1' }}
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
          <Text style={styles.sectionTitle}>About</Text>
          <View style={styles.aboutContainer}>
            <Text style={styles.aboutText}>
              Tunisia Travel Guide helps you discover the rich culture, history, and beauty of Tunisia. 
              From ancient Carthage to the blue and white streets of Sidi Bou Said, explore it all with confidence.
            </Text>
            <Text style={styles.versionText}>Version 1.0.0</Text>
          </View>
        </View>

        {/* Sign Out */}
        <TouchableOpacity style={styles.signOutButton}>
          <LogOut size={20} color="#EF4444" />
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>

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
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 32,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  profileImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#2563EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  profileName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 4,
  },
  profileSubtitle: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 16,
  },
  editProfileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
  },
  editProfileText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '600',
    color: '#2563EB',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
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
    color: '#1E293B',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2563EB',
  },
  savedPlacesContainer: {
    paddingLeft: 20,
  },
  savedPlaceCard: {
    width: 120,
    marginRight: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
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
    color: '#1E293B',
    marginBottom: 2,
  },
  savedPlaceType: {
    fontSize: 10,
    color: '#64748B',
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
    backgroundColor: '#F1F5F9',
  },
  preferenceText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#1E293B',
  },
  menuContainer: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
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
    borderBottomColor: '#F1F5F9',
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
    color: '#1E293B',
  },
  menuItemSubtitle: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  arrowText: {
    fontSize: 20,
    color: '#CBD5E1',
  },
  aboutContainer: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  aboutText: {
    fontSize: 14,
    color: '#64748B',
    lineHeight: 20,
    marginBottom: 12,
  },
  versionText: {
    fontSize: 12,
    color: '#94A3B8',
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  signOutText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
    color: '#EF4444',
  },
  bottomSpacing: {
    height: 100,
  },
});