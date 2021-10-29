import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, ActivityIndicator } from 'react-native';
import Constants from 'expo-constants';

import * as Location from "expo-location"
import axios from 'axios'

import CurrentWeather from "./components/CurrentWeather"
import Forecasts from "./components/Forecasts"

import {API_URL_ENV} from "@env"


export default function App() {

const API_URL = (lat, lon) => API_URL_ENV + `&lat=${lat}&lon=${lon}`

  // Récupéré la position du user
  
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(null)

  useEffect(() => {
    const getCoordinates = async() => {
      const { status } = await Location.requestForegroundPermissionsAsync()
      if(status !== "granted") {
        return
      }

      const userLocation = await Location.getCurrentPositionAsync()

      getWeather(userLocation)
    }

    getCoordinates()
  }, [])

  // Requete vers serveur météo
  // - Météo
  // - Ville
  // - Prévisions

const getWeather = async(location) => {
  try {

    const response = await axios.get(API_URL(location.coords.latitude, location.coords.longitude))
    setData(response.data)
    setLoading(false)
  } catch(e) {
    console.log("Erreur dans getWeather")
  }
}

  if(loading) {
    return (
      <View style={styles.container}>
      <ActivityIndicator size="large" color="#0000ff" />
      </View>
    )
  }
  return (
    <View style={styles.container}>
     <CurrentWeather data={data} />
     <Forecasts data={data} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#E2E6E1',
    alignItems: 'center',
    padding: 8,
  }
});
