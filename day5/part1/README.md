## If You Give A Seed A Fertilizer

[Challenge](https://adventofcode.com/2023/day/5)

## Solution

A straightforward approach involves creating individual map functions for each transformation, such as `seed-to-soil`, `soil-to-fertilizer`, and so on.

We than want to regroup all those function into a general map function that takes a seed and provides the corresponding location.

Finally we want to run that function for all seed and keep track of the minimum.

#### Extract input

I started by reorganized the input in such a way that i can easily iterate through the list of seeds and have all the maps represented by a dictionary / hashmap.

Once this setup is established, I can convert a seed into a location by passing it through all the distinct maps.

## Demo

```bash
bash one.sh <path-to-input>
```
