export const calculateVisibilityStatus=(visibilityMeters)=>{
    const visibilityKilometers = visibilityMeters / 1000;
    let status = "";
    if (visibilityKilometers >= 10) {
     status = "Excellent 😎";
    } else if (visibilityKilometers >= 5) {
      status = "Good 🙂";
      
    } else if (visibilityKilometers >= 2) {
      status = "Average 😕";
    } else if (visibilityKilometers >= 1) {
      status = "Poor 😟";
    } else {
      status = "Very Poor 😷";
    }
  
    return {
      km: visibilityKilometers.toFixed(0), 
      status
    };
  }
  
export const calculateHumidityStatus=(humidity)=>{
    let status =""
    if (humidity < 30) {
        status= "Low Humidity 🌵";
    } else if (humidity >= 30 && humidity <= 60) {
        status= "Comfortable Humidity 😊";
    } else {
        status= "High Humidity 💧";
    }
    return {
        humidity,
        status
    }
  }


 export const  calculateFeelsLikeStatus=(feelsLike) =>{
    let status = "";  
    if (feelsLike < 10) {
      status = "Cold ❄️";
    } else if (feelsLike >= 10 && feelsLike <= 25) {
      status = "Comfortable 😊";
    } else {
      status = "Hot 🥵";
    }
  
    return {
        feelsLike,
        status
    }
  }
  

  function formatTime(date) {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  }

 export const formatSunriseAndSunsetTimes = (sunrise,sunset,timezone)=>{
        const sunriseTimestamp = sunrise * 1000; 
        const sunsetTimestamp = sunset * 1000; 
        
        const sunriseTime = new Date(sunriseTimestamp);
        const sunsetTime = new Date(sunsetTimestamp);
        
        const formattedSunriseTime = formatTime(sunriseTime);
        const formattedSunsetTime = formatTime(sunsetTime);
        return {
            formattedSunriseTime,
            formattedSunsetTime 
        }
  }
  


