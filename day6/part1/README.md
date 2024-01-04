## Wait For It - Advent of Code Day 6 Challenge

[Challenge](https://adventofcode.com/2023/day/6)

### Problem Overview

The goal is to find the winning strategy count for each race and multiply the obtained counts for all races.

### Approach

For each race, decompose the time into pairs of positive numbers that multiply to the given time. Generate strategies based on these pairs, calculate distances, and count the strategies that beat the current best distance.

### Algorithm

1. **Decompose Time:**

   - For each race, decompose the time into pairs of positive numbers (strategy).

   ```typescript
   interface Strategy {
     chargeTime: number;
     moveTime: number;
     distance: number;
   }

   const firs_race_strategies: Strategy[] = [
     {
       chargeTime: 0,
       moveTime: 7,
       distance: 0,
     },
     //...
     {
       chargeTime: 2,
       moveTime: 5,
       distance: 10,
     },
     {
       chargeTime: 3,
       moveTime: 4,
       distance: 12,
     },
     //...
     {
       chargeTime: 7,
       moveTime: 0,
       distance: 0,
     },
   ];
   ```

2. **Count Winning Strategies:**

   - Count the number of strategies whose distance is greater than the current best distance.

   ```typescript
   const winning_strategy_count = firs_race_strategies.filter(
     (strategy) => strategy.distance > current_best
   ).length;
   ```

3. **Multiply Winning Counts:**
   - Multiply the obtained winning strategy counts for all races.

## Demo

```bash
bash one.sh <path-to-input>
```
