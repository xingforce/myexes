function inverted(strin, callback) {
    // 从头到尾只操作一个存储对象 str
    str = strin; 
    
    //1.把整个句子当成一个字符串，按字符全倒过来
    str = str.split('').reverse().join('');
    
    //2.按空格分割成多个字符串，把每个串再倒过来，还原成单词
    str = str.split(' ');
    for (let i = 0; i<str.length; i++) {
        str[i] = str[i].split('').reverse().join('');
    }
    
    //3.多个单词串重新组成一个整句子
    str = str.join(' ');
    callback(str);
}

// unit test
// inverted("i love you", function(outstr){console.log(outstr)});

