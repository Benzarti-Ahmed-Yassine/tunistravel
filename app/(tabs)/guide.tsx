import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MessageCircle, Utensils, Car, Users, CircleAlert as AlertCircle, Phone, CreditCard, Sun } from 'lucide-react-native';
import { useState } from 'react';
import { useLocalSearchParams } from 'expo-router';

const guideCategories = [
  {
    id: 'phrases',
    title: 'Common Phrases',
    icon: MessageCircle,
    color: '#3B82F6',
    content: [
      { arabic: 'أهلاً وسهلاً', phonetic: 'Ahlan wa sahlan', english: 'Welcome / Hello' },
      { arabic: 'شكراً', phonetic: 'Shukran', english: 'Thank you' },
      { arabic: 'من فضلك', phonetic: 'Min fadlik', english: 'Please' },
      { arabic: 'أعذرني', phonetic: 'A\'dhurni', english: 'Excuse me' },
      { arabic: 'كم الثمن؟', phonetic: 'Kam ath-thaman?', english: 'How much?' },
      { arabic: 'أين الحمام؟', phonetic: 'Ayna al-hammam?', english: 'Where is the bathroom?' },
      { arabic: 'لا أفهم', phonetic: 'La afham', english: 'I don\'t understand' },
      { arabic: 'هل تتكلم الإنجليزية؟', phonetic: 'Hal tatakallam al-ingliziyya?', english: 'Do you speak English?' },
      { arabic: 'أين...؟', phonetic: 'Ayna...?', english: 'Where is...?' },
      { arabic: 'كيف الحال؟', phonetic: 'Kayf al-hal?', english: 'How are you?' },
      { arabic: 'بخير، شكراً', phonetic: 'Bi-khayr, shukran', english: 'Fine, thank you' },
      { arabic: 'مع السلامة', phonetic: 'Ma\'a as-salama', english: 'Goodbye' }
    ]
  },
  {
    id: 'cuisine',
    title: 'Local Cuisine',
    icon: Utensils,
    color: '#10B981',
    content: [
      { name: 'Couscous', description: 'Traditional semolina dish, usually served on Fridays with lamb and vegetables' },
      { name: 'Brik', description: 'Crispy pastry filled with egg, tuna, and herbs - a popular appetizer' },
      { name: 'Harissa', description: 'Spicy chili paste - a Tunisian staple used in many dishes' },
      { name: 'Mechouia', description: 'Grilled vegetable salad with tomatoes, peppers, and onions' },
      { name: 'Makroud', description: 'Sweet semolina pastry filled with dates, especially from Kairouan' },
      { name: 'Mint Tea', description: 'Traditional tea served throughout the day, especially after meals' },
      { name: 'Chorba', description: 'Traditional soup with lamb, vegetables, and spices' },
      { name: 'Ojja', description: 'Spicy tomato and egg dish, often served for breakfast' },
      { name: 'Lablabi', description: 'Chickpea soup with bread, eggs, and harissa' },
      { name: 'Bambalouni', description: 'Traditional Tunisian donuts, often sold by street vendors' }
    ]
  },
  {
    id: 'transport',
    title: 'Transportation',
    icon: Car,
    color: '#8B5CF6',
    content: [
      { title: 'Metro & Tram (Tunis)', info: 'Modern light rail system in Tunis. Tickets: 0.5 TND. Connects major areas.' },
      { title: 'TGM Train', info: 'Connects Tunis to La Marsa via Carthage and Sidi Bou Said. Scenic coastal route.' },
      { title: 'Louages', info: 'Shared taxis for intercity travel. Faster than buses, leave when full.' },
      { title: 'City Taxis', info: 'Yellow taxis in cities. Always negotiate fare beforehand or use meter.' },
      { title: 'Buses (SNTRI)', info: 'National bus company connecting all major cities. Affordable but can be crowded.' },
      { title: 'Car Rental', info: 'International license required. Drive on the right side. Good for exploring rural areas.' },
      { title: 'Domestic Flights', info: 'Limited domestic flights between Tunis, Sfax, and Tozeur.' },
      { title: 'Metro du Sahel', info: 'Light rail in Sousse-Monastir area connecting coastal resorts.' }
    ]
  },
  {
    id: 'culture',
    title: 'Cultural Tips',
    icon: Users,
    color: '#F59E0B',
    content: [
      { tip: 'Greeting Customs', info: 'Handshakes are common. Close friends may kiss on both cheeks. Use right hand for greetings.' },
      { tip: 'Dress Code', info: 'Dress modestly, especially when visiting mosques. Cover shoulders and knees.' },
      { tip: 'Friday Prayer', info: 'Many businesses close during Friday prayers (12-2 PM). Plan accordingly.' },
      { tip: 'Ramadan Etiquette', info: 'Respect fasting hours. Many restaurants close during the day. Avoid eating in public.' },
      { tip: 'Hospitality', info: 'Tunisians are very hospitable. It\'s polite to accept offered tea or coffee.' },
      { tip: 'Bargaining', info: 'Expected in souks and markets. Start at 50% of asking price and negotiate respectfully.' },
      { tip: 'Photography', info: 'Ask permission before photographing people. Avoid military installations.' },
      { tip: 'Tipping', info: 'Round up bills in restaurants. 10% is standard for good service.' },
      { tip: 'Language', info: 'Arabic and French are official languages. Many speak some English in tourist areas.' },
      { tip: 'Time Concept', info: 'Punctuality is appreciated but social events may start later than scheduled.' }
    ]
  }
];

