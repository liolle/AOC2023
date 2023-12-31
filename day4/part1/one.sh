#!/bin/bash

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

read_file(){

	if [[ -z $1 ]]; then
        echo "Need an input"
        return 1
    fi

    score=0
	
	while read -r line; do
        result=$(score "$line")
        score=$(($score + $result))
    done < $1

    echo $score

}

read_file $1