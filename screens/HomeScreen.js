import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  FlatList,
  } from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';

class RowLeaderboard extends React.Component {
  render() {
    return ( 
      <View style={{flexDirection: 'row', flex:1, justifyContent:'space-between', alignSelf:'stretch'}}> 
      <View style={{ flex: 1, alignSelf: 'stretch' }}><Text>{this.props.team.teams}</Text></View>
      <View style={{ flex: 1, alignSelf: 'stretch' }}><Text>{this.props.team.won}</Text></View>
      <View style={{ flex: 1, alignSelf: 'stretch' }}><Text>{this.props.team.totalgames}</Text></View>
      <View style={{ flex: 1, alignSelf: 'stretch' }}><Text >{this.props.team.percentage}</Text></View> 
      </View>
    );  
  }
} 

export default class HomeScreen extends React.Component {
  constructor(props){
    super(props);
    this.state ={ isLoading: true}
  }
  static navigationOptions = {
    header: null, title:'Leaderboard',
  };

  componentDidMount(){
    return fetch('https://beerpong-376f.restdb.io/rest/leaderboard?apikey=e1c067352d5ab54351bf3b7e3cdc508659d94&h={"$orderby":{"percentage":-1}}')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson,
          leaderboard: responseJson, 
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }

  table(){
    var rows = [];
    for(var i = 0 ; i < this.state.leaderboard.length ; i++){
      rows.push(
          <RowLeaderboard key={this.state.leaderboard[i]._id} team={this.state.leaderboard[i]} />
      )
    }
    return rows;
 
  }

  


  render() {
    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>  
        </View>
      )
    }

    return(
     
        
        
      
        
      
        
       <ScrollView>
			    <View style={{paddingTop: 20, flex: 1, alignItems: 'stretch', justifyContent:'space-between'}}> 
				    <View style={{flexDirection: 'row', flex:1, justifyContent:'space-between', alignSelf:'stretch'}}> 
            <View><Text style={{fontWeight:'bold'}}>team</Text></View> 
				    <View><Text>won</Text></View>
			    	<View><Text>totalgames</Text></View> 
            <View><Text>percentage</Text></View>  
            </View>

		    	{ this.table() } 
	    	</View>
      </ScrollView>
      
      
 );

}

  

 
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
