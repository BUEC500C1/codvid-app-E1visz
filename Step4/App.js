import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default 
class App extends React.Component {

    constructor(props){
    super(props);
    this.state = {
      TotalConfirmed: '',
      TotalDeaths: '',
      Date: '',
    };
  } 

  componentDidMount() {
    fetch('https://api.covid19api.com/total/country/united-states', {method: 'GET'})
      .then((response) => response.json())
      .then(json => {
        this.setState({
          
          TotalConfirmed: json[json.length-1]['Confirmed'],
          TotalRecovered: json[json.length-1]['Recovered'],
          TotalDeaths: json[json.length-1]['Deaths'],
          LatestConfirned: parseInt(json[json.length-1]['Confirmed']) - parseInt(json[json.length-2]['Confirmed']),
          LatestRecovered: parseInt(json[json.length-1]['Recovered']) - parseInt(json[json.length-2]['Recovered']),
          LatestDeaths: parseInt(json[json.length-1]['Deaths']) - parseInt(json[json.length-2]['Deaths']),
          Date: json[json.length-1]['Date'],
        },
        function(){}
      );
      console.log(this.state.jsondata);
      })
      .catch(error => {
        console.error(error);
      });
  }

  render(){
    return(
      <View style={style.container}>
        <Text style = {style.title}> CODVID-19 In United States  </Text>
        <Text style = {style.datetext}> Date: {this.state.Date}</Text>
        <Text style = {style.text1}> Total Cases: </Text>
        <Text style = {style.text}> Confirmed: {this.state.TotalConfirmed}</Text>
        <Text style = {style.text}> Death: {this.state.TotalDeaths}</Text>
        <Text style = {style.text}> Recovered: {this.state.TotalRecovered}</Text>
        <Text style = {style.text1}> Latest Cases: </Text>
        <Text style = {style.text}> Confirmed: {this.state.LatestConfirned}</Text>
        <Text style = {style.text}> Death: {this.state.LatestDeaths}</Text>
        <Text style = {style.text}> Recovered: {this.state.LatestRecovered}</Text>
        
        
        </View>
    )
  }
}

const style = StyleSheet.create({
  container: {
    marginTop: 50,
    backgroundColor:'black',
    paddingBottom: 400,
    
  },

  title:{
    color: 'white',
    marginTop: 20,
    fontSize: 25,
    textAlign: "center",
  },

  text: {
    color: 'white',
    // marginTop: 5,
    marginLeft: 25,
    padding: 10,
    fontSize: 15,
    backgroundColor: 'black',
  },

  text1: {
    color: 'white',
    padding: 10,
    marginTop: 20,
    marginLeft: 5,
    fontSize: 20,
    backgroundColor: 'black',
  },

  datetext: {
    color: 'white',
    marginTop: 10,
    fontSize: 10,
    textAlign: "center",
  },
  
});
