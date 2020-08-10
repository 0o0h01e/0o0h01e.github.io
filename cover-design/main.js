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

        setTimeout(() => {
             initScroll();
        }, 100); 
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
    
    let initScroll = () => {
        let dragUpY = 0;
        let dragDownY = 0;

        const myScroll = new iScroll('content', {
            useTransition: true,
            vScrollbar: false,
            onScrollMove: function() {
                console.log(this.y);
                // console.log(this);
                
                let d = this.y > 0 ? this.y : this.y - this.maxScrollY;

                if (this.y < 0) {
                    dragUpY = this.y - this.maxScrollY;
                    if (dragUpY <= -100) {
                        if (index < 10) {
                            $('#dragUpTip').css('display', 'block');
                        } else {
                            $('#dragUpLastTip').css('display', 'block');
                        }
                    } else if (dragUpY > -100 && dragUpY < 0) {
                        $('.dragTip').css('display', 'none');
                    }
                }
                
                if (this.y > 0) {   
                    dragDownY = this.y;
                    if (dragDownY >= 100) {
                        if (index > 1) {
                            $('#dragDownTip').css('display', 'block');
                        } else {
                            $('#dragDownFirstTip').css('display', 'block');
                        }
                    } else if (dragDownY < 100 && dragDownY > 0) {
                        $('.dragTip').css('display', 'none');
                    }
                }

                dragY = d;
                console.log('Scrolling dragY: ', dragY)
            }, 
            onScrollEnd: () => {
                console.log('scrollEnd dragY: ', dragY);

                // 上滑重新加载
                if (dragUpY <= -100) {
                    console.log('上滑重新加载');
                    if (index < 10) {
                        // 清理iScroll实例
                        myScroll.destroy();
                        
                        index++;
                        console.log(index);
                        $('#content img').attr('src', './assets/' + '书籍设计' + index + '.jpg');
                        $('#showContainer').scrollTop(0);

                        
                        // 重新实例化iScroll
                        initScroll();
                    }
                    $('.dragTip').css('display', 'none');
                }

                // 下拉重新加载
                if (dragDownY >= 100) {
                    console.log('下拉重新加载');
                    if (index > 1) {
                        // 清理iScroll实例
                        myScroll.destroy();

                        index--;
                        console.log(index);
                        $('#content img').attr('src', './assets/' + '书籍设计' + index + '.jpg');
                        $('#showContainer').scrollTop(0);

                        
                        // 重新实例化iScroll
                        initScroll();
                    }
                    $('.dragTip').css('display', 'none');
                }
            }
        });
    }
});
