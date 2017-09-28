var storage = require('node-persist');

var options = {
  dir : 'mydata',
  ttl : false
};

storage.initSync(options);

var name = storage.getItemSync('name');

console.log(name);
