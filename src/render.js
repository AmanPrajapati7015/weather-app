import { search } from ".";

let cityInput;
let searchBtn;



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


function render(reqInfo){
    document.body.innerHTML = '';
    const top = document.createElement('div');
    top.classList.add('top')
    top.innerHTML = makeTop(reqInfo.current);
    document.body.appendChild(top);

    cityInput = document.getElementById('city');
    searchBtn = cityInput.nextElementSibling; 
    searchBtn.addEventListener('click', getQuerry)

    const bottom = document.createElement('div');
    bottom.classList.add('bottom');
    makeBottom(reqInfo.hour, bottom);
    bottom.addEventListener('wheel', (e)=>{
        e.preventDefault();
        bottom.scrollLeft += e.deltaY;
    })
    document.body.appendChild(bottom);

}

function makeTop(current){
    let datetime = new Date(current.datetime);
    let dateOptions = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
    let timeOptions = { hour: '2-digit', minute: '2-digit' };
    let dateStr = datetime.toLocaleDateString('en-US', dateOptions)
    let timeStr = datetime.toLocaleString([], timeOptions)
    return `
        <div class="left">
            <div class="location">
                <h2>${current.text}</h2>
                <p class="medium">${current.location}</p> 
                <p class="small">${dateStr}</p>  
                <p class="small">${timeStr}</p>  

            </div>
            <div class="temp">
                <h1>${current.temp_c} °C</h1>
                <button id="change-unit" class="small">Display F</button>
                <img src=${current.icon} id="cur-icon" alt="">
            </div>
            <div class="change-city">
                <input id="city" placeholder="Search Location..." type="text">
                <img src="./assets/search.svg" alt="">
            </div>
        </div>

        <div class="right">
            <div>
                <img src="./assets/feelsLike.svg"  alt="">
                <div>
                    <p class="small">Feels like</p>
                    <h3>${current.feelslike_c} °C</h3>
                </div>
            </div>
            <div>
                <img src="./assets/humidity.svg" alt="">
                <div>
                    <p class="small">Humidity</p>
                    <h3>${current.humidity} %</h3>
                </div>
            </div>
            <div>
                <img src="./assets/rain.svg"  alt="">
                <div>
                    <p class="small">Chance of Rain</p>
                    <h3>${current.chance_of_rain} %</h3>
                </div>
            </div>
            <div>
                <img src="./assets/wind.svg"  alt="">
                <div>
                    <p class="small">Wind Speed</p>
                    <h3>${current.wind_kph} km/h</h3>
                </div>
            </div>
        </div>
        `
}

function makeBottom(hours, bottom){
    hours.forEach(hour=>{
        bottom.appendChild(makeHour(hour));
    })
}

function makeHour(hour){
    let time = new Date(hour.datetime);
    let timeStr = time.toLocaleTimeString([],{hour:'2-digit'});

    const hourDiv = document.createElement('div');
    hourDiv.classList.add('hour');
    hourDiv.innerHTML = `
        <p class="small">${timeStr}</p>
        <h3>${hour.temp_c} °C</h3>
        <img src=${hour.icon} alt="">
    `;
    return hourDiv;
}




export default render;