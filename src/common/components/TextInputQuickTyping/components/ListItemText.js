import PropTypes from 'prop-types';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

export const ListItemText = ({label, isMatched, ...props}) => {
  return (
    <TouchableOpacity style={styles.listItem} {...props}>
      <Text style={styles.listItemText(isMatched)}>{label}</Text>
    </TouchableOpacity>
  );
};

ListItemText.propTypes = {
  label: PropTypes.string.isRequired,
  isMatched: PropTypes.bool.isRequired,
};

const styles = StyleSheet.create({
  listItem: {
    margin: 5,
  },
  listItemText: (isMatched) => ({
    fontSize: isMatched ? 18 : 16,
    margin: 2,
    padding: 5,
    color: isMatched ? 'green' : 'black',
    fontWeight: isMatched ? 'bold' : 'normal',
  }),
});
