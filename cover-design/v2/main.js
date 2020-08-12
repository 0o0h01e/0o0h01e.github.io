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
    'https://ww1.sinaimg.cn/large/a1823812gy1ghmp9ba19pj20ku4fctpg.jpg',
];

for (let i = 1; i <= 10; i++) {
    images.push('目录切图/目录_' + (i < 10 ? '0' + i : i) + '.jpg');
}
for (let i = 0; i < contentImgs.length; i++) {  
    images.push(contentImgs[i]);
}

queue.loadManifest(images, true, '../assets/');

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
        // 计算目录项图片高宽自适应值，80、40是间隔值的一个预估
        const itemHeight = ($('#catalog').height() - 80) / 5;
        const itemWidth = ($('#catalog').width() - 40) / 3;
        const size = itemHeight > itemWidth ? itemWidth : itemHeight;
        $('#catalog .row img').css('width', size + 'px');
        $('#catalog .row img').css('height', size + 'px');

        $('#cover').css('display', 'none');
        $('#catalog').css('display', 'flex');
        $('#arrowIcon').css('display', 'none');
    };

    // 上滑操作
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

        $('#cover').css('top', -y + 'px');
        $('#arrowIcon').css('bottom', y + 'px');
    });
    $('#arrowIcon').on('touchend', (e) => {
        console.log('上滑：' + y + 'px');
        if (y > 30) {
            showCatalog();
        } else {
            $('#cover').css('top', '0px');
            $('#arrowIcon').css('bottom', '0px');
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
        // $('#content img').attr('src', contentImgs[index - 1]);
        // $('#showContainer').scrollTop(0);
        // TODO 图片定位
        
        setTimeout(() => {
            $('#content').scrollTop(calcPosition(index));

        }, 100);

        $('#content').css('display', 'block');

        // if (index == 10) {
        //     $('#shareBtn').css('display', 'block');
        // } else {
        //     $('#shareBtn').css('display', 'none');
        // }
    })
    
    // 点击目录Icon
    $('#catalogIcon').on('click', () => {
        $('#catalog').css('background-image', "url('../assets/目录切图/目录背景透明.png')")
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

    const calcPosition = (index) => {
        const getHeight = (total, img) => total + $(img).height();
        imgs = $('#content img').slice(0, index - 1);

        return imgs.toArray().reduce(getHeight, 0);
    }
});