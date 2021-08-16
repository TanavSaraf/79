import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Platform,
  ImageBackground,
  FlatList,
  Image,
  Dimensions,
} from "react-native";
import axios from "axios";
export default class Metior extends React.Component {
  constructor() {
    super();

    this.state = {
      meteors: {},
    };
  }
  renderItem = ({ item, index }) => {
    var bg, speedImg, imgSize;
    if (item.threatScore < 30) {
      bg = require("../assets/meteor_bg1.png");
      speedImg = require("../assets/meteor_speed1.gif");
      size = 100;
    } else if (item.threatScore > 30 && item.threatScore < 75) {
      bg = require("../assets/meteor_bg2.png");
      speedImg = require("../assets/meteor_speed2.gif");
      size = 150;
    } else {
      bg = require("../assets/meteor_bg3.png");
      speedImg = require("../assets/meteor_speed3.gif");
      size = 200;
    }
    return (
      <View>
        <ImageBackground source={bg} style={styles.background}>
          <Image source={speedImg} style={{width:size,height:size,marginTop:200}}/>
          <View style={{marginTop:20}}>
            <Text style={styles.text2}>Name: {item.name}</Text>
            <Text style={styles.text2}>Date Approaching: {item.close_approach_data[0].close_approach_date_full}</Text>
          </View>
        </ImageBackground>
      </View>
    );
  };
  getMeteor = async () => {
    var dt = new Date().getDate();
    var mnth = new Date().getMonth();
    var yr = new Date().getFullYear();

    var Startdte = yr + "-" + (mnth + 1) + "-" + dt;
    var Enddte = yr + "-" + (mnth + 1) + "-" + dt;
    console.log(
      "https://api.nasa.gov/neo/rest/v1/feed?start_date=" +
        Startdte +
        "&end_date=" +
        Enddte +
        "&api_key=GwKjSjYBrypMBkY5vbEbsZBhxO8fhlSQmpiENDzF"
    );
    axios
      .get(
        "https://api.nasa.gov/neo/rest/v1/feed?start_date=" +
          Startdte +
          "&end_date=" +
          Enddte +
          "&api_key=GwKjSjYBrypMBkY5vbEbsZBhxO8fhlSQmpiENDzF"
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
      meteors.sort((meteorA, meteorB) => {
        return meteorB.threatScore - meteorA.threatScore;
      });
      meteors = meteors.slice(0, 5);
      return (
        <View style={styles.container}>
          <SafeAreaView style={styles.androidSafeArea} />
          <ImageBackground
            style={styles.background}
            source={require("../assets/meteor_bg.jpg")}
          >
            <Text style={styles.headerText}>Meteor Screen</Text>

            <FlatList
              data={meteors}
              keyExtractor={(item, index) => index.toString()}
              renderItem={this.renderItem}
              horizontal={true}
            />
          </ImageBackground>
        </View>
      );
    }
  }
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "black" },
  text: { fontSize: 20, fontWeight: "bold", color: "black", marginLeft: 20 },
  text2: { fontSize: 20, fontWeight: "bold", color: "white", marginLeft: 20 },
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
  background: { flex: 1, resizeMode: "cover",width:Dimensions.get('window').width,height:Dimensions.get('window').height },
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
