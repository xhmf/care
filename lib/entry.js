var redis = require('redis'),
    client = redis.createClient();

// copy obj's properties into this entry object
function Entry(obj) {
  for (var prop in obj) {
    this[prop] = obj[prop];
  }
}

// entry object's save function will save a JSON
// representation in the redis database if the
// user if logged in
Entry.prototype.save = function(user, fn) {
  if (user) {
    client.lpush(user + ':entries', JSON.stringify(this), function(err) {
      if (err) fn(err);
      fn();
    });
  }
};

module.exports = Entry;
