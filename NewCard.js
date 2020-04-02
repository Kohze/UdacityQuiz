import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Title, Paragraph, Text, Button } from 'react-native-paper';
import { TextInput } from 'react-native-paper';
import { render } from 'react-dom';

export default class NewCard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			question: '',
			answer: ''
		};
	}

	render() {
		const { navigate } = this.props.navigation;
		console.log(this.props.deckListItems);
		console.log(this.props.deckItem);

		return (
			<View style={{ flex: 1 }}>
				<View>
					<Card style={{ margin: 3 }}>
						<Card.Content style={{ paddingBottom: 10 }}>
							<Title>New Card Deck</Title>
						</Card.Content>
						<TextInput
							label="Card Question"
							value={this.state.question}
							onChangeText={(text) => this.setState({ question: text })}
						/>
						<TextInput
							label="Answer"
							value={this.state.answer}
							onChangeText={(text) => this.setState({ answer: text })}
						/>
						<Button
							onPress={() => {
								this.props.addCardFunc(this.props.deckItem, this.state.question, this.state.answer);
								this.props.navigation.goBack();
							}}
						>
							Add
						</Button>
					</Card>
				</View>
			</View>
		);
	}
}
