/**
 * Created by renyu on 2017-06-08.
 */
/* 如何判断是否可移动。
 我们设置一个一维数组变量，用来保存大 DIV 它里面装的小 DIV 的编号。
 如果大 DIV 没有小方块，也就表面它是空白块，那么就设为 0。
 如果当前大 DIV 有小 DIV，那就设置为小 DIV 的编号。
 然后再设置一个二维数组变量，用来保存大 DIV 的可移动编号。
 也就是保存这个大 DIV 它所有的可去的位置。
 比如大 DIV 编号为 2 的，它只能向 1号，3号，5号这三个方向移动。又比如 5，它能向 2、4、6、8 这四个方向移动。
 我们循环遍历这个变量，如果对应的方向它 没有方块，也就是值为 0，那么它就可以往这个方向移动了。*/
var keepNum = new Array(10);//保存大DIV当前装的小DIV的编号。定义数组长度为10，因为有个0记录无小盒子
//保存大DIV编号的可移动位置编号
var bigBoxNum = [
    [0],
    [2,4],
    [1,3,5],
    [2,6],
    [1,5,7],
    [2,4,6,8],
    [3,5,9],
    [4,8],
    [5,7,9],
    [6,8]
];
//创建一个数组保存大box的编号位置[left,top]
var positionBox = [
    [0],
    [0,0],
    [150,0],
    [300,0],
    [0,150],
    [150,150],
    [300,150],
    [0,300],
    [150,300],
    [300,300]
];
//默认按照顺序排好，大DIV第九块没有，所以为0，我们用0表示空白块
keepNum[1]=1;keepNum[2]=2;keepNum[3]=3;keepNum[4]=4;keepNum[5]=5;
keepNum[6]=6;keepNum[7]=7;keepNum[8]=8;keepNum[9]=0;
//为各个方格绑定点击事件
var btnN = document.querySelectorAll('.game-box');
//console.log(btnN)
for (var i = 0; i < btnN.length; i++) {
    btnN[i].onclick = function () {
        var id = this.getAttribute('id');
        id = id.replace(/[^0-9]/ig, "");
        move(id);
        function move(id) {
            var goNum = 0;
            for (var i = 1; i < 10; i++) {
                if(keepNum[i] == id){
                    goNum = i;
                }
            }
            var canMove ;
            canMove = go(goNum);
            if(canMove != 0){
                keepNum[goNum] = 0;
                keepNum[canMove] = id;
                var btnM = document.getElementById('D'+id);
                btnM.style.left = positionBox[canMove][0] + 'px';
                btnM.style.top = positionBox[canMove][1] +'px';
            }
            var finishFlag = true;
            for (var k = 0; k < 9; k++) {
                if(keepNum[k] !== k){
                    finishFlag = false;
                }
            }
            if(finishFlag === true){
                clearInterval(timer);
                alert('恭喜完成拼图');
            }
        }
        function go(nowBox) {
            var moveFlag = false;
            var Num ;
            for (var j = 0; j < bigBoxNum[nowBox].length; j++) {
                //console.log(keepNum[bigBoxNum[nowBox][j]]);
                if(keepNum[bigBoxNum[nowBox][j]] == 0){
                    Num = j;
                    moveFlag = true;
                }//如果为0，说明盒子为空没有装小盒子，可以移动
            }
            if(moveFlag == true){
                /*console.log(bigBoxNum[nowBox][Num]);*/
                return bigBoxNum[nowBox][Num];
            }else {
                return 0;
            }
        }
    }//onclick
}//for遍历点击对象
//随机打乱方块函数，随机生成一个数，然后他们两块对调一下
function randomKeepNum() {
    for (var i = 1; i < 10; i++) {
        var btnF = document.getElementById('D'+keepNum[i]);
        var toNum = parseInt(Math.random()*(i-1)+1);
        var btnS = document.getElementById('D'+keepNum[toNum]);
        if(keepNum[i] != 0){
            btnF.style.left = positionBox[toNum][0] + 'px';
            btnF.style.top = positionBox[toNum][1] + 'px';
        }//当前div设置为随机产生的div位置
        if(keepNum[toNum] != 0){
            btnS.style.left = positionBox[i][0] + 'px';
            btnS.style.top = positionBox[i][1] + 'px';
        }//随机产生的div位置设置为当前div位置
        //对调当前div和随机div编号
        var tem = keepNum[toNum];
        keepNum[toNum] = keepNum[i];
        keepNum[i] = tem;
    }
}
var resetN = document.getElementById('reset');
resetN.onclick = function () {
    clearInterval(timer);
    if(resetN.value === '暂停'){

        resetN.value = '继续';
    }else if(resetN.value = '继续'){
        totalTime();
        resetN.value = '暂停';
    }
    //randomKeepNum();
};
var beginN = document.getElementById('begin');
var timer = 0;
var num = 0;
function totalTime() {
    var timeN = document.getElementById('time');
    timer = setInterval(function () {
        num++;
        var min = parseInt(num/60);
        var sec = parseInt(num%60);
        timeN.innerHTML = '总用时：' +min+ '分' +sec+ '秒';
    },1000);
}
beginN.onclick = function () {
        clearInterval(timer);
        num = 0;
        totalTime();
        randomKeepNum();
        resetN.value = "暂停";
    }