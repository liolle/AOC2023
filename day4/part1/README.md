## Scratchcards

[Challenge](https://adventofcode.com/2023/day/4)

## Solution

We want for each line to extract the list of winning number with the id of the game as well as the drawn numbers.

```javascript

const game = {
  id= number,
  winning_number = number[],
  drawn_number = number[]
}

```

Once we have that structure for each game we can, iterate over the list of drawn_number and increment each winning number we find using a dictionary : hash map.

## Demo

```bash
bash one.js ../in.txt
```
