# App

A `react-native` app with a quick typing text input. It enables the text input field to use suggestions facilitating quick typing.

### How it works

![](https://github.com/vsingh-deqode/quick-typing-app/blob/main/src/assets/demo.gif)

### System requirements

- Node
- npm OR yarn
- CocoaPods
- XCode
- AndroidStudio

For setting up the whole environment for react-native apps, check out [this](https://reactnative.dev/docs/environment-setup).

### Installation

Install the dependencies and devDependencies and start the server.

```sh
$ git clone https://github.com/vsingh-deqode/quick-typing-app.git
$ cd App
$ yarn
```

### Run Apps

Run iOS

```sh
$ npx pod-install
$ yarn ios
```

Run Android

- Run the emulator
- Run the following command

```sh
$ yarn android
```

`Note`: In case of any error while running the anroid verison of the app, build the app from the Android Studio and then run it on the emulator.

### Props

| Prop          | Type  | Required | Description                                           |
| ------------- | ----- | -------- | ----------------------------------------------------- |
| data          | Array | true     | It takes the array of strings for the suggestions     |
| onChangeQuery | fun   | false    | It gives the current word for getting the suggestions |

Note: All `TextInput` props are supported.

### Development

- `Project Structure`: Used module wise directory structure as this makes code more readable.
- `API`: Separate API module that is replaceable with other API modules.
- `Functional component`: It uses a functional component as it has better readability and performance than Class components.
- `Navigation flow`: Used react-navigation to create a single navigator for the app.
- `Styling`: Used stylesheet to avoid the inline styles as those are getting created in every re-render.
- `Debounce`: Used debouncing for the text input to avoid the frequent API calls while typing. Avoided use of any third-party library just for this small feature.
- `Home screen`: On the home screen, used `TouchableOpacity` to achieve the behavior of hiding suggestions on touching outside of the input box.
- `TextInputQuickTyping`: It takes multiple props for text input where `data` is a required prop for the component. It takes the array of strings for the suggestions. Avoided passing unnecessary props to maintain the abstraction.

### Improvements

- Unit test cases for utility functions
- Highlight the suggestion even if it contains the input text.
- Add styling props if needed to change the component layout.
- Functionality enhancement of the text input quick typing component
