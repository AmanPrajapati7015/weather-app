import './styles.css'

import getforecast from './getDetails';
import render from './render';



async function search(city){
    
    console.log('start loading');
    let reqInfo = await getforecast(city);
    console.log(reqInfo);
    render(reqInfo);
    console.log('stop loading');

    localStorage.setItem('location', city);
}



if(localStorage.getItem('location')){
    search(localStorage.getItem('location'));
}
else 
    search('new delhi');

export {search};