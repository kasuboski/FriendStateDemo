import React from 'react';
import { 
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Text,
  View
} from 'react-native';

import firebase from 'react-native-firebase';

export default class StateScreen extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
    };

    this.stateRef = firebase.firestore().collection('states').orderBy('added_at', 'desc').limit(1);
    this.unsubscribe = null;
  }

  onCollectionUpdate = (querySnapshot) => {
      let state;
      // limited to one up above
      querySnapshot.forEach(doc => state = doc.data().name);
      this.setState({name: state});
  }

  componentDidMount() {
    this.unsubscribe = this.stateRef.onSnapshot(this.onCollectionUpdate);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback
          onPress={this.onImagePressed}
        >
        <Image source={require('../assets/confused-emoji.png')} style={styles.logo} />
        </TouchableWithoutFeedback>
        <Text style={styles.header}>
          What is George's state?
        </Text>
        <Text style={styles.stateName}>
          {this.state.name}
        </Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    paddingTop: 50,
  },
  logo: {
    height: 120,
    width: 120,
    marginBottom: 16,
  },
  header: {
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
  },
  stateName: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
    fontSize: 40,
  },
});