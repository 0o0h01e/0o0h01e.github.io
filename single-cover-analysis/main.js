const books = [
    {
        name: '3秒',
        data: [
            { color: '#000', value: 0.992617 }, 
            { color: '#fff', value: 0.004519 }, 
            { color: '#f0f0f0', value: 0.002864}
        ],
    }, {
        name: '呼吸',
        data: [
            { color: '#181818', value: 0.807767 }, 
            { color: '#303030', value: 0.047702 }, 
            { color: '#c0c0c0', value: 0.030874 }, 
            { color: '#d8d8d8', value: 0.028803 }, 
            { color: '#a8a8a8', value: 0.019612 }, 
            { color: '#484848', value: 0.015663 }, 
            { color: '#606060', value: 0.015534 }, 
            { color: '#909090', value: 0.014757 }, 
            { color: '#f0f0f0', value: 0.012880 }, 
            { color: '#787878', value: 0.006343 }
        ]
    }, {
        name: '建筑师',
        data: [
            { color: '#fff', value: 0.245706 },
            { color: '#783090', value: 0.203724 },
            { color: '#30c0f0', value: 0.112733 },
            { color: '#a8a8a8', value: 0.100300 },
            { color: '#d81890', value: 0.082943 },
            { color: '#481878', value: 0.064925 },
            { color: '#f0f0f0', value: 0.038258 },
            { color: '#c0c0c0', value: 0.023003 },
            { color: '#909090', value: 0.012973 },
            { color: '#787878', value: 0.011712 },
        ]
    }, {
        name: '克莱因壶',
        data: [
            { color: '#000', value: 0.524295 },
            { color: '#180000', value: 0.329423 },
            { color: '#480018', value: 0.054295 },
            { color: '#187878', value: 0.018910 },
            { color: '#a83030', value: 0.017564 },
            { color: '#601818', value: 0.014551 },
            { color: '#184848', value: 0.013397 },
            { color: '#186060', value: 0.010385 },
            { color: '#003030', value: 0.007692 },
            { color: '#a80018', value: 0.004103 },
        ]
    }, {
        name: '了不起的我',
        data: [
            { color: '#f0d800', value: 0.721143},
            { color: '#1830a8', value: 0.062286},
            { color: '#1848c0', value: 0.052762},
            { color: '#c0a830', value: 0.027492},
            { color: '#d8c018', value: 0.026730},
            { color: '#f0d818', value: 0.017714},
            { color: '#787860', value: 0.016063},
            { color: '#3060d8', value: 0.014159},
            { color: '#909048', value: 0.013714},
            { color: '#607878', value: 0.011556},
        ]
    }, {
        name: '你当像鸟飞往你的山',
        data: [
            { color: '#f0f0f0', value: 0.636570 },
            { color: '#a81818', value: 0.091650 },
            { color: '#900018', value: 0.055987 },
            { color: '#f09018', value: 0.047314 },
            { color: '#f0d8a8', value: 0.030809 },
            { color: '#f0c048', value: 0.028673 },
            { color: '#483018', value: 0.017540 },
            { color: '#c0c0a8', value: 0.015146 },
            { color: '#184890', value: 0.009256 },
            { color: '#787878', value: 0.007896 },
        ]
    }, {
        name: '时间的秩序',
        data: [
            { color: '#483060', value: 0.428406 },
            { color: '#604860', value: 0.261449 },
            { color: '#fff', value: 0.131739 },
            { color: '#f0f0f0', value: 0.059058 },
            { color: '#d8d8d8', value: 0.034275 },
            { color: '#787878', value: 0.026739 },
            { color: '#c0c0c0', value: 0.021232 },
            { color: '#a8a8a8', value: 0.014710 },
            { color: '#909090', value: 0.008623 },
            { color: '#f0c090', value: 0.003623 },
        ]
    }, {
        name: '死屋',
        data: [
            { color: '#c01818', value: 0.361931 },
            { color: '#481818', value: 0.292461 },
            { color: '#a89078', value: 0.225296 },
            { color: '#903030', value: 0.058754 },
            { color: '#a86048', value: 0.043988 },
            { color: '#784848', value: 0.017570 },
        ]
    }, {
        name: '有所不为的反叛者',
        data: [
            { color: '#f0f0d8', value: 0.973402 },
            { color: '#a8a890', value: 0.010103 },
            { color: '#c0c0a8', value: 0.006323 },
            { color: '#909078', value: 0.003643 },
            { color: '#787860', value: 0.002749 },
            { color: '#606048', value: 0.001718 },
            { color: '#484830', value: 0.001581 },
            { color: '#303018', value: 0.000481 },
        ]
    }, {
        name: 'opus',
        data: [
            { color: '#c00018', value: 0.321270 },
            { color: '#901818', value: 0.150032 },
            { color: '#301818', value: 0.098603 },
            { color: '#a8a8a8', value: 0.094095 },
            { color: '#000', value: 0.058413 },
            { color: '#d8d8d8', value: 0.056254 },
            { color: '#787878', value: 0.030857 },
            { color: '#c0c0c0', value: 0.030095 },
            { color: '#909090', value: 0.029143 },
            { color: '#f0f0f0', value: 0.026349 },
        ]
    }
];

const queue = new createjs.LoadQueue(false);

const images = [];
for (let i = 0; i < books.length; i++) {
    images.push(books[i].name + '.jpg');    
}
queue.loadManifest(images, true, '../assets/images/');

//监听完成事件
queue.on("complete", function(){
    console.log("加载完成");

    document.getElementById('loading').remove();
    document.getElementsByClassName('container')[0].className = 'container';

    const echart = echarts.init(document.getElementsByClassName('color')[0]);

    function drawChart(book) {
        const data = [];
        for (let i = 0; i < book.data.length; i++) {
            data.push({
                name: book.data[i].color,
                value: book.data[i].value,
                itemStyle: {
                    color: book.data[i].color
                }
            })

        }

        const option = {
            series: [{
                type: 'treemap',
                data: data,
                breadcrumb: {
                    show: false
                },
                nodeClick: false,
                itemStyle: {
                    gapWidth: 3
                },
                roam: false
            }],
        }

        echart.setOption(option);
    }

    function updateBook(name) {
        document.getElementsByClassName('cover')[0].setAttribute('src', '../assets/images/' + name + '.jpg');   
        document.getElementsByClassName('name')[0].innerHTML = '《' + name + '》';    
    }
    
    let index = 0;
    updateBook(books[index].name);
    drawChart(books[index]);

    document.getElementsByClassName('left-arrow')[0].addEventListener('click', evt => {
        if (index == 0) return;
        index--;
        updateBook(books[index].name);
        drawChart(books[index]);
    });
    document.getElementsByClassName('right-arrow')[0].addEventListener('click', evt => {
        if (index == books.length - 1) return;
        index++;
        updateBook(books[index].name);
        drawChart(books[index]);
    })
});