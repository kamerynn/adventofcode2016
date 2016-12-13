// Day 1 solution in plain JS

var input = "L2, L3, L3, L4, R1, R2, L3, R3, R3, L1, L3, R2, R3, L3, R4, R3, R3, L1, L4, R4, L2, R5, R1, L5, R1, R3, L5, R2, L2, R2, R1, L1, L3, L3, R4, R5, R4, L1, L189, L2, R2, L5, R5, R45, L3, R4, R77, L1, R1, R194, R2, L5, L3, L2, L1, R5, L3, L3, L5, L5, L5, R2, L1, L2, L3, R2, R5, R4, L2, R3, R5, L2, L2, R3, L3, L2, L1, L3, R5, R4, R3, R2, L1, R2, L5, R4, L5, L4, R4, L2, R5, L3, L2, R4, L1, L2, R2, R3, L2, L5, R1, R1, R3, R4, R1, R2, R4, R5, L3, L5, L3, L3, R5, R4, R1, L3, R1, L3, R3, R3, R3, L1, R3, R4, L5, L3, L1, L5, L4, R4, R1, L4, R3, R3, R5, R4, R3, R3, L1, L2, R1, L4, L4, L3, L4, L3, L5, R2, R4, L2";

// Format input
var operations = input.split(", ");

// Store starting direction
var direction = 'N';

// Store absolute directions and their respective counts
var directionLookup = {
  N: {
    count: 0,
    L: 'W',
    R: 'E'
  },
  E: {
    count: 0,
    L: 'N',
    R: 'S'
  },
  S: {
    count: 0,
    L: 'E',
    R: 'W'
  },
  W: {
    count: 0,
    L: 'S',
    R: 'N'
  }
}

// Store snapshots of current position
var locations = [];

var part2SolutionFound = false;

// Calculate distances based on the absolute directional counts
function calculateXCoordinate() {
  return directionLookup['E'].count - directionLookup['W'].count;
}

function calculateYCoordinate() {
  return directionLookup['N'].count - directionLookup['S'].count;
}

function calculateDistance() {
  return Math.abs(calculateXCoordinate()) + Math.abs(calculateYCoordinate());
}

var walk = function(blocks, direction, locations) {
  if (blocks <= 0) { return; }

  while (blocks > 0) {
    // Decrement the blocks walked by 1
    blocks -= 1;

    // Add a block to count for direction
    // TODO: get rid of global?
    directionLookup[direction].count += 1;

    // Calculate X and Y coordinates
    var horizontal = calculateXCoordinate();
    var vertical = calculateYCoordinate();

    // Check history if we've been at this X / Y position before
    locations.forEach(function(location) {
      if (location.horizontal === horizontal && location.vertical === vertical) {
        if (!part2SolutionFound) {
            console.log('Part 2 answer: ', calculateDistance());
            part2SolutionFound = true;
        }
      }
    });

    // Store new location in history
    locations.push({
      horizontal: horizontal,
      vertical: vertical
    });
  }
}

// Walk through inputs
operations.forEach(function(operation) {
  var turn = operation.substr(0, 1);
  var blocks = operation.substr(1);

  // Based on input, modify the direction
  var newDirection = directionLookup[direction][turn];
  direction = newDirection;

  // Stepping logic to walk in one direction
  walk(blocks, newDirection, locations);
});

// Answer
console.log('Part 1 answer: ', calculateDistance());
