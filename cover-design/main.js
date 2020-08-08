// $(document).ready(() => {
    
  
// })

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
    $('#catalog .row img').on('click', (e) => {
        const index = e.currentTarget.getAttribute('index');
        setTimeout(() => {
            $('#catalogIcon').css('display', 'block');
        }, 500);
        
        $('#catalog').css('display', 'none');
        $('#content img').attr('src', './assets/' + '书籍设计' + index + '.jpg');
        $('#content').scrollTop(0);
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
    
    // new iScroll('#content', {
    //     onRefresh: () => {},
    //     onScrollMove: () => {},
    //     onScrollEnd: () => {
    //         console.log(this.y);
    //     }
    // });
    
})