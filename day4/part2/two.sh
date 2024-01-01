#!/bin/bash

declare -A cards

score (){
    if [[ -z $1 ]]; then
        echo "Missing input"
        return 1
    fi

    declare -A winning_numbers

    IFS='|' read -ra game <<< $1
    IFS=':' read -ra winnig <<< ${game[0]} 

    input=${winnig[1]}
    game_info=${winnig[0]}
    card=0
    selected=${game[1]}
    score=0

    while [[ $game_info =~ [0-9]+ ]]; do
        card=${BASH_REMATCH[0]}
        game_info=${game_info/${BASH_REMATCH[0]}/}}
	done

    if [[ $game_info =~ [0-9]+ ]]; then
        card=${BASH_REMATCH[0]}
    fi

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
                score=$(($score +1))
            fi
        fi
        selected=${selected/${BASH_REMATCH[0]}/}}
	done

    if [[ -z ${cards[$card]} ]]; then
        cards[$card]=1
    else
        cards[$card]=$((cards[$card]+1))
    fi

    for ((i = $card +1 ; i < $card +1 + $score ; i++)); do
        cards[$i]=$((cards[$i]+cards[$card]))
    done

}

read_file(){

	if [[ -z $1 ]]; then
        echo "Need an input"
        return 1
    fi

    score=0
	
	while read -r line; do
        score "$line"
    done < $1

    sum=0

    for card in ${cards[@]}; do
        sum=$(($sum+$card))
    done

    echo $sum
}

read_file $1