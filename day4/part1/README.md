## Scratchcards

### Problem Overview

In this game of scratchcards, you must identify the matching numbers from the provided winning numbers list, with each subsequent match doubling the card's point value, ultimately determining the total points accumulated from the scratchcards.

[Challenge](https://adventofcode.com/2023/day/4)

### Approach

We want for each line to extract the list of winning number with the id of the game as well as the drawn numbers.

### Algorithm

```bash
score (){
    if [[ -z $1 ]]; then
        echo "Missing input"
        return 1
    fi

    declare -A winning_numbers

    IFS='|' read -ra game <<< $1
    IFS=':' read -ra winnig <<< ${game[0]}

    input=${winnig[1]}
    selected=${game[1]}
    score=0

    while [[ $input =~ [0-9]+ ]]; do
		current=${BASH_REMATCH[0]}
        winning_numbers[$current]=true
        input=${input/${BASH_REMATCH[0]}/}}
	done
    while [[ $selected =~ [0-9]+ ]]; do
        current=${BASH_REMATCH[0]}
        if [[ -n ${winning_numbers[$current]} ]]; then
            if [[ $score == 0 ]]; then
                score=1
            else
                score=$(($score *2))
            fi
        fi
        selected=${selected/${BASH_REMATCH[0]}/}}
	done
    echo $score
}
```

## Demo

```bash
bash one.sh <path-to-input>
```
