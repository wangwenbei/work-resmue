document.addEventListener('touchmove',function (e) {
    e.preventDefault();
},false);
//禁止图片拖动时候的默认行为,如果不禁止,拖动过程中拖动的是图片的阴影
$('img').on('touchmove',function (e) {
    e.preventDefault();
});

var cubeRender=(function () {
    var $cube=$('.cube'),
        $cubeBox=$cube.children('.cubeBox');
    function start(e) {
        var point=e.touches[0];
        $(this).attr({
            strX:point.pageX,
            strY:point.pageY,
            isMove:false,
            changeX:0,
            changeY:0
        })
    }
    function moving(e) {
        var point=e.touches[0];
        //通过attr设置和获取的属性值都是字符串格式的,所以一般都转成数字
        var changeX=point.pageX-parseFloat($(this).attr('strX'));
        var changeY=point.pageY-parseFloat($(this).attr('strY'));
        $(this).attr({
            changeX:changeX,
            changeY:changeY

        });
        if(Math.abs(changeX)>10||Math.abs(changeY)>10){
            $(this).attr('isMove',true);
        }

    }
    function end(e) {
        var changeX=parseFloat($(this).attr('changeX'));
        var changeY=parseFloat($(this).attr('changeY'));
        isMove=$(this).attr('isMove');
        if(isMove==='false') return;
        var rotateX=parseFloat($(this).attr('rotateX'));
        var rotateY=parseFloat($(this).attr('rotateY'));
        rotateY=rotateY+changeX;
        rotateX=rotateX-changeY;
        $(this).css('transition','3s').css('transform','scale(0.6) rotateX('+rotateX+'deg) rotateY('+rotateY+'deg) ').attr({
            rotateX:rotateX,
            rotateY:rotateY
        })
    }


    return{
        init:function () {
            $cubeBox.attr({
                rotateX:-30,
                rotateY:45
            });
            $cubeBox.on('touchstart',start).on('touchmove',moving).on('touchend',end);
        }
    }
})();
cubeRender.init();

