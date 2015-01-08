var redis = require('redis'),
    client = redis.createClient();

function Entry(obj) {
    for (var prop in obj) {
        this[prop] = obj[prop];
    }
}

Entry.prototype.save = function(user, fn) {
    if (user) {
        client.lpush(user + ':entries', JSON.stringify(this), function(err) {
            if (err) fn(err);
            fn();
        });
    }
};

module.exports = Entry;
