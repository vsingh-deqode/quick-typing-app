import React from 'react';
import {
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export const TextInputQuickTyping = ({
  suggestions,
  hideResults,
  onStartShouldSetResponderCapture,
  containerStyle,
  inputContainerStyle,
  listContainerStyle,
  listStyle,
  style,
  renderTextInput,
  keyboardShouldPersistTaps,
  onPressSuggestion,
  renderItem,
  flatListProps,
  ...props
}) => {
  const showResults = suggestions.length > 0;

  const renderDefaultItem = ({item, index}) => (
    <TouchableOpacity
      key={index.toString()}
      onPress={() => onPressSuggestion && onPressSuggestion(item)}>
      <Text style={styles.listItem}>{item}</Text>
    </TouchableOpacity>
  );

  const renderResultList = () => {
    return (
      <FlatList
        data={suggestions}
        style={[styles.list, listStyle]}
        keyboardShouldPersistTaps={keyboardShouldPersistTaps}
        renderItem={renderItem ?? renderDefaultItem}
        {...flatListProps}
      />
    );
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={[styles.inputContainer, inputContainerStyle]}>
        {renderTextInput({style: [styles.input, style], ...props})}
      </View>

      {!hideResults && (
        <View
          style={listContainerStyle}
          onStartShouldSetResponderCapture={onStartShouldSetResponderCapture}>
          {showResults && renderResultList()}
        </View>
      )}
    </View>
  );
};

TextInputQuickTyping.defaultProps = {
  hideResults: false,
  onStartShouldSetResponderCapture: false,
  keyboardShouldPersistTaps: 'always',
  renderTextInput: (props) => <TextInput {...props} />,
  flatListProps: {},
};

const border = {
  borderColor: '#b9b9b9',
  borderRadius: 1,
  borderWidth: 1,
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
    ...border,
    marginBottom: 0,
  },
  list: {
    backgroundColor: 'white',
    borderTopWidth: 0,
    margin: 10,
    marginTop: 0,
  },
};

const iosStyles = {
  container: {
    zIndex: 1,
  },
  inputContainer: {
    ...border,
  },
  list: {
    backgroundColor: 'white',
    borderTopWidth: 0,
    left: 0,
    position: 'absolute',
    right: 0,
  },
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: 'white',
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
