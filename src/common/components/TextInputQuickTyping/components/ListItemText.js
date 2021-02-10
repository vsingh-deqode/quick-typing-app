import PropTypes from 'prop-types';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

export const ListItemText = ({label, query, isMatched, ...props}) => {
  let labelArray = label.split('');
  const elementArray = [];

  labelArray.forEach((item, index) => {
    if (query.includes(item)) {
      elementArray.push(
        <Text key={index.toString()} style={styles.highlightText}>
          {item}
        </Text>,
      );
    } else {
      elementArray.push(item);
    }
  });

  return (
    <TouchableOpacity style={styles.listItem} {...props}>
      <Text styles={styles.listItemText}>{elementArray}</Text>
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
  highlightText: {
    color: 'red',
  },
  listItemText: {
    fontSize: 16,
    margin: 2,
    padding: 5,
    color: 'black',
    fontWeight: 'normal',
  },
});
