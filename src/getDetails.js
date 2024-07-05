
const {API_KEY} = process.env;
const baseUrl = 'http://api.weatherapi.com/v1/forecast.json';

function getReqDetails(res){
    // console.log(res.current.condition);
    const details = {current:{}, hour: []};

    //current detials for top-right 
    details.current.text = res.current.condition.text;
    details.current.location = res.location.name+', '+res.location.country;
    details.current.datetime = res.location.localtime;
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

    let i =0;
    let curHour = new Date(details.current.datetime).getHours()+1;
    let day = 0;

    while(i<24){
        let hourInfo = {};
        if(curHour == 24){
            curHour = 0;
            day++;
        }
        hourInfo.datetime = res.forecast.forecastday[day].hour[curHour].time;
        hourInfo.temp_c = res.forecast.forecastday[day].hour[curHour].temp_c;
        hourInfo.temp_f = res.forecast.forecastday[day].hour[curHour].temp_f;
        hourInfo.icon = res.forecast.forecastday[day].hour[curHour].condition.icon;
        details.hour.push(hourInfo);
        i++;
        curHour++;
    }
    return details;
}

async function getforecast(city){
    const url = baseUrl+`?key=${API_KEY}&q=${city}&days=3`;
    console.log(url);
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

export default getforecast;