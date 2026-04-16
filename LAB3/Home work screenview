import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const App = () => {
  const [currentScreen, setCurrentScreen] = useState('hotels'); // 'hotels' or 'payment'

const hotelData = [
  {
    id: 1,
    name: 'The Leela Palace',
    location: 'Bangalore, India',
    price: '18,000',
    rating: 5,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJLeYjYpdbBeMgTHxQu9TXyfSeIydgj5g8Ng&s'
  },
  {
    id: 2,
    name: 'ITC Gardenia',
    location: 'Bangalore, India',
    price: '15,500',
    rating: 5,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR31L9HXE5P_pQUWGsk2r-u0hgHJlMs1GM8eQ&s'
  },
  {
    id: 3,
    name: 'Taj MG Road',
    location: 'Bangalore, India',
    price: '12,000',
    rating: 4,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8xyH-EASsVTe_MIICr4nrncFteHx2DodQOQ&s'
  },
  {
    id: 4,
    name: 'Radisson Blu Atria',
    location: 'Bangalore, India',
    price: '10,500',
    rating: 4,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQODaoJ0hmujQ51NspyPsvkfKjRe69VOsyJUg&s'
  },
  {
    id: 5,
    name: 'The Oberoi',
    location: 'Bangalore, India',
    price: '20,000',
    rating: 5,
    image: 'https://pix10.agoda.net/hotelImages/889/8898/8898_15052116370027673159.jpg?ca=13&ce=1&s=414x232'
  },
  {
    id: 6,
    name: 'The Chancery Pavilion',
    location: 'Bangalore, India',
    price: '9,500',
    rating: 4,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT82CNHmcNg1-9w7pc7mL_duYvrHOMlO6k09g&s'
  },
  {
    id: 7,
    name: 'Empire Hotel',
    location: 'Bangalore, India',
    price: '3,500',
    rating: 3,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeNMUPqa7ghOnVPXFBfC0IQB4L2wD2Ixwdew&s'
  },
  {
    id: 8,
    name: 'Holiday Inn Bengaluru Racecourse',
    location: 'Bangalore, India',
    price: '8,000',
    rating: 4,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_-Au6ryTzjgxcOnbmtGuXq-lAfTsJeNzbvQ&s'
  }
];


const PaymentScreen: React.FC = () => {
    return (
      <View style={styles.paymentContainer}>
        <Text style={styles.paymentHeader}>Payment</Text>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Timer */}
          <Text style={styles.timer}>
            Complete your booking in 00:30:00
          </Text>

          {/* Transfer Bank */}
          <Text style={styles.sectionTitle}>Transfer Bank</Text>
          {[
            { name: "State Bank of India (SBI)", acc: "XXXX1234" },
            { name: "HDFC Bank", acc: "XXXX5678" },
            { name: "ICICI Bank", acc: "XXXX9876" },
            { name: "Axis Bank", acc: "XXXX4321" },
          ].map((bank, index) => (
            <TouchableOpacity key={index} style={styles.optionCard}>
              <View>
                <Text style={styles.optionText}>{bank.name}</Text>
                <Text style={styles.subText}>Account No: {bank.acc}</Text>
              </View>
              <Text style={styles.arrow}>›</Text>
            </TouchableOpacity>
          ))}

          {/* UPI Payment */}
          <Text style={styles.sectionTitle}>UPI Payment</Text>
          {[
            "Google Pay",
            "PhonePe",
            "Paytm",
            "BHIM UPI",
          ].map((upi, index) => (
            <TouchableOpacity key={index} style={styles.optionCard}>
              <Text style={styles.optionText}>{upi}</Text>
              <Text style={styles.arrow}>›</Text>
            </TouchableOpacity>
          ))}

          {/* Virtual Account */}
          <Text style={styles.sectionTitle}>Virtual Account</Text>
          {[
            "SBI Virtual Account",
            "HDFC Virtual Account",
            "ICICI Virtual Account",
          ].map((va, index) => (
            <TouchableOpacity key={index} style={styles.optionCard}>
              <Text style={styles.optionText}>{va}</Text>
              <Text style={styles.arrow}>›</Text>
            </TouchableOpacity>
          ))}

          {/* EMI / Pay Later */}
          <Text style={styles.sectionTitle}>EMI / Pay Later</Text>
          {[
            "Bajaj Finserv EMI",
            "Simpl Pay Later",
            "LazyPay",
          ].map((emi, index) => (
            <TouchableOpacity key={index} style={styles.optionCard}>
              <Text style={styles.optionText}>{emi}</Text>
              <Text style={styles.arrow}>›</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  };

  const renderHotel = ({ item }: { item: typeof hotelData[0] }) => (
    <TouchableOpacity
      style={styles.hotelCard}
      onPress={() => setCurrentScreen('payment')}
    >
      <Image
        source={{ uri: item.image }}
        style={styles.hotelImage}
      />
      <View style={styles.hotelInfo}>
        <Text style={styles.hotelName}>{item.name}</Text>
        <View style={styles.locationRow}>
          <Text style={styles.locationIcon}>📍</Text>
          <Text style={styles.location}>{item.location}</Text>
        </View>
        <View style={styles.ratingRow}>
          <Text style={styles.stars}>{'★'.repeat(item.rating)}</Text>
        </View>
      </View>
      <Text style={styles.price}>₹ {item.price}</Text>
    </TouchableOpacity>
  );

  if (currentScreen === 'payment') {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.paymentHeaderBar}>
          <TouchableOpacity onPress={() => setCurrentScreen('hotels')}>
            <Text style={styles.backButton}>←</Text>
          </TouchableOpacity>
          <Text style={styles.paymentHeaderTitle}>Payment</Text>
        </View>
        <PaymentScreen />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.hotelHeader}>
        <Text style={styles.headerTitle}>Hotel</Text>
      </View>

      <FlatList
        data={hotelData}
        renderItem={renderHotel}
        keyExtractor={(item) => item.id.toString()}
        scrollEnabled={true}
        contentContainerStyle={styles.hotelListContainer}
      />
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },

  // Hotel Screen Styles
  hotelHeader: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#000',
  },

  hotelListContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },

  hotelCard: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    marginBottom: 12,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e8e8e8',
  },

  hotelImage: {
    width: 90,
    height: 90,
    borderRadius: 10,
    marginRight: 12,
  },

  hotelInfo: {
    flex: 1,
  },

  hotelName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 6,
  },

  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },

  locationIcon: {
    fontSize: 12,
    marginRight: 4,
  },

  location: {
    fontSize: 12,
    color: '#999',
  },

  ratingRow: {
    flexDirection: 'row',
  },

  stars: {
    fontSize: 14,
    color: '#FFB800',
  },

  price: {
    fontSize: 18,
    fontWeight: '700',
    color: '#8B5CF6',
    marginLeft: 10,
  },

  // Payment Screen Styles
  paymentHeaderBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#8B5CF6',
  },

  backButton: {
    fontSize: 28,
    color: '#fff',
    marginRight: 16,
  },

  paymentHeaderTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
  },

  paymentContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },

  paymentHeader: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },

  timer: {
    fontSize: 14,
    color: '#666',
    marginHorizontal: 16,
    marginVertical: 16,
    textAlign: 'center',
  },

  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 12,
  },

  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },

  optionText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#333',
  },

  subText: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },

  arrow: {
    fontSize: 20,
    color: '#8B5CF6',
    fontWeight: 'bold',
  },
});
