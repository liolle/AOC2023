#!/bin/bash

declare -A times
declare -A distances
declare -A decomposed_times

extract_times() {

    times_raw=$(awk '/Time:/' $1)
    i=0
    while [[ $times_raw =~ [0-9]+ ]]; do
        times[$i]=${BASH_REMATCH[0]}
        times_raw=${times_raw/${BASH_REMATCH[0]}/}}
        let i++
    done

}

extract_distances() {

    distances_raw=$(awk '/Distance:/' $1)
    i=0
    while [[ $distances_raw =~ [0-9]+ ]]; do
        distances[$i]=${BASH_REMATCH[0]}
        distances_raw=${distances_raw/${BASH_REMATCH[0]}/}}
        let i++
    done

}

decompose() {
    count=0
    for ((i = 0; i <= $1; i++)); do
        num=$i
        comp=$(($1 - $i))
        if [[ $(($num * $comp)) -gt $2 ]]; then
            let count++
        fi
    done
    echo $count
}

traverse() {
    res=1
    for ((i = 0; i < ${#times[@]}; i++)); do
        count=$(decompose ${times[$i]} ${distances[$i]})
        res=$(($res * $count))
    done
    echo $res
}

read_file() {

    if [[ -z $1 ]]; then
        echo "Need an input"
        return 1
    fi

    while read -r line; do
        echo $line
    done <$1

}

extract_times $1
extract_distances $1

traverse
