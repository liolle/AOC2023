## Trebuchet

[Challenge](https://adventofcode.com/2023/day/1)

## Solution

For the second part ,the idea remain the same but instead of testing character by character we want to test from one regular expression to an other

This regex should do the trick `[0-9]|one|two|three|four|five|six|seven|eight|nine`

## Edge case

We also need to handle cases where numbers are overlapping like `nineight`.

To address this, we can selectively remove only the non-overlapping portion, allowing the subsequent regex test to match for 'eight'.

## Demo

```bash
bash two.sh <path-to-input>
```
