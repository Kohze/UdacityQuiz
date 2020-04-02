import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Title, Paragraph, Text, Button } from 'react-native-paper';
import { render } from 'react-dom';

export default class DeckList extends React.Component {
	render() {
		const { navigate } = this.props.navigation;

		return (
			<View style={{ flex: 1 }}>
				<Card style={{ margin: 3 }}>
					{this.props.deckListItems &&
						this.props.deckListItems.map((item, i) => (
							<Card.Content
								key={'List' + i}
								style={{ paddingBottom: 10, margin: 5, backgroundColor: '#F0F0F0' }}
							>
								<Title>{item.name}</Title>
								<Paragraph>
									{this.props.deckListItems[i] && this.props.deckListItems[i].cards.length}
								</Paragraph>
								<Button
									onPress={() => {
										navigate('DeckView');
										this.props.setDeckFunc({ i });
									}}
								>
									More
								</Button>
							</Card.Content>
						))}
				</Card>
				<Card>
					<Button onPress={() => navigate('NewDeck')}> Add New Deck </Button>
				</Card>
			</View>
		);
	}
}
