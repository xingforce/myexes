
function filesaver() {

//for循环的延迟需要把操作都放到setTimeout的回调里
//由于setTimeout是异步的，延迟时间计时几乎是所有异步代码同时开始计时，所以设置延迟参数的时候*i，形成i倍的延迟时间，达成按顺序延迟执行的效果
//这个问题完全体现了js的异步特性在做同步任务的时候的变态感觉	

	for (let i=0; i<json.length; i++) {
		let filename = json[i].filename;

	 	setTimeout(function() {
	 		let a = document.createElement('a');
	 		a.download = filename ;
			a.href = url + filename;
			a.click();
	 		console.log(i,filename)
			}, 
	 	3000*i);
	
}
}





var j = document.getElementById("json");
var json = JSON.parse(j.textContent);
var url = "https://codecombat.com/file/music/";

filesaver();
