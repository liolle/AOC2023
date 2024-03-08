## If You Give A Seed A Fertilizer

### Problem Overview

The goal is to find the winning strategy count for each race and multiply the obtained counts for all races.
[Challenge](https://adventofcode.com/2023/day/5)

### Approach

A straightforward approach involves creating individual map functions for each transformation, such as `seed-to-soil`, `soil-to-fertilizer`, and so on.

We than want to regroup all those function into a general map function that takes a seed and provides the corresponding location.

Finally we want to run that function for all seed and keep track of the minimum.

### Algorithm

1.**Map function**

```js
function map() {

    while read -r line; do
        IFS='%s\n ' read -ra info <<<$line
        x="${info[@]}"

        src=0
        dst=0
        rg=0

        if [[ $x =~ [0-9]+ ]]; then
            src=${BASH_REMATCH[0]}
            x=${x/${BASH_REMATCH[0]}/}
        fi

        if [[ $x =~ [0-9]+ ]]; then
            dst=${BASH_REMATCH[0]}
            x=${x/${BASH_REMATCH[0]}/}
        fi

        if [[ $x =~ [0-9]+ ]]; then
            rg=${BASH_REMATCH[0]}
            x=${x/${BASH_REMATCH[0]}/}
        fi

        local -n ref=$2

        if [[ $3 -ge $dst && $3 -lt $(($rg + $dst)) ]]; then
            echo $(($src + $3 - $dst))
            return 1
        fi

    done <<<"$(get_command $2 $1)"
    echo $3
    return 1
}
```

## Demo

```bash
bash one.sh <path-to-input>
```
