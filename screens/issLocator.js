import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Platform,
  ImageBackground,
} from "react-native";
import axios from "axios";
import MapView, { Marker } from "react-native-maps";
export default class Iss extends React.Component {
  constructor() {
    super();
    this.state = {
      location: {},
    };
  }
  getLocation = async () => {
    //module to get the api's response. 
    axios
      .get("https://api.wheretheiss.at/v1/satellites/25544")
      .then((response) => {
        this.setState({ location: response.data });
        console.log(this.state.location.latitude);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  componentDidMount() {
    this.getLocation();
  }
  render() {
    if (Object.keys(this.state.location).length === 0) {
      return (
        <View style={styles.container}>
          <SafeAreaView style={styles.androidSafeArea} />
          <ImageBackground
            style={styles.background}
            source={require("../assets/iss_bg.jpg")}
          >
            <Text style={styles.headerText}>Locator Screen</Text>
            <Text style={styles.headerText}>Loading</Text>
          </ImageBackground>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <SafeAreaView style={styles.androidSafeArea} />
          <ImageBackground
            style={styles.background}
            source={require("../assets/iss_bg.jpg")}
          >
            <Text style={styles.headerText}>Locator Screen</Text>
            <View style={styles.mapContainer}><MapView
              style={styles.map}
              region={{
                latitude: this.state.location.latitude,
                longitude: this.state.location.longitude,
                longitudeDelta: 30,
                latitudeDelta: 30,
              }}
            >
              <Marker
                coordinate={{
                  latitude: this.state.location.latitude,
                  longitude: this.state.location.longitude,
                }}
              ></Marker>
            </MapView></View>
            <View style={styles.dataCard}>
              <Text style={styles.text}>Location:{this.state.location.longitude}</Text>

            </View>
          </ImageBackground>
        </View>
      );
    }
  }
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "blue" },
  text: { fontSize: 20, fontWeight: "bold", color: "black", marginLeft: 20 },
  button: {
    backgroundColor: "white",
    borderRadius: 10,
    flex: 0.2,
    justifyContent: "center",
    marginHorizontal: 10,

    marginTop: 50,
  },
  androidSafeArea: {
    marginTop: Platform.OS == "android" ? StatusBar.currentHeight : null,
  },
  background: { flex: 1, resizeMode: "cover" },
  headerText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    fontFamily: "sans-serif",
    textAlign: "center",
  },
  rootImage: {
    position: "absolute",
    height: 100,
    width: 145,
    top: -35,
    right: 35,
  },
  knowMore: { color: "red", fontSize: 15, marginLeft: 20 },
  number: { position: "absolute", right: 10, fontSize: 90, color: "lightgrey" },
  mapContainer: { flex: 0.65 },
  map:{width:'100%',height:'100%'},
  dataCard:{flex:0.4,backgroundColor:'white',borderTopLeftRadius:10,borderTopRightRadius:10,padding:20},
});
