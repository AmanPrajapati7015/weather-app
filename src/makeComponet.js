
function makeTop(current, isC){
    let datetime = new Date(current.datetime);
    let dateOptions = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
    let timeOptions = { hour: '2-digit', minute: '2-digit',hour12:true};
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
                <h1>${isC?current.temp_c+' °C': current.temp_f+' °F'}</h1>
                <button id="change-unit" class="small">Display in ${isC? '°F' : '°C'}</button>
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
                    <h3>${isC?current.feelslike_c+' °C': current.feelslike_f+' °F'}</h3>
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
                    <h3>${isC?current.wind_kph+' kph':current.wind_mph+' mph'}</h3>
                </div>
            </div>
        </div>
        `
}

function makeBottom(hours, bottom, inC){
    hours.forEach(hour=>{
        bottom.appendChild(makeHour(hour, inC));
    })
}

function makeHour(hour, inC){
    let time = new Date(hour.datetime);
    let timeStr = time.toLocaleTimeString([],{hour:'2-digit',hour12:true});

    const hourDiv = document.createElement('div');
    hourDiv.classList.add('hour');
    hourDiv.innerHTML = `
        <p class="small">${timeStr}</p>
        <h3>${(inC)? hour.temp_c +' °C' :hour.temp_f +' °F'}</h3>
        <img src=${hour.icon} alt="">
    `;
    return hourDiv;
}

export {makeTop, makeBottom};