function knpsck(weights, values, capacity) {
    const n = weights.length;
    const dp = Array.from({ length: n + 1 }, () => Array(capacity + 1).fill(0));

    for (let i = 1; i <= n; i++) {
        for (let w = 1; w <= capacity; w++) {
            if (weights[i - 1] <= w) {
                dp[i][w] = Math.max(dp[i - 1][w], dp[i - 1][w - weights[i - 1]] + values[i - 1]);
            }
            else {
                dp[i][w] = dp[i - 1][w];
            }
        }
    }
    return dp[n][capacity];
}
function getInputAndCalculate() {
    const prompt = require('prompt-sync')();
    const n = parseInt(prompt('Enter Number of Items:'), 10);
    const weights = [];
    console.log('Enter Weights of Items:');
    for (let i = 0; i < n; i++) {
        weights.push(parseInt(prompt(`Weight of Item ${i + 1}:`), 10));
    }
    const values = [];
    console.log('Enter Values of Items:');
    for (let i = 0; i < n; i++) {
        values.push(parseInt(prompt(`Value of Item ${i + 1}:`), 10));
    }
    const capacity = parseInt(prompt('Enter Capacity of Knapsack:'), 10);
    const maxValue = knpsck(weights, values, capacity);
    console.log(`Maximum Value that can be Obtained:${maxValue}`);
}
getInputAndCalculate();