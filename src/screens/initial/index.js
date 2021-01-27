import React from 'react';
import {
  Keyboard,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';
import {MockServer} from '../../api/MockServer';
import {isTextNullOrEmpty} from '../../utilities/isTextNullOrEmpty';
import {lastWord} from '../../utilities/lastWord';

export const Initial = () => {
  const [searchText, setSearchText] = React.useState();
  const [query, setQuery] = React.useState();
  const [suggestions, setSuggestions] = React.useState([]);

  React.useEffect(() => {
    if (isTextNullOrEmpty(searchText)) {
      setSuggestions([]);

      return;
    }

    setQuery(lastWord(searchText));
  }, [searchText]);

  React.useEffect(() => {
    if (isTextNullOrEmpty(query)) {
      setSuggestions([]);

      return;
    }

    MockServer.getSuggestions(query)
      .then(setSuggestions)
      .catch((_) => {
        setSuggestions([]);
      });
  }, [query]);

  const onPressSuggestion = (suggestion) => {
    setSearchText(`${searchText.trim().replace(query, suggestion)} `);
  };

  const onOutSideTouch = () => {
    Keyboard.dismiss();
    setSuggestions([]);
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <TouchableOpacity
        activeOpacity={1}
        style={styles.container}
        onPress={onOutSideTouch}>
        <Autocomplete
          autoCapitalize="none"
          autoCorrect={false}
          containerStyle={styles.autocompleteContainer}
          data={suggestions}
          defaultValue={searchText}
          onChangeText={setSearchText}
          placeholder="Search"
          renderItem={({item, index}) => (
            <TouchableOpacity
              key={index.toString()}
              style={styles.suggestionContainer}
              onPress={() => onPressSuggestion(item)}>
              <Text
                style={styles.suggestionContainerText(
                  item.toString().toLowerCase() ===
                    query.toString().toLowerCase(),
                )}>
                {item}
              </Text>
            </TouchableOpacity>
          )}
        />
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25,
  },
  autocompleteContainer: {
    marginHorizontal: 10,
  },
  suggestionContainer: {
    margin: 5,
  },
  suggestionContainerText: (isMatched) => ({
    fontSize: isMatched ? 18 : 16,
    margin: 2,
    padding: 5,
    color: isMatched ? 'green' : 'black',
  }),
});
