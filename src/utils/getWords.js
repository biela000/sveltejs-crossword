import axios from "axios";
const replaceAt = (word, index, replacement) => {
    return word.substring(0, index) + replacement + word.substring(index + replacement.length);
};
const fetchWordsForKeyword = async (kw) => {
    let kwCopy = kw;
    const words = [];
    const wordOptions = {
        method: "GET",
        url: 'https://wordsapiv1.p.rapidapi.com/words/',
        params: {
            random: 'true',
            lettersMin: '6',
            lettersMax: `${kw.length}`,
            partOfSpeech: 'noun',
            letterPattern: `(?=\\b\\w*[${kwCopy}]\\w*\\b)(?=^\\S*$)`
        },
        headers: {
            'X-RapidAPI-Key': '347f3322d0msh4905641766aec49p19902bjsn3d8a960e28a6',
            'x-rapidapi-host': 'wordsapiv1.p.rapidapi.com'
        }
    };
    while (kwCopy.split('').filter(ltr => ltr === '0').length < kw.length) {
        wordOptions.params.letterPattern = `(?=\\b\\w*[${kwCopy}]\\w*\\b)(?=^\\S*$)`;
        const response = await axios.request(wordOptions);
        const word = {
            word: response.data.word,
            definition: response.data.results[0].definition
        };
        const matchingIndexes = {};
        let matchCount = 0;
        for (let wIndex = 0; wIndex < word.word.length; wIndex++) {
            for (let kwIndex = 0; kwIndex < kwCopy.length; kwIndex++) {
                if (word.word[wIndex] === kwCopy[kwIndex]) {
                    kwCopy = replaceAt(kwCopy, kwIndex, '0');
                    matchingIndexes[wIndex] = kwIndex;
                    matchCount++;
                    break;
                }
            }
            if (matchCount > 1)
                break;
        }
        word.wordToKeywordIndexes = Object.assign({}, matchingIndexes);
        words.push(word);
        console.log(word);
    }
    return words;
};
export default async () => {
    const keywordLength = Math.floor(Math.random() * 6) + 6;
    const keywordOptions = {
        method: "GET",
        url: 'https://wordsapiv1.p.rapidapi.com/words/',
        params: {
            random: 'true',
            letters: `${keywordLength}`,
            partOfSpeech: 'noun',
            letterPattern: '^\\S*$'
        },
        headers: {
            'X-RapidAPI-Key': '347f3322d0msh4905641766aec49p19902bjsn3d8a960e28a6',
            'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
        }
    };
    const keywordResponse = await axios.request(keywordOptions);
    const keyword = {
        word: keywordResponse.data.word,
        definition: keywordResponse.data.results.definition
    };
    const words = await fetchWordsForKeyword(keyword.word);
    return [keyword, words];
};
//# sourceMappingURL=getWords.js.map