import PropTypes from 'prop-types';
import React from 'react';
import {FlatList, Platform, StyleSheet, TextInput, View} from 'react-native';

export const AutoCompleteTextInput = ({
  containerStyle,
  keyExtractor,
  renderItem,
  style,
  suggestions,
  ...props
}) => {
  const showResults = suggestions.length > 0;

  const renderResultList = () => {
    return (
      <FlatList
        data={suggestions}
        style={styles.list}
        keyExtractor={keyExtractor}
        keyboardShouldPersistTaps="always"
        renderItem={renderItem}
      />
    );
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.inputContainer}>
        <TextInput style={[styles.input, style]} {...props} />
      </View>
      <View>{showResults && renderResultList()}</View>
    </View>
  );
};

AutoCompleteTextInput.propTypes = {
  keyExtractor: PropTypes.func.isRequired,
  renderItem: PropTypes.func.isRequired,
  suggestions: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const commonListStyle = {
  borderRadius: 10,
  top: 5,
};

const androidStyles = {
  container: {
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1,
  },
  inputContainer: {
    marginBottom: 0,
  },
  list: {
    backgroundColor: 'white',
    margin: 10,
    marginTop: 0,
    ...commonListStyle,
  },
};

const iosStyles = {
  container: {
    zIndex: 1,
  },
  list: {
    backgroundColor: 'white',
    left: 0,
    position: 'absolute',
    right: 0,
    ...commonListStyle,
  },
};

const styles = StyleSheet.create({
  input: {
    fontSize: 20,
    height: 60,
    padding: 10,
  },
  listItem: {
    fontSize: 20,
    padding: 10,
  },
  ...Platform.select({
    android: {...androidStyles},
    ios: {...iosStyles},
  }),
});
