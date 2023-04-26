export function alter(string) {
    var newString = ''
    for (var i = 0; i < string.length; i++) {
        newString += string[i] === string[i].toUpperCase() ? string[i].toLowerCase() : string[i].toUpperCase()
    }
    return newString
}
