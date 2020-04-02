import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Title, Paragraph, Text, Button } from 'react-native-paper';
import { TextInput } from 'react-native-paper';

export default class NewDeck extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			text: ''
		};
	}

	render() {
		const { navigate } = this.props.navigation;

		return (
			<View style={styles.container}>
				<Card style={{ margin: 3 }}>
					<Card.Content style={{ paddingBottom: 10 }}>
						<Title>New Card Deck</Title>
					</Card.Content>
					<TextInput
						label="Deck Title"
						value={this.state.text}
						onChangeText={(text) => this.setState({ text: text })}
					/>
					<Button
						onPress={() => {
							this.props.createDeckFunc(this.state.text);
							navigate('DeckView');
						}}
					>
						Add
					</Button>
				</Card>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	}
});
