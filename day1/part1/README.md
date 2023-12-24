## Trebuchet

[Challenge](https://adventofcode.com/2023/day/1)

## Solution

Our objective is to identify the first and last digits in a given string.

The most straightforward would be to split the string into its individual character array and then traverse the array to find the digits.

We can then use two pointers starting at index 0, let's call them `first` and `last`. The goal is to update both pointers when we encounter a digit but stop updating `first` after the first digit is found.
