<?php
/**
 * @return array
 */
function getDishes()
{
    return [
        [
            "id" => 1,
            "name" => "Pizza",
            "kitchen" => "Italian",
        ],
        [
            "id" => 2,
            "name" => "Mac & Cheese",
            "kitchen" => "American",
        ],
        [
            "id" => 3,
            "name" => "Noodles",
            "kitchen" => "Japanese",
        ],
        [
            "id" => 4,
            "name" => "Kapsalon",
            "kitchen" => "Dutch",
        ],
        [
            "id" => 5,
            "name" => "Paella",
            "kitchen" => "Spanish",
        ],
        [
            "id" => 6,
            "name" => "Sushi",
            "kitchen" => "Japanese",
        ],
        [
            "id" => 7,
            "name" => "Gyros",
            "kitchen" => "Greek",
        ],
        [
            "id" => 8,
            "name" => "Lasagna",
            "kitchen" => "Italian",
        ],
        [
            "id" => 9,
            "name" => "Curryworst",
            "kitchen" => "German",
        ],
        [
            "id" => 10,
            "name" => "блины",
            "kitchen" => "Russian",
        ]
    ];
}

/**
 * @param $id
 * @return mixed
 */
function getDishDetails($id)
{
    $tags = [
        1 => [
            "recipe" => "Put it in the oven and go!",
            "tags" => ['cheese', 'oven']
        ],
        2 => [
            "recipe" => "Cheesy Macaroni, straight out of the oven!",
            "tags" => ['cheese', 'oven', 'mac']
        ],
        3 => [
            "recipe" => "Available for self-cooking or as an instant.",
            "tags" => ['omnomnom', 'noodles', 'instant']
        ],
        4 => [
            "recipe" => "Everytime in the city after midnight",
            "tags" => ['kapsalon', 'tasty', 'meat']
        ],
        5 => [
            "recipe" => "Specialty when on holiday in Spain",
            "tags" => ['fish', 'rice']
        ],
        6 => [
            "recipe" => "Order or make it yourself!",
            "tags" => ['fish', 'seaweed', 'food']
        ],
        7 => [
            "recipe" => "Meat (pork or chicken) served with potato, onion, tomato, tzatziki or yogurt!",
            "tags" => ['meat', 'fresh vegetables', 'pork', 'chicken']
        ],
        8 => [
            "recipe" => "Straight out of heaven.",
            "tags" => ['omnomnom', 'cheese', 'oven']
        ],
        9 => [
            "recipe" => "Famous in Berlin, lovely to eat.",
            "tags" => ['bread', 'potato', 'tasty', 'meat']
        ],
        10 => [
            "recipe" => "Цыка блять, советы идут",
            "tags" => ['pancake', 'savory', 'sweet']
        ]
    ];

    return $tags[$id];
}