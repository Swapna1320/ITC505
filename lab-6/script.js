// Function to perform the sorting
function performSort() {
    const input = document.getElementById("numberInput").value;
    const numbers = input.split(',').map(num => parseInt(num.trim()));

    if (numbers.some(isNaN)) {
        alert("Please enter valid numbers separated by commas.");
        return;
    }

    const sortingSteps = document.getElementById("sortingSteps");
    const sortedOutput = document.getElementById("sortedOutput");

    sortingSteps.innerHTML = ''; // Clear previous steps

    // Call mergeSort and display the steps
    const sortedArray = mergeSort(numbers, sortingSteps);

    // Display final sorted output
    sortedOutput.innerText = `Sorted Array: ${sortedArray.join(", ")}`;
}

// Function to generate random array
function generateRandomArray() {
    const randomNumbers = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100));
    document.getElementById("numberInput").value = randomNumbers.join(", ");
}

// Merge Sort function with step-by-step display
function mergeSort(arr, sortingSteps) {
    if (arr.length <= 1) return arr;

    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid), sortingSteps);
    const right = mergeSort(arr.slice(mid), sortingSteps);

    return merge(left, right, sortingSteps);
}

// Function to merge two arrays
function merge(left, right, sortingSteps) {
    let result = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
            result.push(left[leftIndex]);
            leftIndex++;
        } else {
            result.push(right[rightIndex]);
            rightIndex++;
        }
    }

    // Concatenate remaining elements
    result = result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));

    // Display merge step in sorting steps
    sortingSteps.innerHTML += `<li>Merge Step: [${result.join(", ")}]</li>`;

    return result;
}

// Display last modified date
document.getElementById('lastModified').textContent = document.lastModified;
