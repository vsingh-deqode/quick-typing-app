import React from 'react';
import {Keyboard, StyleSheet, TouchableOpacity} from 'react-native';
import {MockServer} from '../../api/MockServer';
import TextInputQuickTyping from '../../common/components/TextInputQuickTyping';
import {debounce} from '../../utils/debounce';

export const Home = () => {
  const [query, setQuery] = React.useState();
  const [options, setOptions] = React.useState([]);

  React.useEffect(() => {
    delayedQuery(query);
  }, [query, delayedQuery]);

  const delayedQuery = React.useCallback(
    debounce((queryText) => getSuggestions(queryText), 500),
    [],
  );

  const getSuggestions = (queryText) => {
    MockServer.getSuggestions(queryText)
      .then(setOptions)
      .catch((_) => {
        setOptions([]);
      });
  };

  const onOutSideTouch = () => {
    Keyboard.dismiss();
    setOptions([]);
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.container}
      onPress={onOutSideTouch}>
      <TextInputQuickTyping
        data={options}
        onChangeQuery={setQuery}
        placeholder="Search"
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
