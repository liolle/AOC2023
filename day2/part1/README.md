## Cube Conundrum

[Challenge](https://adventofcode.com/2023/day/2)

## Solution

We aim to determine whether a game is valid or not.
To accomplish this, we can represent each game using an ID and a collection of rounds.
For a game to be considered valid, all its rounds must also be valid.

<i >
A valid round is defined as any round in which the quantity of cubes chosen for a particular color does not surpass the limit for that color.
</i>

Knowing that we can split our input into a list of games and check each round.

## Demo

```bash
bash one.sh <path-to-input>
```
