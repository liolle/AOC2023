const hand_rank = {
  5: 7,
  "4-1": 6,
  "3-2": 5,
  "3-1-1": 4,
  "2-2-1": 3,
  "2-1-1-1": 2,
  "1-1-1-1-1": 1,
};

export const hand_strength = (hand) => {
  const tmp_map = new Map();

  for (let card of hand) {
    const mapped_card_val = tmp_map.get(card);
    if (!mapped_card_val) {
      tmp_map.set(card, 1);
      continue;
    }
    tmp_map.set(card, mapped_card_val + 1);
  }

  const arr = Array.from(tmp_map, ([name, value]) => [name, value]);

  let jokers = 0;

  const filtered_arr = arr.filter((val) => {
    if (val[0] === 1) {
      jokers += val[1];
      return false;
    }
    return true;
  });

  if (jokers == 5) return 7;

  filtered_arr.sort((a, b) => b[1] - a[1]);
  filtered_arr[0][1] = filtered_arr[0][1] + jokers;

  const arr_key = filtered_arr.reduce((acc, current) => {
    if (acc == "") return `${current[1]}`;
    return `${acc}-${current[1]}`;
  }, "");

  return hand_rank[arr_key] || 0;
};

export const raw_hand_to_hand = (raw_hand, matching_card) => {
  const [r_hand, r_bid] = raw_hand.split(" ");

  const transformed_hand = r_hand
    .split("")
    .map((val) => matching_card.get(val));

  return {
    hand: transformed_hand,
    strength: hand_strength(transformed_hand),
    bid: Number(r_bid.trim()),
  };
};

const compare_hand = (hand1, hand2) => {
  if (hand1.strength == hand2.strength) {
    for (let i = 0; i < hand1.hand.length; i++) {
      if (hand1.hand[i] == hand2.hand[i]) {
        continue;
      }
      return hand1.hand[i] - hand2.hand[i];
    }
  }

  return hand1.strength - hand2.strength;
};

const process_sorted_hand = (sorted_hand) => {
  let total = 0;
  for (let i = 0; i < sorted_hand.length; i++) {
    sorted_hand[i].rank = i + 1;
    sorted_hand[i].score = sorted_hand[i].bid * sorted_hand[i].rank;
    total += sorted_hand[i].score;
  }
  return total;
};

export const raw_hands_to_hands = (raw_hands, matching_card) => {
  const hands = [];

  for (let hand of raw_hands.split("\n").map((val) => val.trim())) {
    hands.push(raw_hand_to_hand(hand, matching_card));
  }

  hands.sort(compare_hand);

  const total = process_sorted_hand(hands);
  return {
    total: total,
    hands: hands,
  };
};
