## Gear Ratios

[Challenge](https://adventofcode.com/2023/day/3)

## Solution

One way to visualize this challenge is to imagine a around each number in that circle would then be a part number.

Our objective is to:

- Identify each symbol.
- For each symbol, locate the beginning of the number within the circle surrounding the symbol.
- Once the start of a number is identified, capture the entire numerical value.

To capture the all number from any starting point in the number we can use a variant of the BFS and and build the number as we find new element.

To build the number the idea would be to know if we need to append a new digit node to the front of the current number of in the back we can do that by adding a marker on the node .

Let say we have

```typescript
interface Position {
  row: number;
  col: number;
}

// Assuming that number only goes from left to right for any position we would have those two neighbor

const point: Position = {
  row: 5,
  col: 5,
};

const neighbor = [
  { row: 5, col: 4, side: "left" },
  { row: 5, col: 6, side: "right" },
];
```

We can then append each digit neighbor based on the side they have been generated from

## Demo

```bash
node one.js
```
