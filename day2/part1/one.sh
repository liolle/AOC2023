#!/bin/bash"

declare -A rules

rules[red]=12
rules[green]=13
rules[blue]=14

extract_id() {
	if [[ $1 =~ [0-9]+ ]]; then
		return ${BASH_REMATCH[0]}
	fi
	return 20
}

read_file() {

	if [[ -z $1 ]]; then
		echo "Need an input"
		return 1
	fi

	total=0

	while read -r line; do
		IFS=':' read -ra elements <<<"$line"
		IFS=';' read -ra rounds <<<"${elements[1]}"
		extract_id "${elements[0]}"
		game_id=$?

		add_game=true

		for ((i = 0; i < ${#rounds[@]}; i++)); do
			IFS=',' read -ra draws <<<"${rounds[$i]}"
			for ((j = 0; j < ${#draws[@]}; j++)); do
				IFS=' ' read -ra draw <<<"${draws[$j]}"
				number=${draw[0]}
				color=${draw[1]}
				if [[ $number -gt ${rules[$color]} ]]; then
					add_game=false
					break
				fi
			done

		done

		if [[ $add_game == true ]]; then
			total=$(($total + $game_id))
		fi

	done <$1

	echo $total

}

read_file $1
