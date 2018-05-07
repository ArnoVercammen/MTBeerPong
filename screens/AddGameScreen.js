import React from 'react';
import { ScrollView, StyleSheet,Picker,View,ActivityIndicator,Text,Button,Alert} from 'react-native';
import { TabNavigator, TabBarBottom } from 'react-navigation';
import { WebBrowser } from 'expo';
import HomeScreen from './HomeScreen';
import RootNavigator from '../navigation/RootNavigation';

export default class AddGameScreen extends React.Component {
  constructor(props){
    super(props);
    this.state ={ isLoading: true,wonId: '', lostId:''}
    
  }
  static navigationOptions = {
    title: 'Add Game',
  };
  updateWonId = (wonId) => {
    this.setState({ wonId: wonId })
 }

 updateLostId = (lostId) => {
  this.setState({ lostId: lostId })
}
  
  componentDidMount(){
    return fetch('https://beerpong-376f.restdb.io/rest/leaderboard?apikey=e1c067352d5ab54351bf3b7e3cdc508659d94&h={"$orderby":{"percentage":-1}}') 
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          leaderboard: responseJson, 
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }
  teamsForPicker(){
    var pickerItems = [];
    for(let i = 0; i < this.state.leaderboard.length ; i++) {
      pickerItems.push(
      <Picker.Item key={this.state.leaderboard[i]._id} label={this.state.leaderboard[i].teams} value={this.state.leaderboard[i]._id}/>
      )
    }
      return pickerItems;
  }
  buttonPressed(){
   // this.buttonPressed.bind(this.updateWinningTeamDb);
    if(this.state.wonId == this.state.lostId){
    Alert.alert("Please choose different teams!");
    }else if(this.state.wonId == null || this.state.lostId == null){
      Alert.alert("Either the winning or losing team is not selected");
    }
    else{
     //this.updateWinningTeamDb();
     //this.updateLostTeamDb();
  Alert.alert("https://beerpong-376f.restdb.io/rest/leaderboard/"+this.state.wonId+"?i={'$inc':{'won':1,'totalgames':1}}");
  fetch('https://beerpong-376f.restdb.io/rest/leaderboard/'+this.state.wonId+'?i={"$inc":{"won":1,"totalgames":1}}', {
      method: 'PUT',
      headers: {
        Accept: 'application/json', 
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({   
        
      }),
    });   
  this.props.navigation.navigate('Home');           
    } 
  }
  updateLostTeamDb(){
    //this.updateLostTeamDb.bind(this.buttonPressed());
      Alert.alert(this.state.wonId);
  } 
  updateWinningTeamDb = () => {
   
    fetch('https://beerpong-376f.restdb.io/rest/leaderboard/'+this.state.wonId+'?i={"$inc":{"won":1,"totalgames":1}}', {
      method: 'PUT',
      headers: {
        Accept: 'application/json', 
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({   
        
      }),
    });
  }
   

  render() {
    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}> 
          <ActivityIndicator/>  
        </View>
      )
    }
    return (
      <View>
        <Text>Won</Text>
          <Picker selectedValue={this.state.wonId} onValueChange={this.updateWonId}>
            {this.teamsForPicker() }     
          </Picker>
        <Text>Lost</Text>
        <Picker selectedValue={this.state.lostId} onValueChange={this.updateLostId}>
            {this.teamsForPicker() }     
          </Picker>
          <Button
          
         onPress = {() => { 
        
         this.buttonPressed();
       
      }} 
         title = "Save!"
         color = "black" 
      />
      </View> 
    ); 
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
