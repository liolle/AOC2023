#!/bin/bash

declare -A times
declare -A distances
declare -A decomposed_times

extract_times() {

    times_raw=$(awk '/Time:/' $1)
    acc=""
    while [[ $times_raw =~ [0-9]+ ]]; do
        acc="$acc${BASH_REMATCH[0]}"

        times_raw=${times_raw/${BASH_REMATCH[0]}/}}
    done
    times[0]=$acc

}

extract_distances() {

    distances_raw=$(awk '/Distance:/' $1)
    acc=""
    while [[ $distances_raw =~ [0-9]+ ]]; do
        acc="$acc${BASH_REMATCH[0]}"
        distances_raw=${distances_raw/${BASH_REMATCH[0]}/}}
    done
    distances[0]=$acc

}

is_match() {
    prev_num=$(($1 - 1))
    prev_comp=$(($2 - $prev_num))
    num=$1
    comp=$(($2 - $num))
    if [[ $(($prev_num * $prev_comp)) -lt $3 && $(($num * $comp)) -gt $3 ]]; then
        echo 1
        return 1
    fi
    echo 0
    return 0
}

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

traverse() {
    res=1
    for ((i = 0; i < ${#times[@]}; i++)); do
        mid=$(b_search ${times[$i]} ${distances[$i]})
        count=$((${times[$i]} - 2 * $mid + 1))
        res=$(($res * $count))
    done
    echo $res
}

extract_times $1
extract_distances $1

traverse
