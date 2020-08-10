const queue = new createjs.LoadQueue(false);

const images = [];
for (let i = 1; i <= 10 ; i++) {
    images.push('书籍设计' + i + '.jpg');    
}
queue.loadManifest(images, true, './assets/');

queue.on("complete", function(){
    $('#loading').remove();
    $('.container').css('display', 'block');

    // // 点击上滑Icon
    // $('#arrowIcon img').on('click', (e) => {
    //     showCatalog();
    // })

    // 封面上滑
    let showCatalog = () => {
        $('#cover').css('display', 'none');
        $('#catalog').css('display', 'flex');
        $('#arrowIcon').css('display', 'none');
    }

    let startX, startY, x, y;
    $('#arrowIcon').on('touchstart', (e) => {
        e.preventDefault();
        const touch = e.touches[0];
        startX = touch.pageX;
        startY = touch.pageY;
    });
    $('#arrowIcon').on('touchmove', (e) => {
        e.preventDefault();
        const touch = e.touches[0];
        x = startX - touch.pageX;
        y = startY - touch.pageY;
    });
    $('#arrowIcon').on('touchend', (e) => {
        if (y > 0) {
            console.log('上滑：' + y + 'px');
            showCatalog();
        }
        e.preventDefault();
    });
    
    // 点击目录项
    let index;  // 内容序号
    $('#catalog .row img').on('click', (e) => {
        index = Number(e.currentTarget.getAttribute('index'));
        setTimeout(() => {
            $('#catalogIcon').css('display', 'block');
        }, 500);
        
        $('#catalog').css('display', 'none');
        $('#content img').attr('src', './assets/' + '书籍设计' + index + '.jpg');
        $('#showContainer').scrollTop(0);
        $('#content').css('display', 'block');
        
    })
    
    // 点击目录Icon
    $('#catalogIcon').on('click', () => {
        $('#catalog').css('background-image', "url('./assets/目录切图/目录背景透明.png')")
        $('#catalog').css('display', 'flex');
        $('#closeIcon').css('display', 'block');
        $('#catalog').css('position', 'absolute');
        $('#catalog').css('background-color', 'rgba(0, 0, 0, 0.9)');
        
    })

    // 点击目录closeIcon
    $('#closeIcon').on('click', () => {
        $('#catalog').css('display', 'none');
    })
    
    
    // let dragY;
    // new iScroll('content', {
    //     useTransition: true,
    //     onRefresh: () => {},
    //     onScrollMove: function() {
    //         console.log(this.y);

    //         if (this.y <= -50) {
    //             $('#dragUpTip').css('display', 'block');
    //         } else if (this.y < 0 && this.y > -50 ) {
    //             $('#dragUpTip').css('display', 'none');
    //         }

    //         dragY = this.y;
    //     },
    //     onScrollEnd: () => {
    //         if (dragY <= -50) {
    //             index = index < 10 ? index + 1 : index;
    //             $('#content img').attr('src', './assets/' + '书籍设计' + index + '.jpg');
    //             $('#showContainer').scrollTop(0);
    //             $('#dragUpTip').css('display', 'none');
    //         }
    //     }
    // });
})

$(document).ready(() => {
})