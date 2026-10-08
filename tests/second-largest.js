function findSecondLargest(arr) {
    if (arr.length < 2) return null; // Not enough elements

    let largest = -Infinity;
    let secondLargest = -Infinity;

    for (let num of arr) {
        if (num > largest) {
            // Update second largest before changing largest
            secondLargest = largest;
            largest = num;
        } else if (num > secondLargest && num !== largest) {
            // Update second largest if it's smaller than num but not equal to largest
            secondLargest = num;
        }
    }

    return secondLargest === -Infinity ? null : secondLargest;
}

console.log(findSecondLargest([22,21,20,19,18])); // Output: 10
