import React from 'react';
import {Keyboard, StatusBar, StyleSheet, TouchableOpacity} from 'react-native';
import {MockServer} from '../../api/MockServer';
import TextInputQuickTyping from '../../common/components/TextInputQuickTyping';
import {debounce} from '../../utils/debounce';

export const Home = () => {
  const [query, setQuery] = React.useState();
  const [options, setOptions] = React.useState([]);

  React.useEffect(() => {
    debounce(() => getSuggestions(query), 500);
  }, [query, getSuggestions]);

  const getSuggestions = React.useCallback(
    (queryText) =>
      MockServer.getSuggestions(queryText)
        .then(setOptions)
        .catch((_) => {
          setOptions([]);
        }),
    [],
  );

  const onOutSideTouch = () => {
    Keyboard.dismiss();
    setOptions([]);
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
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
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
