var crypto = require('crypto');

// Initial input
var doorID = 'ugkcyxxp';

var passwordChars = [];
var index = 0;

while (passwordChars.length < 8) {
    // Append the index to door ID
    var toHash = doorID + index;

    // Calculate the MD5 hash of the new string
    var hash = crypto.createHash('md5').update(toHash).digest('hex');

    // If the hash has 5 leading zeroes
    if (hash.substr(0, 5) === '00000') {
        // Store the 6th char
        console.log(hash);
        passwordChars.push(hash.substr(5, 1))
    }

    index++;
}

var solution = passwordChars.join('');
console.log(solution);
