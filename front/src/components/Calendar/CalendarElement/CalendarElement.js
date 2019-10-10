/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { connect } from 'react-redux';
import { deleteEvent } from '../../../redux/actions/calendarActions';

class CalendarElement extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      title, //
      text,
      cookies,
      id,
      deleteEvent: deleteElement,
      handleDelete,
    } = this.props;
    return (
      <View>
        <Text>{title}</Text>
        <Text>{text}</Text>
        <Button
          onPress={() => {
            deleteElement(cookies, id);
            handleDelete();
          }}
          title="Delete"
         />
      </View>
    );
  }
}

function mapStateToProps(store) {
  return {
    cookies: store.User.cookies,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    deleteEvent: (cookie, id) => dispatch(deleteEvent(cookie, id)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CalendarElement);
