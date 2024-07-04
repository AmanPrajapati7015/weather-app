import './styles.css'

const {API_KEY} = process.env;
const baseUrl = 'http://api.weatherapi.com/v1/forecast.json';



function getReqDetails(res){
    // console.log(res.current.condition);
    const details = {current:{}, days: []};

    //current detials for top-right 
    details.current.text = res.current.condition.text;
    details.current.location = res.location.name+', '+res.location.country;
    details.current.datetime = res.location.localtime_epoch;
    details.current.temp_c = res.current.temp_c;
    details.current.temp_f = res.current.temp_f;
    details.current.icon = res.current.condition.icon;

    //current details for top-left
    details.current.feelslike_c = res.current.feelslike_c;
    details.current.feelslike_f = res.current.feelslike_f;
    details.current.humidity = res.current.humidity;
    details.current.chance_of_rain = res.forecast.forecastday[0].day.daily_chance_of_rain;
    details.current.wind_kph = res.current.wind_kph;
    details.current.wind_mph = res.current.wind_mph;

    
    for(i of [0,1,2]){
        let dayInfo = {};
        dayInfo.datetime = res.forecast.forecastday[i].date_epoch;
        dayInfo.maxtemp_c = res.forecast.forecastday[i].day.maxtemp_c;
        dayInfo.maxtemp_f = res.forecast.forecastday[i].day.maxtemp_f;
        dayInfo.mintemp_c = res.forecast.forecastday[i].day.mintemp_c;
        dayInfo.mintemp_f = res.forecast.forecastday[i].day.mintemp_f;
        dayInfo.icon = res.forecast.forecastday[i].day.condition.icon;
        details.days.push(dayInfo);
    }
    return details;
}

async function getforecast(city){
    const url = baseUrl+`?key=${API_KEY}&q=${city}&days=3`;
    try{
        const resp = await fetch(url);
        if(resp.status == 400){
            alert('no such city');
        }
        else if(resp.status == 200){
            const res = await resp.json();
            let reqInfo = getReqDetails(res);
            return reqInfo;
        }
    }
    catch(e){
        console.log(e);
    }
}

(async function  (){
    console.log('start loading');
    // let reqInfo = await getforecast('new delhi');
    // console.log(reqInfo);
    console.log('stop loading');

})();