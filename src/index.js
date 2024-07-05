import './styles.css'

import getforecast from './getDetails';
import render from './render';


async function search(city, isC){
    const loading = document.querySelector('.loading');
    loading.classList.add('active')
    let reqInfo = await getforecast(city);
    console.log(reqInfo);
    render(reqInfo, isC);
    loading.classList.remove('active');
    localStorage.setItem('location', city);
}

if(localStorage.getItem('location')){
    search(localStorage.getItem('location'), +localStorage.getItem('isC'));
}
else 
    search('new delhi', 1);

export {search};

