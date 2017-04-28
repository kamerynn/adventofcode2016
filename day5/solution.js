var crypto = require('crypto');

// Safely counts sparse arrays
function count(array) {
    var total = 0;
    for (var i = 0; i < array.length; i++) {
        if (i in array) {
            total++;
        }
    }

    return total;
}

// Initial input
var doorID = 'ugkcyxxp';

var passwordChars = [];
var passwordDesiredLength = 8;
var index = 0;

while (count(passwordChars) < passwordDesiredLength) {
    // Append the index to door ID
    var toHash = doorID + index;

    // Calculate the MD5 hash of the new string
    var hash = crypto.createHash('md5').update(toHash).digest('hex');

    // If the hash has 5 leading zeroes
    if (hash.substr(0, 5) === '00000') {
        console.log('valid hash found');
        console.log(hash);

        // The 6th character is the position
        var positionString = hash.substr(5, 1);
        var position = parseInt(positionString);

        // If the position is valid, and nothing exists yet in that position
        if (!isNaN(position) &&
            position < passwordDesiredLength &&
            passwordChars[position] === undefined) {

            console.log('valid position found');
            console.log(hash);

            passwordChars[position] = hash.substr(6, 1);
        }
    }

    index++;
}

var solution = passwordChars.join('');
console.log(solution);
