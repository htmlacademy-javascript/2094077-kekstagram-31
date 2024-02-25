//Функция для проверки длины строки.

const checkStringLength = (string, maxLength) => string.length <= maxLength;

console.log(checkStringLength('sdjhk', 3));
console.log(checkStringLength('sdj', 3));

//Функция для проверки, является ли строка палиндромом.

const checkPalindrome = (string) => {
  const modString = string.replaceAll(' ', '').toLowerCase();
  let reverseModString = '';
  for (let i = modString.length - 1; i >= 0; i -= 1) {
    reverseModString += modString.at(i);
  }

  if (modString === reverseModString) {
    console.log ('Палиндром');
    return 'Палиндром';
  }
  console.log ('Не палиндром');
  return 'Не палиндром';
}

checkPalindrome ('Торт');
checkPalindrome ('Тот');
checkPalindrome ('Лёша на полке клопа нашёл ');

//Функция принимает строку, извлекает содержащиеся в ней цифры от 0 до 9 и возвращает их в виде целого положительного числа.
// Если в строке нет ни одной цифры, функция должна вернуть NaN


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
