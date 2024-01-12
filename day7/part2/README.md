## Camel Cards - Advent of Code Day 7 Challenge

[Challenge](https://adventofcode.com/2023/day/7)

### Problem Overview

The goal is rank each hand and calculating total winnings based on bids, where the weakest hand gets rank 1 and the strongest hand gets the highest rank .

### Approach

We can leverage the work done in part 1 and make slight adjustments to our handStrength function to align with the new set of rules.

### Algorithm

1. **Prepare hands:**

   - Use the `handStrength` helper function to assign a strength value to each hand based on its composition.

   ```typescript
   const hand_rank = {
     5: 7,
     "4-1": 6,
     "3-2": 5,
     "3-1-1": 4,
     "2-2-1": 3,
     "2-1-1-1": 2,
     "1-1-1-1-1": 1,
   };

   const handStrength = (hand) => {
     const tmp_map = new Map();

     for (let card of hand) {
       const mapped_card_val = tmp_map.get(card);
       if (!mapped_card_val) {
         tmp_map.set(card, 1);
         continue;
       }
       tmp_map.set(card, mapped_card_val + 1);
     }

     const arr = Array.from(tmp_map, ([name, value]) => [name, value]);
     let jokers = 0;

     const filtered_arr = arr.filter((val) => {
       if (val[0] === 1) {
         jokers += val[1];
         return false;
       }
       return true;
     });

     if (jokers == 5) return 7;

     filtered_arr.sort((a, b) => b[1] - a[1]);
     filtered_arr[0][1] = filtered_arr[0][1] + jokers;
     const arr_key = filtered_arr.reduce((acc, current) => {
       if (acc == "") return `${current[1]}`;
       return `${acc}-${current[1]}`;
     }, "");
     return hand_rank[arr_key] || 0;
   };
   ```

2. **Sort hands :**

- Assuming each hand has been prepared, employ the `compareHand` function to sort the list of hands.

  ```typescript
  const compareHand = (hand1, hand2) => {
    if (hand1.strength == hand2.strength) {
      for (let i = 0; i < hand1.hand.length; i++) {
        if (hand1.hand[i] == hand2.hand[i]) {
          continue;
        }
        return hand1.hand[i] - hand2.hand[i];
      }
    }
    return hand1.strength - hand2.strength;
  };
  ```

## Demo

```bash
node solution.mjs <path-to-input>
```
