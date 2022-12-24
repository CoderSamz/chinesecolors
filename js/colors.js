$.getJSON('./assets/chinesecolors-utf8.json', function(json) {

    for (let index = 0; index < json.length; index++) {
        const element = json[index];
        $('#colors').append("<div class='coloritem' style='background-color: " + element.hex + ";'><span class='name'>" + index + '.' + element.name + "</span><br><span class='pinyin'>" + element.pinyin + "</span><br><span class='rgb'>RGB: " + element.RGB + "</span><br><span class='hex'>十六进制: " + element.hex + "</span><br><span class='CMYK'>CMYK: " + element.CMYK + "</span></div><br>")
    }
    $("div .coloritem").on("click", function(event) {
        var index = $("div .coloritem").index(this);
        var hex = json[index].hex;
        changeBGColor(hex)
        colorName = json[index].name
        // console.log(index)
        // console.log(json[index])
    });
});
var colorHexG = ""
var colorName = ""
function changeBGColor(colorHex) {
    // console.log(colorHex)
    colorHexG = colorHex
    $('.background').css("background", colorHex);
}

$(".btn").click(function(event) {
    if (colorHexG.length <=0 ) {
        alert("请先选择颜色");
        return
    }
    var canvas = document.createElement("canvas");
    canvas.height = 300;
    canvas.width = 600;
    var ctx = canvas.getContext('2d');
    ctx.scale(window.devicePixelRatio,window.devicePixelRatio);
    ctx.fillStyle = colorHexG;
    ctx.fillRect(0,0,600,600);

    var type = 'png'
    var imgData = canvas.toDataURL(type);

    var fixType = function(type) {
        type = type.toLocaleLowerCase().replace(/jpg/i,'jpeg');
        var r = type.match(/png|jpeg|bmp|gif/)[0];
        return 'image/' + r;
    }

    imgData = imgData.replace(fixType(type), 'image/octet-stream');
    var fileName = colorName + '.' + type
    saveImage(imgData, fileName)
})

function saveImage(data, fileName) {
    var save_link = document.createElementNS("http://www.w3.org/1999/xhtml","a");
    save_link.href = data;
    save_link.download = fileName;

    if (isPC()) {
        // 如果是PC端
        var event=document.createEvent('MouseEvents');
        event.initMouseEvent('click',true,false,window,0,0,0,0,0,false,false,false,false,0,null);
        save_link.dispatchEvent(event);
    } else {
        // 其他
        toastImg();
    }
    
}

// 弹出图片
function toastImg() {

    var canvas = document.createElement("canvas");
    canvas.height = 300;
    canvas.width = 600;
    var ctx = canvas.getContext('2d');
    ctx.scale(window.devicePixelRatio,window.devicePixelRatio);
    ctx.fillStyle = colorHexG;
    ctx.fillRect(0,0,600,600);

    var type = 'image/png';
    var imgData = canvas.toDataURL(type);
    var image = new Image();
    image.src = imgData;
    $("div .canvasImg").append(image);
    $("#toastImg").css("display","block");
}
$("div .close").on("click", function(event) {
    $("#toastImg").css("display","none");
    // 清理canvas图
    $("div .canvasImg").children().remove();
});
 // 判断是否PC浏览器
 function isPC()  {
    var ua = navigator.userAgent;
    var is_mobile = ua.toLowerCase().match(/(ipod|ipad|iphone|android|coolpad|mmp|smartphone|midp|wap|xoom|symbian|j2me|blackberry|wince)/i) != null;
    // console.log(ua)
    if (is_mobile) {
        return false;
    } else {
        return true;
    }
 }