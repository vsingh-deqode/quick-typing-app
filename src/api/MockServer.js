const FAILURE_COEFF = 10;
const MAX_SERVER_LATENCY = 200;

export class MockServer {
  static getRandomBool(n) {
    var maxRandomCoeff = 1000;
    if (n > maxRandomCoeff) {
      n = maxRandomCoeff;
    }

    return Math.floor(Math.random() * maxRandomCoeff) % n === 0;
  }

  static getSuggestions(text) {
    var pre = 'pre';
    var post = 'post';
    var results = [];
    if (this.getRandomBool(2)) {
      results.push(pre + text);
    }

    if (this.getRandomBool(2)) {
      results.push(text);
    }

    if (this.getRandomBool(2)) {
      results.push(text + post);
    }

    if (this.getRandomBool(2)) {
      results.push(pre + text + post);
    }

    return new Promise((resolve, reject) => {
      var randomTimeout = Math.random() * MAX_SERVER_LATENCY;
      setTimeout(() => {
        if (this.getRandomBool(FAILURE_COEFF)) {
          reject();
        } else {
          resolve(results);
        }
      }, randomTimeout);
    });
  }
}
