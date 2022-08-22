// Check if it's composed of digits only,
//  with the option of being a negative number
export default function isNumber(value) {
    return /^-?\d+$/u.test(value)
  }
