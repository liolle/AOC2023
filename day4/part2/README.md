## Scratchcards

[Challenge](https://adventofcode.com/2023/day/4)

## Solution

Here the goal is to maintain a record of the score for each card in a card game. There are two ways for a card to accumulate points:

- Each card starts with one point (the original score).
- A card gains additional points based on the score of the preceding card.

One way to solve this challenge would be to iterates over the cards .

For each card, it adds the current card's score + 1 to the point tracking board of that card and the subsequent n cards (where n is the current card's score).

## Demo

```bash
bash two.js ../in.txt
```
