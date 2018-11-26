function inverted(strin, callback) {
    str = strin;
    str = str.split('').reverse().join('');
    str = str.split(' ');

    for (let i = 0; i<str.length; i++) {
        str[i] = str[i].split('').reverse().join('');
    }
    str = str.join(' ');
    callback(str);
}

// unit test
// inverted("i love you", function(outstr){console.log(outstr)});

