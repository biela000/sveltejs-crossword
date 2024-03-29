import axios from "axios";
import type { AxiosRequestConfig } from "axios";
import type Word from "../types/Word";

const replaceAt = (word:string, index: number, replacement: string) => {
    return word.substring(0, index) + replacement + word.substring(index + replacement.length);
}

const fetchWordsForKeyword = async (kw: string) => {
    let kwCopy = kw;
    const words = [];

    const wordOptions: AxiosRequestConfig = {
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
    }

    while (kwCopy.split('').filter(ltr => ltr === '0').length < kw.length) {
        wordOptions.params.letterPattern = `(?=\\b\\w*[${kwCopy}]\\w*\\b)(?=^\\S*$)`;
        const response = await axios.request(wordOptions);
        if (response.data.word.includes('0')) continue;
        const word: Word = {
            word: response.data.word,
            definition: response.data.results[0].definition
        };

        const matchingIndexes = { };

        let matchCount: number = 0;

        for (let wIndex = 0; wIndex < word.word.length; wIndex++) {
            for (let kwIndex = 0; kwIndex < kwCopy.length; kwIndex++) {
                if (word.word[wIndex] === kwCopy[kwIndex]) {
                    kwCopy = replaceAt(kwCopy, kwIndex, '0');
                    matchingIndexes[wIndex] = kwIndex;
                    matchCount++;
                    break;
                }
            }
           if (matchCount > 1) break;
        }

        word.wordToKeywordIndexes = { ...matchingIndexes };
        words.push(word);
        console.log(word);
    }

    return words as [Word];
};

export default async () => {
    const keywordLength = Math.floor(Math.random() * 6) + 6;
    const keywordOptions: AxiosRequestConfig = {
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
    }

    const keywordResponse = await axios.request(keywordOptions);
    const keyword: Word = {
        word: keywordResponse.data.word,
        definition: keywordResponse.data.results.definition
    };

    const words: [Word] = await fetchWordsForKeyword(keyword.word);

    return [keyword, words];
};
