## Wait For It - Advent of Code Day 6 Challenge

[Challenge](https://adventofcode.com/2023/day/6)

### Problem Overview

The goal is to find the winning strategy count for each race and multiply the obtained counts for all races.

### Approach

After transforming the input, we can leverage the code developed in part 1. However, since I opted to use Bash for this challenge, a brute force approach isn't feasible

What we can do instead is find a point x where strategy(x) > current_best and strategy(x-1) <= current_best.

Once we identify that point, we know that every point in the range [x, time-x] beat the current_best time.

### Algorithm

1. **Find x:**

   - We can use binary search to find x.

   ```bash
   b_search() {
    low=0
    hight=$1
    mid=$((hight / 2))
    while [[ ! $(is_match $mid $1 $2) -eq 1 ]]; do
        num=$mid
        comp=$(($1 - $num))
        if [[ $(is_match $mid $1 $2) -eq 1 ]]; then
            break
        elif [[ $(($num * $comp)) -gt $2 ]]; then
            low=$mid
        else
            high=$mid
        fi
        mid=$(((low + high) / 2))
    done

    echo $mid
   }

   ```

2. **Compute number of point between x and time-x :**

   ```bash
   # times => list of times
   traverse() {
    res=1
    for ((i = 0; i < ${#times[@]}; i++)); do
        mid=$(b_search ${times[$i]} ${distances[$i]})
        count=$((${times[$i]} - 2 * $mid + 1))
        res=$(($res * $count))
    done
    echo $res
   }
   ```

## Demo

```bash
bash two.sh <path-to-input>
```
