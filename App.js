import React from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions'

import 'react-native-gesture-handler';

import { Button } from 'react-native-paper';
import NewDeck from './NewDeck';
import DeckList from './DeckList';
import DeckView from './DeckView';
import NewCard from './NewCard';
import Quiz from './Quiz';

const Stack = createStackNavigator();
const NOTIFICATION_KEY = 'Vocab:notifications';

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			text: '',
			deckListItems: [
				{
					name: 'english',
					cards: [ { question: 'hello', answer: 'hallo' }, { question: 'you', answer: 'du' } ]
				},
				{ name: 'spanish', cards: [] },
				{ name: 'german', cards: [] }
			],
			currentDeck: ''
		};
		this.createDeck = this.createDeck.bind(this);
		this.addCard = this.addCard.bind(this);
		this.setDeck = this.setDeck.bind(this);
  }
  
  componentDidMount(){
    this.setLocalNotification()
  }

	createDeck(name) {
		let addedDeck = { name: name, cards: [] };
		this.setState({
			currentDeck: this.state.deckListItems.length,
			deckListItems: [ ...this.state.deckListItems, addedDeck ]
		});
	}

	setDeck(number) {
		this.setState({ currentDeck: number.i });
	}

	addCard(index, question, answer) {
		let tempVar = JSON.parse(JSON.stringify(this.state.deckListItems));
		tempVar[index].cards.push({ question: question, answer: answer });
		this.setState({ deckListItems: tempVar });
  }

  clearLocalNotification(){
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
                       .then(Notifications.cancelAllScheduledNotificationsAsync)
  }
  
  createNotification(){
    return {
      title: 'Your Vocab App',
      body: 'Time to learn more!',
      ios: { 
        sound: true,
      },
      android: {
        sound: true,
        vibrate: true,
      }
    }
  }

  setLocalNotification () {
    AsyncStorage.getItem(NOTIFICATION_KEY)
      .then(JSON.parse)
      .then((data) => {
        if (data === null) {
          Permissions.askAsync(Permissions.NOTIFICATIONS).catch(console.log("doesn't work in browser"))
            .then(({ status }) => {
              if (status === 'granted') {
                Notifications.cancelAllScheduledNotificationsAsync()
  
                let tomorrow = new Date()
                tomorrow.setDate(tomorrow.getDate() + 1)
                tomorrow.setHours(20)
                tomorrow.setMinutes(0)
  
                Notifications.scheduleLocalNotificationAsync(
                  createNotification(),
                  {
                    time: tomorrow,
                    repeat: 'day',
                  }
                )
  
                AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
              }
            })
        }
      })
  }

	render() {
		return (
			<NavigationContainer>
				<Stack.Navigator initialRouteName="Home">
					<Stack.Screen name="DeckList">
						{(props) => (
              <DeckList {...props} 
                        setDeckFunc={this.setDeck} 
                        deckListItems={this.state.deckListItems} 
              />
						)}
					</Stack.Screen>
					<Stack.Screen name="NewDeck">
            {(props) => 
            <NewDeck {...props} 
                      setDeckFunc={this.setDeck} 
                      createDeckFunc={this.createDeck} 
            />}
					</Stack.Screen>
					<Stack.Screen name="DeckView">
						{(props) => (
							<DeckView
								{...props}
								setDeckFunc={this.setDeck}
								deckItem={this.state.currentDeck}
								deckListItems={this.state.deckListItems}
							/>
						)}
					</Stack.Screen>
					<Stack.Screen name="NewCard">
						{(props) => (
							<NewCard
								{...props}
								deckListItems={this.state.deckListItems}
								deckItem={this.state.currentDeck}
								setDeckFunc={this.setDeck}
								addCardFunc={this.addCard}
							/>
						)}
					</Stack.Screen>
					<Stack.Screen name="Quiz">
						{(props) => (
							<Quiz
								{...props}
								deckListItems={this.state.deckListItems}
								deckItem={this.state.currentDeck}
								setDeckFunc={this.setDeck}
								addCardFunc={this.addCard}
							/>
						)}
					</Stack.Screen>
				</Stack.Navigator>
			</NavigationContainer>
		);
	}
}
