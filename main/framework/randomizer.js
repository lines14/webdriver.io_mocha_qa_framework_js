class Randomizer {
    getRandomString(minLength, maxLength, hasUpperCase, hasNumber, chosenLetter, hasCyrillic) {
        const upperCaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz';
        const numbers = '0123456789';
        const cyrillicLetters = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя';
      
        let length = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
      
        let randomString = '';
      
        randomString += chosenLetter;
      
        let requiredCharacters = '';
        if (hasUpperCase) {
            requiredCharacters += upperCaseLetters.charAt(Math.floor(Math.random() * upperCaseLetters.length));
        }
        if (hasNumber) {
            requiredCharacters += numbers.charAt(Math.floor(Math.random() * numbers.length));
        }
        if (hasCyrillic) {
            requiredCharacters += cyrillicLetters.charAt(Math.floor(Math.random() * cyrillicLetters.length));
        }
        randomString += requiredCharacters;
      
        const characters = (hasUpperCase ? upperCaseLetters : '') + lowerCaseLetters + (hasNumber ? numbers : '') + (hasCyrillic ? cyrillicLetters : '');
        const charactersLength = characters.length;
        const randomLength = length - randomString.length;
        for (let i = 0; i < randomLength; i++) {
            randomString += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
    
        function stringShuffler(inputString) {
            let array = inputString.split('');
            let currentIndex = array.length;
            let temporaryValue;
            let randomIndex;
            while (0 !== currentIndex) {
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex--;
                temporaryValue = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temporaryValue;
            }
            return array.join('');
        }
        
        return stringShuffler(randomString);
    }
}

module.exports = new Randomizer();