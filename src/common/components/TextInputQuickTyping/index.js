import PropTypes from 'prop-types';
import React from 'react';
import {StyleSheet} from 'react-native';
import {AutoCompleteTextInput} from './components/AutoCompleteTextInput';
import {ListItemText} from './components/ListItemText';
import {isTextNullOrEmpty} from './utils/isTextNullOrEmpty';
import {lastWord} from './utils/lastWord';
import {replaceLastBy} from './utils/replaceLastBy';
import {replaceWordAt} from './utils/replaceWordAt';
import {unMatchedWord} from './utils/unMatchedWord';

const TextInputQuickTyping = ({
  data,
  onChangeText,
  onChangeQuery,
  ...props
}) => {
  const [searchText, setSearchText] = React.useState(null);
  const [query, setQuery] = React.useState(null);
  const [suggestions, setSuggestions] = React.useState([]);
  const [isQuerying, setIsQuerying] = React.useState(false);
  const [queryIndex, setQueryIndex] = React.useState(-1);

  React.useEffect(() => {
    if (data.length === 0 || !isQuerying) {
      setSuggestions([]);

      return;
    }

    setSuggestions(data);
  }, [isQuerying, data]);

  React.useEffect(() => {
    onChangeText && onChangeText(searchText);

    if (isTextNullOrEmpty(searchText)) {
      setSuggestions([]);
    }
  }, [searchText, onChangeText]);

  React.useEffect(() => {
    setIsQuerying(!isTextNullOrEmpty(query));
  }, [query]);

  React.useEffect(() => {
    if (!isQuerying) {
      return;
    }

    onChangeQuery && onChangeQuery(query);
  }, [query, isQuerying, onChangeQuery]);

  const onChangeInputText = (newText) => {
    try {
      const {word, index} = unMatchedWord(searchText, newText);
      const queryText = word ?? lastWord(newText);
      setQuery(queryText);
      setQueryIndex(index);
      setSearchText(newText);
    } catch (error) {
      setQuery(null);
      setQueryIndex(-1);
      setSearchText(newText);
    }
  };

  const onPressItem = (suggestion) => {
    if (!isTextNullOrEmpty(query) && queryIndex >= -1) {
      resetQuery();
      setSearchText(`${replaceWordAt(queryIndex, suggestion, searchText)} `);
      return;
    }

    setSearchText(`${replaceLastBy(suggestion, searchText)} `);
  };

  const resetQuery = () => {
    setQuery(null);
    setQueryIndex(-1);
  };

  const renderItem = ({item, index}) => {
    const onPress = () => onPressItem(item);

    if (isTextNullOrEmpty(item)) {
      return null;
    }

    return (
      <ListItemText
        key={index.toString()}
        label={item}
        query={query}
        onPress={onPress}
      />
    );
  };

  return (
    <AutoCompleteTextInput
      {...props}
      containerStyle={styles.container}
      suggestions={suggestions}
      defaultValue={searchText}
      onChangeText={onChangeInputText}
      renderItem={renderItem}
      keyExtractor={(_, index) => index.toString()}
    />
  );
};

TextInputQuickTyping.propTypes = {
  data: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'lightgrey',
    backgroundColor: 'white',
  },
});

export default TextInputQuickTyping;
