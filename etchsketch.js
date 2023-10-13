const div = document.createElement('div');
const grids = document.querySelector('.grids');
const dimension = document.getElementById('dimension');
const colorwheel = document.querySelector('#colorwheel');
const color = document.querySelector('#color')
const eraser = document.querySelector('#Eraser')
const clear = document.querySelector('#Clear');
const rainbow = document.querySelector('#Rainbow');
const buttons = document.querySelectorAll('[data-action]');
const sizing = document.querySelector('#sizing');

let currentColor = 'Black';
let currentBtn = 'color';
//Initial Canvas Size



//Defining Canvas Size
function sizePresent (size) {
    sizing.textContent =`${size}x${size}`;
}

function handleUpdate(size) {
    grids.innerHTML ='';
    
    document.documentElement.style.setProperty(`--dimension`, `${100/size}%`);
    sizePresent(size);
    let canvasSize = size * size;
    for(let i =0 ; i<canvasSize; i++) {
        const gridElements = document.createElement('div');
        gridElements.classList.add('box');
        gridElements.addEventListener('click', changeColor);
        gridElements.addEventListener('mouseover', changeColor);
        grids.appendChild(gridElements);

        // Clear Canvas
        clear.addEventListener('click', ()=> {
           gridElements.style.backgroundColor = 'white';
           
        })
        
    };

};


//Determining mousemovement
let mouseDown = false;
document.body.addEventListener('mousedown',()=>{mouseDown =true;})
document.body.addEventListener('mouseup',()=>{mouseDown =false;})

//Painting Action
function changeColor(e) {
    if(e.type === 'mouseover' && !mouseDown) return;
    if(currentBtn === 'color') {
        e.target.style.backgroundColor = currentColor;
    } else if(currentBtn === 'eraser') {
        e.target.style.backgroundColor = 'white';
    } else if(currentBtn === 'rainbow') {
        let r = Math.floor(Math.random() * 255);
        let g = Math.floor(Math.random() * 255);
        let b = Math.floor(Math.random() * 255);
        e.target.style.backgroundColor = `rgb(${r},${g},${b})`;
    }
 }

//Button Selection

function handleButtonClick(event) {
    const action = event.currentTarget.getAttribute('data-action');
    changeBtn(action);
}

buttons.forEach((button) => {
    button.addEventListener('click', handleButtonClick)
})


function changeBtn(newBtn) {
    if(currentBtn === 'rainbow') {
        rainbow.classList.remove('active');
    }else if(currentBtn === 'color') {
        color.classList.remove('active');
    } else if(currentBtn === 'eraser') {
        eraser.classList.remove('active');
    } 

    if(newBtn === 'rainbow') {
        rainbow.classList.add('active');
        currentBtn = 'rainbow';
    }else if(newBtn === 'color') {
        color.classList.add('active')
        currentBtn = 'color';
    } else if(newBtn === 'eraser') {
        eraser.classList.add('active')
        currentBtn = 'eraser';
    } 
}








document.addEventListener('DOMContentLoaded', function() {
    //Set Initial Button
    changeBtn('color');
    handleUpdate(32);
    
})
dimension.addEventListener('change',(e)=>{
    handleUpdate(e.target.value);

}); 
dimension.addEventListener('mousemove', (e)=> {
    sizePresent(e.target.value);
})

colorwheel.addEventListener('change', (e)=> {currentColor = e.target.value;});


document.addEventListener('dragstart', function(e) {
    e.preventDefault();
});