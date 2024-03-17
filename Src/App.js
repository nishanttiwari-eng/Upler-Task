import axios from 'axios';
import React, {useEffect, useRef, useState} from 'react';
import {ActivityIndicator, Alert, FlatList, View} from 'react-native';
import {
  AirlineSheet,
  CustomButton,
  EmptyMessage,
  FlightView,
  PriceSheet,
} from './Components/All';
import Colors from './Components/Colors';

const API_URL = 'https://api.npoint.io/378e02e8e732bb1ac55b';

const TravelRequestScreen = () => {
  const [loading, setLoading] = useState(true);
  const [isFilterEnable, setIsFilterEnable] = useState(false);
  const [flights, setFlights] = useState([]);
  const [airlineArry, setAirlineArry] = useState([]);
  const [priceArry, setPriceArry] = useState([]);
  const [filteredFlights, setFilteredFlights] = useState([]);

  const referencePrice = useRef(null);
  const referenceAirline = useRef(null);

  useEffect(() => {
    fetchFlights();
  }, []);

  const fetchFlights = async () => {
    try {
      const response = await axios.get(API_URL);
      const data = response.data;
      setFlights(data);
      const tempArryAirline = [];
      const tempPriceArry = [];

      for (let index = 0; index < data.length; index++) {
        const element = data[index].airline;
        if (!tempArryAirline.includes(element)) {
          tempArryAirline.push(element);
        }
      }
      for (let index = 0; index < data.length; index++) {
        const element = data[index].price;
        if (!tempPriceArry.includes(element)) {
          tempPriceArry.push(element);
        }
      }

      setAirlineArry(
        tempArryAirline.map(item => ({value: item, isSelected: false})),
      );
      setPriceArry(
        tempPriceArry.map(item => ({value: item, isSelected: false})),
      );
    } catch (error) {
      Alert.alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const sortBy = (value, type) => {
    let sorted = [];
    if (type == 'price') {
      sorted = flights.filter(item => item.price == value);
    } else {
      sorted = flights.filter(item => item.airline == value);
    }
    setIsFilterEnable(true);
    setFilteredFlights(sorted);
  };
  const clearFilter = () => {
    setIsFilterEnable(false);
  };

  if (loading) {
    return <ActivityIndicator size="large" color={Colors.black} />;
  }

  return (
    <View style={{flex: 1, backgroundColor: Colors.inputBackColor}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
        <CustomButton
          onPressBtn={() => referenceAirline.current.open()}
          title={'Filter by Airline'}
        />
        <CustomButton
          onPressBtn={() => referencePrice.current.open()}
          title={'Sort by Price'}
        />
        {isFilterEnable && (
          <CustomButton
            onPressBtn={() => clearFilter()}
            title={'Clear Filter'}
          />
        )}
      </View>

      <>
        {isFilterEnable ? (
          <FlatList
            data={filteredFlights}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => <FlightView item={item} />}
            ListEmptyComponent={() => (
              <EmptyMessage message={'No  flight found!'} />
            )}
          />
        ) : (
          <FlatList
            data={flights}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => <FlightView item={item} />}
            ListEmptyComponent={() => (
              <EmptyMessage message={'No  flight found!'} />
            )}
          />
        )}
      </>

      <PriceSheet
        reference={referencePrice}
        sortOptions={priceArry}
        onApply={value => sortBy(value, 'price')}
      />
      <AirlineSheet
        reference={referenceAirline}
        sortOptions={airlineArry}
        onApply={value => sortBy(value, 'airline')}
      />
    </View>
  );
};

export default TravelRequestScreen;
