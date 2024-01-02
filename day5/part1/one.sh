#!/bin/bash

declare -A seeds

set_seed() {

    if [[ -z $1 ]]; then
        echo "Need an input"
        return 1
    fi

    seeds_raw=$(awk '/seeds:/' $1)

    while [[ $seeds_raw =~ [0-9]+ ]]; do
        seeds[${BASH_REMATCH[0]}]=${BASH_REMATCH[0]}
        seeds_raw=${seeds_raw/${BASH_REMATCH[0]}/}}
    done

}

get_command() {
    case "$1" in
    seeds_to_soil)
        awk '/seed-to-soil map:/{flag=1;next};/^\s$/{flag=0}flag' $2
        ;;
    soil_to_fertilizer)
        awk '/soil-to-fertilizer map:/{flag=1;next};/^\s$/{flag=0}flag' $2
        ;;
    fertilizer_to_water)
        awk '/fertilizer-to-water map:/{flag=1;next};/^\s$/{flag=0}flag' $2
        ;;
    water_to_light)
        awk '/water-to-light map:/{flag=1;next};/^\s$/{flag=0}flag' $2
        ;;
    light_to_temperature)
        awk '/light-to-temperature map:/{flag=1;next};/^\s$/{flag=0}flag' $2
        ;;
    temperature_to_humidity)
        awk '/temperature-to-humidity map:/{flag=1;next};/^\s$/{flag=0}flag' $2
        ;;
    humidity_to_location)
        awk '/humidity-to-location map:/{flag=1;next};/^\s$/{flag=0}flag' $2
        ;;

    esac
}

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

location() {
    current=$2

    current=$(map $1 seeds_to_soil $current)
    current=$(map $1 soil_to_fertilizer $current)
    current=$(map $1 fertilizer_to_water $current)
    current=$(map $1 water_to_light $current)
    current=$(map $1 light_to_temperature $current)
    current=$(map $1 temperature_to_humidity $current)
    current=$(map $1 humidity_to_location $current)

    echo $current
}

lowest_location() {
    current=9999999999

    for seed in ${seeds[@]}; do
        loc=$(location $1 $seed)
        if [[ $loc -lt $current ]]; then
            echo " New lowest $seed -> $loc"
            current=$loc
        fi
    done

    echo Minimum: $current
    return $current
}

set_seed $1
lowest_location $1
