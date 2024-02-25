/**
 * Функция для проверки длины строки.
 * @param {string} string - проверямая строка.
 * @param {integer} maxLength - максимальная длина строки.
 * @returns {boolean} - возвращет true, если длина строки меньше или равна максимальной длины строки.
 */

const checkStringLength = (string, maxLength) => string.length <= maxLength;

console.log(checkStringLength('sdjhk', 3));
console.log(checkStringLength('sdj', 3));

/**
 * Функция для проверки строки на палиндромность.
 * @param {string} string - проверямая строка.
 * @returns {boolean} - возвращет true, если палиндром.
 */

const checkPalindrome = (string) => {
  const modString = string.replaceAll(' ', '').toLowerCase();
  let reverseModString = '';
  for (let i = modString.length - 1; i >= 0; i -= 1) {
    reverseModString += modString.at(i);
  }

  if (modString === reverseModString) {
    console.log ('Палиндром');
    return true;
  }
  console.log ('Не палиндром');
  return false;
}

checkPalindrome ('Торт');
checkPalindrome ('Тот');
checkPalindrome ('Лёша на полке клопа нашёл ');

/**
 * Функция принимает строку и извлекает цифры превращая в целое число.
 * @param {} string - проверямая строка.
 * @returns {boolean} - возвращет целое число, либо NaN (в случае отсутствия цифр).
 */


const extractNumber = function (string) {
  let number = '';
  if (typeof(string) !== String) {
    string = String(string);
  }
  for (let i = 0; i < string.length; i += 1) {
    if (Number.isNaN(parseInt(string[i]), 10)) {
      continue;
    }
    number = number + string[i];
  }
  return number ? parseInt(number, 10) : NaN;
}

console.log(extractNumber (762));
console.log(extractNumber (' r2 2r 5.3.42t'));
console.log(extractNumber ('томат'));
