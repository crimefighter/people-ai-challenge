# people-ai-challenge

Original: https://people-ai.github.io/client-test/

Improvements:

* Added ability to select date and number of days displayed
* Requests are cached within session to speed up navigation
* Chart is responsive
* Sleek dark color scheme for night viewing with colored labels

Built with:

* React
* Yeoman && [generator-react-webpack](https://github.com/react-webpack-generators/generator-react-webpack)
* [react-router](https://github.com/ReactTraining/react-router)
* [recharts](https://github.com/recharts/recharts)

Tested with mocha and chai

```
SUMMARY:
✔ 51 tests completed
----------------------------|----------|----------|----------|----------|----------------|
File                        |  % Stmts | % Branch |  % Funcs |  % Lines |Uncovered Lines |
----------------------------|----------|----------|----------|----------|----------------|
 components/                |      100 |    99.39 |      100 |      100 |                |
  AppComponent.js           |      100 |      100 |      100 |      100 |                |
  NavigationBarComponent.js |      100 |      100 |      100 |      100 |                |
  RateBarLabelComponent.js  |      100 |      100 |      100 |      100 |                |
  RatesDisplayComponent.js  |      100 |       98 |      100 |      100 |                |
  TitleBarComponent.js      |      100 |      100 |      100 |      100 |                |
 config/                    |      100 |      100 |      100 |      100 |                |
  base.js                   |      100 |      100 |      100 |      100 |                |
  test.js                   |      100 |      100 |      100 |      100 |                |
 sources/                   |      100 |      100 |      100 |      100 |                |
  RatesSource.js            |      100 |      100 |      100 |      100 |                |
 stores/                    |      100 |      100 |      100 |      100 |                |
  RateCalculationsStore.js  |      100 |      100 |      100 |      100 |                |
  RateStore.js              |      100 |      100 |      100 |      100 |                |
  RatesStore.js             |      100 |      100 |      100 |      100 |                |
----------------------------|----------|----------|----------|----------|----------------|
All files                   |      100 |    99.56 |      100 |      100 |                |
----------------------------|----------|----------|----------|----------|----------------|
```
