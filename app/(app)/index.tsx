import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapView, { Marker } from 'react-native-maps';
import { Car, RotateCw, Users } from 'lucide-react-native';

const VEHICLE_TYPES = [
  { id: 'standard', name: 'Standard', price: 1.5, icon: Car },
  { id: 'premium', name: 'Premium', price: 2.0, icon: Car },
  { id: 'shared', name: 'Shared', price: 1.0, icon: Users },
];

const TRIP_TYPES = [
  { id: 'oneWay', name: 'One Way' },
  { id: 'roundTrip', name: 'Round Trip' },
  { id: 'shared', name: 'Shared Ride' },
];

export default function Home() {
  const [selectedVehicle, setSelectedVehicle] = useState(VEHICLE_TYPES[0]);
  const [selectedTripType, setSelectedTripType] = useState(TRIP_TYPES[0]);
  const [pickup, setPickup] = useState(null);
  const [dropoff, setDropoff] = useState(null);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />

      <View style={styles.searchContainer}>
        <GooglePlacesAutocomplete
          placeholder="Pickup location"
          onPress={(data, details = null) => setPickup(details)}
          styles={{
            container: styles.autocompleteContainer,
            textInput: styles.autocompleteInput,
          }}
          query={{
            key: 'YOUR_GOOGLE_MAPS_API_KEY',
            language: 'en',
          }}
        />

        <GooglePlacesAutocomplete
          placeholder="Drop-off location"
          onPress={(data, details = null) => setDropoff(details)}
          styles={{
            container: styles.autocompleteContainer,
            textInput: styles.autocompleteInput,
          }}
          query={{
            key: 'YOUR_GOOGLE_MAPS_API_KEY',
            language: 'en',
          }}
        />
      </View>

      <View style={styles.tripTypeContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {TRIP_TYPES.map((type) => (
            <TouchableOpacity
              key={type.id}
              style={[
                styles.tripTypeButton,
                selectedTripType.id === type.id && styles.tripTypeButtonSelected,
              ]}
              onPress={() => setSelectedTripType(type)}>
              <Text
                style={[
                  styles.tripTypeText,
                  selectedTripType.id === type.id && styles.tripTypeTextSelected,
                ]}>
                {type.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.bottomSheet}>
        <Text style={styles.bottomSheetTitle}>Select Vehicle Type</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {VEHICLE_TYPES.map((vehicle) => (
            <TouchableOpacity
              key={vehicle.id}
              style={[
                styles.vehicleCard,
                selectedVehicle.id === vehicle.id && styles.vehicleCardSelected,
              ]}
              onPress={() => setSelectedVehicle(vehicle)}>
              <vehicle.icon
                size={24}
                color={selectedVehicle.id === vehicle.id ? '#fff' : '#0f172a'}
              />
              <Text
                style={[
                  styles.vehicleName,
                  selectedVehicle.id === vehicle.id && styles.vehicleNameSelected,
                ]}>
                {vehicle.name}
              </Text>
              <Text
                style={[
                  styles.vehiclePrice,
                  selectedVehicle.id === vehicle.id && styles.vehiclePriceSelected,
                ]}>
                ${vehicle.price}/km
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <TouchableOpacity style={styles.bookButton}>
          <Text style={styles.bookButtonText}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  map: {
    flex: 1,
  },
  searchContainer: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    gap: 10,
  },
  autocompleteContainer: {
    flex: 0,
  },
  autocompleteInput: {
    height: 50,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    fontFamily: 'Inter-Regular',
  },
  tripTypeContainer: {
    position: 'absolute',
    top: 170,
    left: 20,
    right: 20,
  },
  tripTypeButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#fff',
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  tripTypeButtonSelected: {
    backgroundColor: '#0066ff',
    borderColor: '#0066ff',
  },
  tripTypeText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#0f172a',
  },
  tripTypeTextSelected: {
    color: '#fff',
  },
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  bottomSheetTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#0f172a',
    marginBottom: 16,
  },
  vehicleCard: {
    width: 120,
    height: 120,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  vehicleCardSelected: {
    backgroundColor: '#0066ff',
    borderColor: '#0066ff',
  },
  vehicleName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#0f172a',
    marginTop: 8,
  },
  vehicleNameSelected: {
    color: '#fff',
  },
  vehiclePrice: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#64748b',
    marginTop: 4,
  },
  vehiclePriceSelected: {
    color: '#fff',
  },
  bookButton: {
    backgroundColor: '#0066ff',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
});