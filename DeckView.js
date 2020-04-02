import React from 'react';
import { StyleSheet, View, Animated} from 'react-native';
import { Card, Title, Paragraph, Text, Button } from 'react-native-paper';
import { render } from 'react-dom';

export default class DeckView extends React.Component {
  constructor(props) {
		super(props);
		this.state = {
			opacity: new Animated.Value(0),
		};
  }
  

	render() {
    console.log(this.state.opacity);
    const { navigate } = this.props.navigation;
    Animated.timing(this.state.opacity, {toValue: 1, duration: 1500}).start();


		let cardItems = this.props.deckListItems;
		let index = this.props.deckItem;
		let currentItem = cardItems[index];
		let deck = (
			<Card.Content style={{ paddingBottom: 10, margin: 5, backgroundColor: '#F0F0F0' }}>
				<Title>{currentItem.name}</Title>
				<Paragraph>{currentItem.cards.length} Cards</Paragraph>
				{currentItem.cards.length > 0 ? <Button onPress={() => navigate('Quiz')}>Start Quiz</Button> : <Button style={{backgroundColor: 'white'}}>Add Questions Before Quiz Can Start!</Button>}
				<Button onPress={() => navigate('NewCard')}>Add New Question</Button>
			</Card.Content>
		);

		return (
      <View>
        <Animated.View style={{ flex: 1, opacity: this.state.opacity}}>
          <Card style={{ margin: 3 }}>{cardItems && currentItem && deck}</Card>
        </Animated.View>
      </View>
		);
	}
}
