const queue = new createjs.LoadQueue(false);

const images = [
    '封面.jpg',
    'arrow-up.png',
    '目录切图/目录背景.jpg',
    '目录切图/目录背景透明.png',
];

const contentImgs = [
    'https://ww1.sinaimg.cn/large/a1823812gy1ghmo14e4khg20ku3r6n3k.jpg',
    'https://ww1.sinaimg.cn/large/a1823812gy1ghm5bu2xqlj20ku1rvjyi.jpg',
    'https://ww1.sinaimg.cn/large/a1823812gy1ghm5cvw3lsj20ku2osn69.jpg',
    'https://ww1.sinaimg.cn/large/a1823812gy1ghm5d9qs84j20ku2cek28.jpg',
    'https://ww1.sinaimg.cn/large/a1823812gy1ghm5dheddij20ku2hn7g2.jpg',
    'https://ww1.sinaimg.cn/large/a1823812gy1ghm5drbv2ij20ku284tgd.jpg',
    'https://ww1.sinaimg.cn/large/a1823812gy1ghm5e0x73tj20ku2kgn89.jpg',
    'https://ww1.sinaimg.cn/large/a1823812gy1ghm5e8cvx7g20ku1i076r.jpg',
    'https://ww1.sinaimg.cn/large/a1823812gy1ghm5efabw6g20ku1vqn05.jpg',
    'https://ww1.sinaimg.cn/large/a1823812gy1ghm5ew7vvbj20ku4fc7l5.jpg',
];

for (let i = 1; i <= 10; i++) {
    images.push('目录切图/目录_' + (i < 10 ? '0' + i : i) + '.jpg');
}

// for (let i = 1; i <= 10 ; i++) {
//     images.push('书籍设计' + i + '.jpg');    
// }
for (let i = 0; i < contentImgs.length; i++) {  
    images.push(contentImgs[i]);
    
}

console.log(images);

queue.loadManifest(images, true, './assets/');

queue.on('progress', progress => {
    if (progress.progress > 0.99) {
        $('#loading').remove();
        $('.container').css('display', 'block'); 
    }
    $('#progress').html(parseInt(progress.progress * 100) + '%');
})
// queue.on("complete", function(){});

$(document).ready(function () {
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
    let myScroll;
    $('#catalog .row img').on('click', (e) => {
        index = Number(e.currentTarget.getAttribute('index'));
        setTimeout(() => {
            $('#catalogIcon').css('display', 'block');
        }, 500);
        
        $('#catalog').css('display', 'none');
        // $('#content img').attr('src', './assets/' + '书籍设计' + index + '.jpg');
        $('#content img').attr('src', contentImgs[index - 1]);
        $('#showContainer').scrollTop(0);
        $('#content').css('display', 'block');

        if (index == 10) {
            $('#shareBtn').css('display', 'block');
        } else {
            $('#shareBtn').css('display', 'none');
        }

        setTimeout(() => {
            if (myScroll) {
                myScroll.refresh();
                setTimeout(() => {
                    myScroll.scrollTo(0, 0);

                }, 100)
            } else {
                initScroll();
            }
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

    $('#shareBtn').on('click', () => {
        $('#share').css('display', 'block');
    })

    $('#share').on('click', () => {
        $('#share').css('display', 'none');
    })
    
    let initScroll = () => {
        let dragUpY = 0;
        let dragDownY = 0;

        myScroll = new iScroll('content', {
            useTransition: true,
            vScrollbar: false,
            onScrollMove: function() {
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
            }, 
            onScrollEnd: () => {
                // 上滑重新加载
                if (dragUpY <= -100) {
                    dragUpY = 0;    // 重置
                    console.log('上滑重新加载');
                    if (index < 10) {
                        
                        index++;
                        console.log(index);
                        // $('#content img').attr('src', './assets/' + '书籍设计' + index + '.jpg');
                        $('#content img').attr('src', contentImgs[index - 1]);
                        myScroll.scrollTo(0, 0);

                        if (index == 10) {
                            $('#shareBtn').css('display', 'block');
                        } else {
                            $('#shareBtn').css('display', 'none');
                        }
                        
                        setTimeout(() => {
                            myScroll.refresh();
                        }, 100);
                    }
                    $('.dragTip').css('display', 'none');
                }

                // 下拉重新加载
                if (dragDownY >= 100) {
                    dragDownY = 0;  // 重置
                    console.log('下拉重新加载');
                    if (index > 1) {

                        index--;
                        console.log(index);
                        // $('#content img').attr('src', './assets/' + '书籍设计' + index + '.jpg');
                        $('#content img').attr('src', contentImgs[index - 1]);
                        myScroll.scrollTo(0, 0);

                        if (index == 10) {
                            $('#shareBtn').css('display', 'block');
                        } else {
                            $('#shareBtn').css('display', 'none');
                        }
                        
                        setTimeout(() => {
                            myScroll.refresh();
                        }, 100);
                    }
                    $('.dragTip').css('display', 'none');
                }
            }
        });
    } 
});