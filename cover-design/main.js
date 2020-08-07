$(document).ready(() => {
    
    // 点击上滑Icon
    $('#arrowIcon img').on('click', (e) => {
        // 封面上滑
        $('#cover').css('display', 'none');
        $('#catalog').css('display', 'flex');
        $('#catalog').css('height', '100%');
        $('#arrowIcon').css('display', 'none');
        
    })
    
    // 点击目录项
    $('.catalogItem').on('click', (e) => {
        const name = e.currentTarget.getAttribute('link');
        setTimeout(() => {
            $('#catalogIcon').css('display', 'block');
        }, 500);
        
        $('#catalog').css('display', 'none');
        $('#content img').attr('src', './assets/' + name);
        $('#content').scrollTop(0);
        $('#content').css('display', 'block');

    })

    // 点击目录Icon
    $('#catalogIcon').on('click', () => {
        $('#closeIcon').css('display', 'block');
        $('#catalog').css('display', 'flex');
        $('#catalog').css('position', 'absolute');
        $('#catalog').css('background-color', 'rgba(0, 0, 0, 0.9)');
    })

    // 点击目录closeIcon
    $('#closeIcon').on('click', () => {
        $('#catalog').css('display', 'none');
    })
})