const emergencyInfo = [
  { service: 'Police', number: '197', icon: AlertCircle },
  { service: 'Fire Department', number: '198', icon: AlertCircle },
  { service: 'Medical Emergency', number: '190', icon: Phone },
  { service: 'Tourist Police', number: '71 341 077', icon: Phone },
  { service: 'National Guard', number: '193', icon: AlertCircle },
  { service: 'Civil Protection', number: '198', icon: AlertCircle }
];

export default function GuideTab() {
  const params = useLocalSearchParams();
  const [selectedCategory, setSelectedCategory] = useState(params.category as string || 'phrases');

  const selectedCategoryData = guideCategories.find(cat => cat.id === selectedCategory);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Travel Guide</Text>
        <Text style={styles.headerSubtitle}>Essential information for exploring Tunisia</Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Quick Info Cards */}
        <View style={styles.quickInfoContainer}>
          <View style={styles.quickInfoCard}>
            <CreditCard size={24} color="#2563EB" />
            <Text style={styles.quickInfoTitle}>Currency</Text>
            <Text style={styles.quickInfoValue}>Tunisian Dinar (TND)</Text>
            <Text style={styles.quickInfoDetail}>1 USD ≈ 3.1 TND</Text>
          </View>
          <View style={styles.quickInfoCard}>
            <Sun size={24} color="#F59E0B" />
            <Text style={styles.quickInfoTitle}>Climate</Text>
            <Text style={styles.quickInfoValue}>Mediterranean</Text>
            <Text style={styles.quickInfoDetail}>Hot summers, mild winters</Text>
          </View>
        </View>

        {/* Category Selector */}
        <View style={styles.categorySelector}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {guideCategories.map((category) => {
              const IconComponent = category.icon;
              return (
                <TouchableOpacity
                  key={category.id}
                  style={[
                    styles.categoryButton,
                    selectedCategory === category.id && { backgroundColor: category.color }
                  ]}
                  onPress={() => setSelectedCategory(category.id)}
                >
                  <IconComponent
                    size={20}
                    color={selectedCategory === category.id ? '#FFFFFF' : category.color}
                  />
                  <Text
                    style={[
                      styles.categoryButtonText,
                      selectedCategory === category.id && { color: '#FFFFFF' }
                    ]}
                  >
                    {category.title}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Category Content */}
        {selectedCategoryData && (
          <View style={styles.contentContainer}>
            <Text style={styles.contentTitle}>{selectedCategoryData.title}</Text>
            
            {selectedCategory === 'phrases' && (
              <View>
                {selectedCategoryData.content.map((phrase, index) => (
                  <View key={index} style={styles.phraseCard}>
                    <Text style={styles.arabicText}>{phrase.arabic}</Text>
                    <Text style={styles.phoneticText}>{phrase.phonetic}</Text>
                    <Text style={styles.englishText}>{phrase.english}</Text>
                  </View>
                ))}
              </View>
            )}

            {selectedCategory === 'cuisine' && (
              <View>
                {selectedCategoryData.content.map((dish, index) => (
                  <View key={index} style={styles.cuisineCard}>
                    <Text style={styles.dishName}>{dish.name}</Text>
                    <Text style={styles.dishDescription}>{dish.description}</Text>
                  </View>
                ))}
              </View>
            )}

            {selectedCategory === 'transport' && (
              <View>
                {selectedCategoryData.content.map((transport, index) => (
                  <View key={index} style={styles.transportCard}>
                    <Text style={styles.transportTitle}>{transport.title}</Text>
                    <Text style={styles.transportInfo}>{transport.info}</Text>
                  </View>
                ))}
              </View>
            )}

            {selectedCategory === 'culture' && (
              <View>
                {selectedCategoryData.content.map((culture, index) => (
                  <View key={index} style={styles.cultureCard}>
                    <Text style={styles.cultureTip}>{culture.tip}</Text>
                    <Text style={styles.cultureInfo}>{culture.info}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        )}

        {/* Emergency Information */}
        <View style={styles.emergencyContainer}>
          <Text style={styles.emergencyTitle}>Emergency Contacts</Text>
          {emergencyInfo.map((emergency, index) => {
            const IconComponent = emergency.icon;
            return (
              <View key={index} style={styles.emergencyCard}>
                <IconComponent size={20} color="#EF4444" />
                <View style={styles.emergencyInfo}>
                  <Text style={styles.emergencyService}>{emergency.service}</Text>
                  <Text style={styles.emergencyNumber}>{emergency.number}</Text>
                </View>
                <TouchableOpacity style={styles.callButton}>
                  <Phone size={16} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
            );
          })}
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
  header: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1E293B',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 4,
  },
  scrollView: {
    flex: 1,
  },
  quickInfoContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
  },
  quickInfoCard: {
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
  quickInfoTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
    marginTop: 8,
    textTransform: 'uppercase',
  },
  quickInfoValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B',
    marginTop: 4,
  },
  quickInfoDetail: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  categorySelector: {
    paddingVertical: 16,
    paddingLeft: 20,
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
  categoryButtonText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '600',
    color: '#64748B',
  },
  contentContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  contentTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 16,
  },
  phraseCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  arabicText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
    textAlign: 'right',
    marginBottom: 4,
  },
  phoneticText: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#2563EB',
    marginBottom: 4,
  },
  englishText: {
    fontSize: 14,
    color: '#64748B',
  },
  cuisineCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  dishName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 4,
  },
  dishDescription: {
    fontSize: 14,
    color: '#64748B',
    lineHeight: 20,
  },
  transportCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
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
    marginBottom: 4,
  },
  transportInfo: {
    fontSize: 14,
    color: '#64748B',
    lineHeight: 20,
  },
  cultureCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
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
    marginBottom: 4,
  },
  cultureInfo: {
    fontSize: 14,
    color: '#64748B',
    lineHeight: 20,
  },
  emergencyContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  emergencyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 16,
  },
  emergencyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  emergencyInfo: {
    flex: 1,
    marginLeft: 12,
  },
  emergencyService: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
  },
  emergencyNumber: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 2,
  },
  callButton: {
    backgroundColor: '#EF4444',
    borderRadius: 20,
    padding: 8,
  },
  bottomSpacing: {
    height: 100,
  },
});