import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Title, Paragraph, Text, Button } from 'react-native-paper';
import { render } from 'react-dom';

export default class Quiz extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showAnswer: false,
			questionIndex: 0,
			correct: 0,
			showResult: false
		};
	}

	increment(answer, numberQuestions) {
		if (this.state.questionIndex + 1 < numberQuestions) {
			answer
				? this.setState({
						showAnswer: false,
						correct: this.state.correct + 1,
						questionIndex: this.state.questionIndex + 1
					})
				: this.setState({ showAnswer: false, questionIndex: this.state.questionIndex + 1 });
		} else {
			answer
				? this.setState({ showAnswer: false, correct: this.state.correct + 1, showResult: true })
				: this.setState({ showAnswer: false, showResult: true });
		}
	}

	render() {
		const { navigate } = this.props.navigation;

		let cardItems = this.props.deckListItems;
		let index = this.props.deckItem;
		let viewedItem = cardItems && cardItems[index];
		let viewedItemCards = viewedItem && viewedItem.cards;
		let numberQuestions = viewedItemCards && viewedItemCards.length;

		let deck = (
			<Card.Content style={{ paddingBottom: 10, margin: 5, backgroundColor: '#F0F0F0' }}>
				<Title>
					Card Counter {this.state.questionIndex} / {numberQuestions}
				</Title>
				<Paragraph>
					{' '}
					Question: {viewedItemCards && viewedItemCards[this.state.questionIndex].question}{' '}
				</Paragraph>
				{this.state.showAnswer && (
					<Paragraph>
						{' '}
						Answer: {viewedItemCards && viewedItemCards[this.state.questionIndex].answer}{' '}
					</Paragraph>
				)}
				{this.state.showAnswer && (
					<div>
						<Button onPress={() => this.increment(true, numberQuestions)}>correct</Button>
						<Button onPress={() => this.increment(false, numberQuestions)}>Incorrect</Button>
					</div>
				)}

				{!this.state.showAnswer && (
					<div>
						<Button onPress={() => this.setState({ showAnswer: true })}>Show Answer</Button>
					</div>
				)}
			</Card.Content>
		);

		let endScreen = (
			<Card.Content style={{ paddingBottom: 10, margin: 5, backgroundColor: '#F0F0F0' }}>
				<Title style={{ color: 'green' }}>Quiz Finished</Title>
				<Paragraph>
					{this.state.correct} of {viewedItemCards && viewedItemCards.length} correct!
				</Paragraph>
				<Button onPress={() => this.setState({ questionIndex: 0, showResult: false, correct: 0 })}>
					Restart Quiz
				</Button>
				<Button onPress={() => navigate('DeckView')}>Back To Deck</Button>
			</Card.Content>
		);

		let content = this.state.showResult ? endScreen : deck;

		return (
			<View style={{ flex: 1 }}>
				<Card style={{ margin: 3 }}>{content}</Card>
			</View>
		);
	}
}
