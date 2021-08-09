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
export default class Metior extends React.Component {
  constructor() {
    super();

    this.state = {
      meteors: {},
      date:0,
      month:0,
      year:0,
    };
  }
  getMeteor = async () => {
    var dt=new Date().getDate()
    var month=new Date().getMonth()
    var year=new Date().getFullYear()
    if(dt<10){
      this.setState({date:'0'+dt})

    }else{
      this.setState({date:dt})
    }
    this.setState({year:year});
    this.setState({month:month})
    axios
      .get(
        "https://api.nasa.gov/neo/rest/v1/feed?start_date="+this.state.year+'-'+this.state.month+'-'+this.state.date+"&end_date="+"&api_key=GwKjSjYBrypMBkY5vbEbsZBhxO8fhlSQmpiENDzF"
      )
      .then((response) => {
        this.setState({ meteors: response.data.near_earth_objects });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  componentDidMount() {
    this.getMeteor();
  }
  render() {
    if (Object.keys(this.state.meteors).length === 0) {
      return (
        <View style={styles.container}>
          <SafeAreaView style={styles.androidSafeArea} />
          <ImageBackground
            style={styles.background}
            source={require("../assets/meteor_bg.jpg")}
          >
            <Text style={styles.headerText}>Meteor Screen</Text>
            <Text style={styles.headerText}>Loading</Text>
          </ImageBackground>
        </View>
      );
    } else {
      var meteorArr = Object.keys(this.state.meteors).map((meteorDate) => {
        return this.state.meteors[meteorDate];
      });
      var meteors = [].concat.apply([], meteorArr);
      meteors.forEach((element) => {
        let diameter =
          (element.estimated_diameter.kilometers.estimated_diameter_min +
            element.estimated_diameter.kilometers.estimated_diameter_min) /
          2;
        var threatSc =
          (diameter / element.close_approach_data[0].miss_distance.kilometers) *
          1000000000;
        element.threatScore = threatSc;
      });
      return (
        <View style={styles.container}>
          <SafeAreaView style={styles.androidSafeArea} />
          <ImageBackground
            style={styles.background}
            source={require("../assets/meteor_bg.jpg")}
          >
            <Text style={styles.headerText}>Meteor Screen</Text>
            <Text style={styles.headerText}>DONE</Text>
          </ImageBackground>
        </View>
      );
    }
  }
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "black" },
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
  map: { width: "100%", height: "100%" },
  dataCard: {
    flex: 0.4,
    backgroundColor: "white",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 20,
  },
});
