import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

import firebase from 'react-native-firebase';

export default class AddState extends React.Component {
  state = {
    newStateText: '',
  }

  statesRef = firebase.firestore().collection('states');

  addState = () => {
    this.statesRef.add({
      added_at: new Date(),
      name: this.state.newStateText,
    })
    .then(docRef => { this.setState({newStateText: ''}); console.log(`Added state with id ${docRef.id}`)})
    .catch(err => console.error(`Error adding state: ${err}`));
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          autoFocus
          style={styles.input}
          onChangeText={value => this.setState({newStateText: value})}
          placeholder={'Your current state'}
          value={this.state.newStateText}
        />
        <Button title='Add State' onPress={this.addState} color='#FBBF67' />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: '#F5FCFF',
  },
  input: {
    height: 50,
    marginBottom: 15,
    fontSize: 25,
  },
});