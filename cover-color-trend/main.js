// 封面数据
const books = [
    {
        name: '3秒',
        color: ['#000', '#fff', '#f0f0f0'],
    }, {
        name: '呼吸',
        color: ['#181818', '#303030', '#c0c0c0', '#d8d8d8', '#a8a8a8', '#484848', '#606060', '#909090', '#f0f0f0', '787878']
    }, {
        name: '建筑师',
        color: ['#fff', '#783090', '#30c0f0', '#a8a8a8', '#d81890', '#481878', '#f0f0f0', '#c0c0c0', '#909090', '#787878'],
    }, {
        name: '克莱因壶',
        color: ['#000', '#180000', '#480018', '#187878', '#a83030', '#601818', '#184848', '#186060', '#003030', '#a80018'],
    }, {
        name: '了不起的我',
        color: ['#f0d800', '#1830a8', '#1848c0', '#c0a830', '#d8c018', '#f0d818', '#787860', '#3060d8', '#909048', '#607878'],
    }, {
        name: '你当像鸟飞往你的山',
        color: ['#f0f0f0', '#a81818', '#900018', '#f09018', '#f0d8a8', '#f0c048', '#483018', '#c0c0a8', '#184890', '#787878'],
    }, {
        name: '时间的秩序',
        color: ['#483060', '#604860', '#fff', '#f0f0f0', '#d8d8d8', '#787878', '#c0c0c0', '#a8a8a8', '#909090', '#f0c090'],
    }, {
        name: '死屋',
        color: ['#c01818', '#481818', '#a89078', '#903030', '#a86048', '#784848'],
    }, {
        name: '有所不为的反叛者',
        color: ['#f0f0d8', '#a8a890', '#c0c0a8', '#909078', '#787860', '#606048', '#484830', '#303018'],
    }, {
        name: 'opus',
        color: ['#c00018', '#901818', '#301818', '#a8a8a8', '#000', '#d8d8d8', '#787878', '#c0c0c0', '#909090', '#f0f0f0'],
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
    
    const svg = document.querySelector('svg');
    
    let colorNums = 0;
    for (let i = 0; i < books.length; i++) {
        for (let j = 0; j < books[i].color.length; j++) {
            colorNums++;        
        }
    }
    
    const width = 350 / colorNums;
    const height = 80;
    
    // 绘制色谱图中色块
    function draw(node) {
        const { x, y, color, name } = node;
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('x', x);
        rect.setAttribute('y', y);
        rect.setAttribute('height', 100);
        rect.setAttribute('width', width);
        rect.setAttribute('fill', color);
        rect.setAttribute('data-name', name); 
        
        svg.append(rect);
    }
    
    let index = 0;
    for (let i = 0; i < books.length; i++) {
        for (let j = 0; j < books[i].color.length; j++) {        
            draw({
                name: books[i].name,
                x: index * width,
                y: 0,
                color: books[i].color[j]
            })
            
            index++;
        }
    }
    
    svg.addEventListener('click', evt => {
        const target = evt.target;
        if (target) {
            const name = target.getAttribute('data-name');
            updateBook(name);
        }
    });
    
    function updateBook(name) {
        document.getElementsByClassName('cover')[0].setAttribute('src', '../assets/images/' + name + '.jpg');   
        document.getElementsByClassName('name')[0].innerHTML = '《' + name + '》';    
    }
    
    updateBook(books[0].name); 
});