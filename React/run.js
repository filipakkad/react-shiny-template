
const rewire = require('rewire');
const defaults = rewire('react-scripts/scripts/start.js');
console.log(defaults)
const configFactory = defaults.__get__('configFactory');

console.log('dfd ' +configFactory)