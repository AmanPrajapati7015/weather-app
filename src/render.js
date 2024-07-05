import { search } from ".";
import {makeBottom, makeTop} from './makeComponet'

let cityInput;
let searchBtn;
const body = document.getElementById('content');



function getQuerry(){
    let city = cityInput.value;
    console.log(city);
    if(city == ''){
        alert("City field is empyt");
        return;
    }
    search(city);
    cityInput.value = '';
}


function render(reqInfo, inC){

    body.innerHTML = '';
    const top = document.createElement('div');
    top.classList.add('top')
    top.innerHTML = makeTop(reqInfo.current, inC);
    body.appendChild(top);

    cityInput = document.getElementById('city');
    searchBtn = cityInput.nextElementSibling; 
    searchBtn.addEventListener('click', getQuerry);

    const changeUnitBtn = document.getElementById('change-unit');
    changeUnitBtn.addEventListener('click', ()=>{render(reqInfo, !inC)});
    localStorage.setItem('isC', (inC)?1:0);

    const bottom = document.createElement('div');
    bottom.classList.add('bottom');
    makeBottom(reqInfo.hour, bottom, inC);
    bottom.addEventListener('wheel', (e)=>{
        e.preventDefault();
        bottom.scrollLeft += e.deltaY;
    })
    body.appendChild(bottom);

}




export default render;