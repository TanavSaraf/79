import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  StatusBar,
  ImageBackground,
  Image,
} from "react-native";

export default class Home extends React.Component {
  navigateFunction=(screen)=>{
    this.props.navigation.navigate(screen)
  }
  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.androidSafeArea} />
        <ImageBackground
          source={require("../assets/bg_image.png")}
          style={styles.background}
        >
          <Text
            style={styles.headerText}
          >
            Iss Tracker App
          </Text>
          <TouchableOpacity style={styles.button} 
          onPress={()=>{
            this.navigateFunction('IssTracker')
          }}>

            <Text style={styles.text}>Iss Location</Text>
            <Text style={styles.knowMore}>Know More</Text>
            <Text style={styles.number}>1</Text>
            <Image style={styles.rootImage} source={require('../assets/iss_icon.png')} />
            
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} 
          onPress={()=>{
            this.navigateFunction('Meteor')
          }}>

            <Text style={styles.text}>Meteor</Text>
            <Text style={styles.knowMore}>Know More</Text>
            <Text style={styles.number}>2</Text>
            <Image style={styles.rootImage} source={require('../assets/meteor_icon.png')} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>

            
            <Text style={styles.text}>Updates</Text>
            <Image style={styles.rootImage} source={require('../assets/rocket_icon.png')} />
          </TouchableOpacity>
        </ImageBackground>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "blue", },
  text: { fontSize: 30, fontWeight: "bold", color: "grey",marginLeft:20},
  button: {
    backgroundColor: "white",
    borderRadius: 10,
    flex:0.2,
    justifyContent: "center",
   marginHorizontal:10,
   
    marginTop:50,
  },
  androidSafeArea: {
    marginTop: Platform.OS == "android" ? StatusBar.currentHeight : null,
  },
  background: { flex: 1, resizeMode: "cover" },
  headerText:{
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    fontFamily: "sans-serif",
    textAlign:'center'
  },
  rootImage:{
    position:"absolute",
    height:100,
    width:145,
    top:-35,
    right:35,
  },
  knowMore:{color:'red',fontSize:15,marginLeft:20},
  number:{position:'absolute',
right:10,fontSize:90,color:'lightgrey'},
});
