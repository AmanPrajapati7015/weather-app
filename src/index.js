import './styles.css'

import getforecast from './getDetails';
import render from './render';


async function search(city){
    const loading = document.querySelector('.loading');
    loading.classList.add('active')
    let reqInfo = await getforecast(city);
    console.log(reqInfo);
    render(reqInfo);
    loading.classList.remove('active');
    localStorage.setItem('location', city);
}



if(localStorage.getItem('location')){
    search(localStorage.getItem('location'));
}
else 
    search('new delhi');

export {search};


//Todos
// 2. toggle C and F