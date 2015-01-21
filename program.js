var index = 2;
var sum = 0;
var numToAdd;

while (numToAdd = process.argv[index]) {
    sum += parseInt(numToAdd) || 0;
    index++;
}

console.log(sum);