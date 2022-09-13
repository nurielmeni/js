console.log('Init');
const source = document.getElementById('source-paragraph');
const sortedResult = document.getElementById('sorted-result');
const sortBtn = document.getElementById('sort');
const clearBtn = document.getElementById('clear');
const hebrewOrder = ['A', 'B', 'G', 'D', 'H', 'V', 'Z', 'J', 'T', 'Y', 'K', 'L', 'M', 'N', 'S', 'I', 'P', 'X', 'Q', 'R', 'W', 'U', 'C', 'E', 'F', 'O'];


/**
 * Functions
 */

/**
 * CLEAR
 * Clears the fields
 */
const clear = () => {
    source.value = '';
    result('');
};

/**
 * COMPARE WORDS
 * If the letter equals go to the next letter
 * @param {*} a First word
 * @param {*} b Second word
 * @returns The comparison result -1: a < b, 0: a = b, 1: a > b
 */
const comperWords = (a, b) => {
    let ch = 0;

    while (a.length > ch && b.length > ch) {
        if (order(a[ch]) < order(b[ch])) return -1;
        if (order(a[ch]) > order(b[ch])) return 1;

        ch++;
    }

    if (a.length === b.length) {
        console.log('a = b, ', a, b);
        return 0;
    }

    if (a.length < b.length) {

    }
    console.log('a = b, ', a, b);
    return a.length < b.length ? -1 : 1;
}

/**
 * SORT
 * @param {*} source Array of words from the text paragraph to be sorted
 * @returns Sorted words by the Hebrew alphabet.
 */
const sort = (source) => {
    if (!source || !Array.isArray(source) || !source.length) return [];

    for (let i = 0; i < source.length; i++) {

        for (let j = 0; j < source.length - i - 1; j++) {

            // Compar words
            if (comperWords(source[j + 1], source[j]) < 0) {

                //Swap
                [source[j + 1], source[j]] = [source[j], source[j + 1]]
            }
        }
    };

    return source;
};

/**
 * RESULT
 * @param {*} value The updated text
 * Update the result text
 */
const result = value => {
    sortedResult.innerHTML = value;
};

/**
 * ORDER
 * @param {*} letter The letter to evaluate
 * @returns The 0 index of the leter in the Hebrew sort
 */
const order = letter => hebrewOrder.indexOf(letter.toUpperCase());

/**
 * 
 * @param {*} source 
 * @returns Filter the text of all non alphanumeric values, replaces with space.
 */
const removePanctuations = source => source.replace(/[^a-zA-Z]+/g, ' ');


/**
 * Event Listeners
 */

// Sort
sortBtn.addEventListener('click', () => {
    console.log('V, Q', hebrewOrder.indexOf('V'), hebrewOrder.indexOf('Q'));
    const sourceText = removePanctuations(source.value);

    // Create array of words
    const sourceWords = sourceText.split(' ');
    result(sort(sourceWords).join(' '));
});

// Clear
clearBtn.addEventListener('click', clear);

