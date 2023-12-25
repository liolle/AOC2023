#!/bin/bash

extract() {
	if [[ -z $1 ]]; then
		echo "Missing input"
		return 1
	fi

	first=""
	last=""

	for ((i = 0; i < ${#1}; i++)); do
		char="${1:i:1}"
		if [[ $char =~ ^[0-9]$ ]]; then
			if [[ -z $first ]]; then
				first="$char"
				last="$char"
			else
				last="$char"
			fi
		fi
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
}

readFile $1
