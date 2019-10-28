<?php

print_r($argv);

$input = $argv[1];

$digits = str_split($input);

print_r($digits);

$keypad = [
    0 => [' '],
    1 => [''],
    2 => ['a', 'b', 'c'],
    3 => ['d', 'e', 'f'],
    4 => ['g', 'h', 'i'],
    5 => ['j', 'k', 'l'],
    6 => ['m', 'n', 'o'],
    7 => ['p', 'q', 'r', 's'],
    8 => ['t', 'u', 'v'],
    9 => ['w', 'x', 'y', 'z'],
];

$combos = [];

$numCombos = 1;

foreach ($digits as $i => $digit) {
    $keypadLetters = $keypad[$digit];
    $combos[] = $keypadLetters;
}

$results = [];
foreach ($combos as $i => $letters) {

    if ($i == 0) {
        foreach ($letters as $char) {
            // echo "$char\n";
            // trying to start the combos, but think I'm starting it wrong
            $results[$char] = 1;
        }
    }
    else {
        // This is wrong
        foreach ($letters as $char) {
            $keys = array_keys($results);
            foreach (array_keys($results) as $key => $combo) {
                $combo .= $char;
                $results[$combo] = 1;
            }
        }
    }
}

print_r($results);

// echo count($digits), "\n";

$final = [];
foreach ($results as $k => $v) {
    // echo $k, count($k), "\n";
    if (strlen($k) == count($digits)) {
        // echo $k, '-', $v, "\n";
        $final[] = $k;
    }
}

sort($final);
print_r($final);
