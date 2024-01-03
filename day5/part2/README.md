## If You Give A Seed A Fertilizer

[Challenge](https://adventofcode.com/2023/day/5)

## Solution

In this section of the challenge, the objective is to perform transformations on ranges rather than individual points.

We start with a single range, and at each transition, this range is subdivided into 1 to 3 ranges based on how it overlap with the transformation map.

The ultimate goal is to reach a specific location, and the selected range at that point is the smallest one among the subdivisions.

Once we have performed the `humidity-to-location map` transformation we can take the smallest value of the smallest range as answer

## Demo

```bash
node test.mjs <file-path>
```
