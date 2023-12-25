#!/bin/bash

formatNumber() {

	case $1 in

	"one")
		return 1
		;;

	"two")
		return 2
		;;

	"three")
		return 3
		;;

	"four")
		return 4
		;;
	"five")
		return 5
		;;
	"six")
		return 6
		;;
	"seven")
		return 7
		;;
	"eight")
		return 8
		;;
	"nine")
		return 9
		;;

	*)
		return $1
		;;
	esac
}

extract() {
	if [[ -z $1 ]]; then
		echo "Missing input"
		return 1
	fi

	first=""
	last=""

	numbers="one|two|three|four|five|six|seven|eight|nine"

	input=$1

	while [[ $input =~ [0-9]|$numbers ]]; do
		formatNumber ${BASH_REMATCH[0]}
		char=$?
		if [[ -z $first ]]; then
			first="$char"
			last="$char"
		else
			last="$char"
		fi
		input=${input/${BASH_REMATCH[0]}/${BASH_REMATCH[0]:1}}
	done
	return "$first$last"

}

readFile() {

	if [[ -z $1 ]]; then
		echo "Need an input"
		return 1
	fi

	accu=0

	while read -r line; do
		extract $line
		accu=$(($? + $accu))
	done <$1

	echo $accu
	return 0
}

readFile $1
