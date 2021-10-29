import React, { useEffect, useState } from "react"
import { View, Text, StyleSheet, ScrollView } from "react-native"
import {format} from "date-fns"
import { fr } from 'date-fns/locale'

import Weather from "./Weather"

export default function Forecasts ({data}) {
  
  const [forecasts, setForecasts] = useState([])

  useEffect(() => {
    const forecastsData = data.list.map(f => {
      
      const dt = new Date(f.dt * 1000)
      return ({
        date: f.dt,
        hour: dt.getHours(),
        temp: Math.round(f.main.temp),
        icon: f.weather[0].icon,
        name: format(dt, "EEEE", { locale: fr})
      })
    })

    
    setForecasts(forecastsData)
  }, [data])


  return(
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.scroll}
    >
      {forecasts.map(f => (
        <View key={f.name+Math.random()}>
          <Text>{f.name}</Text>
          <Weather forecast={f} />
        </View>
      ))}
    </ScrollView>
  )
}


const styles = StyleSheet.create({

  scroll: {
    width: "100%",
    height: "35%"
  }
})