import PropTypes from 'prop-types';
import React from 'react';
import {StyleSheet} from 'react-native';
import {AutoCompleteTextInput} from './components/AutoCompleteTextInput';
import {ListItemText} from './components/ListItemText';
import {isTextNullOrEmpty} from './utils/isTextNullOrEmpty';
import {lastWord} from './utils/lastWord';
import {replaceLastBy} from './utils/replaceLastBy';

const TextInputQuickTyping = ({
  data,
  onChangeText,
  onChangeQuery,
  ...props
}) => {
  const [searchText, setSearchText] = React.useState();
  const [query, setQuery] = React.useState();
  const [suggestions, setSuggestions] = React.useState([]);
  const [isQuerying, setIsQuerying] = React.useState(false);

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

      return;
    }

    setQuery(lastWord(searchText));
  }, [searchText, onChangeText]);

  React.useEffect(() => {
    if (isTextNullOrEmpty(query)) {
      setIsQuerying(false);

      return;
    }

    setIsQuerying(true);
  }, [query]);

  React.useEffect(() => {
    if (!isQuerying) {
      return;
    }

    onChangeQuery && onChangeQuery(query);
  }, [query, isQuerying, onChangeQuery]);

  const onPressItem = (suggestion) => {
    setSearchText(`${replaceLastBy(suggestion, searchText)} `);
  };

  const renderItem = ({item, index}) => {
    const onPress = () => onPressItem(item);

    return (
      <ListItemText
        key={index.toString()}
        label={item}
        isMatched={item.toLowerCase() === query.toLowerCase()}
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
      onChangeText={setSearchText}
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
