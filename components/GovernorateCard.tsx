import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { MapPin, Star } from 'lucide-react-native';
import { Governorate } from '@/data/governorates';
import { useTheme } from '@/contexts/ThemeContext';

interface GovernorateCardProps {
  governorate: Governorate;
  onPress: () => void;
}

export default function GovernorateCard({ governorate, onPress }: GovernorateCardProps) {
  const { theme, isDark } = useTheme();
  const styles = createStyles(theme, isDark);

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: governorate.image }} style={styles.image} />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name}>{governorate.name}</Text>
          <Text style={styles.nameArabic}>{governorate.nameArabic}</Text>
        </View>
        <Text style={styles.capital}>Capital: {governorate.capital}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {governorate.description}
        </Text>
        <View style={styles.footer}>
          <View style={styles.locationInfo}>
            <MapPin size={14} color={theme.colors.textSecondary} />
            <Text style={styles.attractionsCount}>
              {governorate.attractions.length} attractions
            </Text>
          </View>
          {governorate.attractions.length > 0 && (
            <View style={styles.ratingContainer}>
              <Star size={14} color="#F59E0B" fill="#F59E0B" />
              <Text style={styles.rating}>
                {(governorate.attractions.reduce((sum, attr) => sum + attr.rating, 0) / governorate.attractions.length).toFixed(1)}
              </Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const createStyles = (theme: any, isDark: boolean) => StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: 16,
    marginHorizontal: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: isDark ? 0.3 : 0.08,
    shadowRadius: 12,
    elevation: 4,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 160,
    resizeMode: 'cover',
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.text,
    flex: 1,
  },
  nameArabic: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.primary,
    textAlign: 'right',
  },
  capital: {
    fontSize: 12,
    color: theme.colors.primary,
    fontWeight: '600',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  description: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    lineHeight: 20,
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  locationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  attractionsCount: {
    marginLeft: 4,
    fontSize: 12,
    color: theme.colors.textSecondary,
    fontWeight: '500',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    marginLeft: 4,
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.text,
  },
});