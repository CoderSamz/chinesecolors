// fetch('./chinesecolors-utf8.json')
//     .then((response) => response.json())
//     .then((json) => console.log(json))
$.getJSON('chinesecolors-utf8.json', function(json) {

    // json.forEach(color => {
    //     $('#colors').prepend("<li><span class='name'>" + color.name + "</span><span class='pinyin'>" + color.pinyin + "</span><span class='rgb'>" + color.RGB + "</span></li>")
    // });
    for (let index = 0; index < json.length; index++) {
        const element = json[index];
        $('#colors').append("<li><span class='name'>" + element.name + "</span>&nbsp<span class='pinyin'>" + element.pinyin + "</span>&nbsp<span class='rgb'>" + element.RGB + "</span>&nbsp<span class='hex'>" + element.hex + "</span></li>")
    }
    $("li").on("click", function(event) {
        var index = $(this).index();
        var hex = json[index].hex;
        changeBGColor(hex)
        colorName = json[index].name
        console.log(index)
        console.log(json[index])
    });
});
var colorHexG = ""
var colorName = ""
function changeBGColor(colorHex) {
    colorHex.replace("#")
    console.log(colorHex)
    colorHexG = colorHex
    $('.background').css("background", colorHex);
}

$(".btn").click(function(event) {
    if (colorHexG.length <=0 ) {
        return
    }
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext('2d');
    ctx.scale(window.devicePixelRatio,window.devicePixelRatio);
    ctx.fillStyle = colorHexG;
    ctx.fillRect(0,0,1920,1080);

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

    var event=document.createEvent('MouseEvents');
    event.initMouseEvent('click',true,false,window,0,0,0,0,0,false,false,false,false,0,null);
    save_link.dispatchEvent(event);
}
