<?php
// Second effort after a bit of thinking and feeling a bit stupid
// usage: php nokia-solution.php '123456'

echo "argv\n";
print_r($argv);

$input = $argv[1];

$digits = str_split($input);

echo "digits\n";
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

$combos = [''];
foreach ($digits as $level => $digit) {
    $keypadLetters = $keypad[$digit];
    $combos = appendLetters($combos, $keypadLetters);
}

echo "combos=\n";
print_r($combos);

//
function appendLetters($result, $letters) {
    $appended = [];
    foreach ($result as $r) {
        foreach ($letters as $char) {
            $appended[] = $r . $char;
        }
    }
    return $appended;
}
