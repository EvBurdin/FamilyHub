import React, { Component } from 'react';
import {
 View, Image, Text, StyleSheet 
} from 'react-native';
import { ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { getFamily } from '../redux/actions/userActions';

const styles = StyleSheet.create({
  stretch: { marginTop: 10, textAlign: 'center', fontSize: 30 },
});

class Family extends Component {
  componentDidMount() {
    this.props.getFamily(this.props.cookies);
    // console.log(this.props.myFamily.firstName);
  }

  render() {
    const list = [
      {
        name: 'Юрий',
        avatar_url:
          'https://lh3.googleusercontent.com/a-/AAuE7mBPI0szTXncL_D6YLKNvUv8A-vofgJJ1gKZBTXmOoQ',
        subtitle: 'Brother',
      },
      {
        name: 'Евгений',
        avatar_url:
          'https://lh3.googleusercontent.com/-dXKAHKBy5ag/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rcS5nw-EOVdSwbDA_6fEbBmQgETjQ/photo.jpg',
        subtitle: 'Brother',
      },
      {
        name: 'Петр',
        avatar_url: 'https://lh3.googleusercontent.com/a-/AAuE7mAtmKoekw9sr1SFuohHf0KkFjXvwIAESoovaTai1Q',
        subtitle: 'Brother',
      },
      {
        name: 'Алексей',
        avatar_url:
          'https://lh3.googleusercontent.com/a-/AAuE7mDPvfqrYrVLN5rKD6IbzaSJkRensbm9_628mOqS',
        subtitle: 'Brother',
      },
    ];
    return (
      <View>
        <Image style={{ marginTop: 50 }} source={require('../img/family.jpg')} />
        <Text style={styles.stretch}>My family:</Text>
        {!!this.props.myFamily &&
          list.map((l, i) => (
            <ListItem
              key={i}
              leftAvatar={{ source: { uri: l.avatar_url } }}
              title={l.name}
              subtitle={l.subtitle}
              bottomDivider
            />
          ))}
      </View>
    );
  }
}

function mapStateToProps(store) {
  return {
    myFamily: store.User.myFamily,
    cookies: store.User.cookies,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    getFamily: (cookies) => dispatch(getFamily(cookies)),
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Family);
