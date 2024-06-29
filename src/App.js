import { useState, useEffect } from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import RecipeReviewCard from './component/RecipeReviewCard';
import WeatherButton from './component/WeatherButton';
/* import ToggleButtonNotEmpty from './component/ToggleButtonNotEmpty'; */
import bgSunny from './asset/bgSunny.jpg';
import bgRain from './asset/bgRain.jpg';



// 1. 앱 초기화면 현재 위치 기반의 날씨가 보인다.
// 2. 화면 표시 요소 도시, 섭씨/화씨 온도, 날씨 상태
// 3. 드롭다운 메뉴가 있다 (default - 현재 위치, 4개는 다른 도시)
// 4. 도시 드롭다운을 선택하면 해당 도시의 날씨로 바뀐다.
// 5. 배경은 현재 선택된 날씨의 이미지를 나타낸다.(흐림이면 구름, 비면 비내리는 애니메이션)
// 6. 데이터를 로딩 중엔 로딩스피너가 돌아야 한다.

function App() {
  /* const [locateName, setLocateName] = useState('');
  const [weatherImg, setWeatherImg] = useState('');
  const [weatherTemp, setWeatherTemp] = useState(''); */
  const [weatherBg, setWeatherBg] = useState('');
  const [weather, setWeather] = useState({});
  const cities=['paris', 'new york', 'tokyo', 'seoul', 'busan'];
  const [city, setCity] = useState('');

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          let lat = position.coords.latitude;
          let lon = position.coords.longitude;
          getWeatherByCurrentLocation(lat, lon)
          console.log("현재 위치", lat, lon);
        },
        (error) => {
          if (error.code === error.PERMISSION_DENIED) {
            console.error("위치 권한이 거부되었습니다.");
            alert("위치 권한이 거부되었습니다. 설정에서 위치 권한을 허용해주세요.");
          }
        }
      );
    } else {
      console.error("이 브라우저에서는 위치 정보를 지원하지 않습니다.");
      alert("이 브라우저에서는 위치 정보를 지원하지 않습니다.");
    }
  };

  const getWeatherByCurrentLocation = async (lat, lon) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=0d0c8f6ae2cc26ec553dc8ed44eea967&units=metric`
    let response = await fetch(url)
    let data = await response.json();
    updateWeatherData(data);
  } 
  
  const updateWeatherData = (data) => {
    if (data.weather[0].main === "Clear") {
      setWeatherBg(bgSunny)
    } else if(data.weather[0].main === "Rain") {
      setWeatherBg(bgRain)
    }
   setWeather(data);
  }

const getWeatherByCity=async ()=>{
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=0d0c8f6ae2cc26ec553dc8ed44eea967&units=metric`
  let response = await fetch(url);
  let data = await response.json();
  updateWeatherData(data);
  console.log("data?" , data)
 
}

  useEffect(() => {
    if(city==""){
      getCurrentLocation();
    } else {
      getWeatherByCity();
    }
  }, [city]);

  return (
    <div className='Main' style={{backgroundImage: `url(${weatherBg})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}>
      <div>
      {/* <WeatherButton cities={cities} setCity={setCity} /> */}
      <RecipeReviewCard weather={weather} cities={cities} setCity={setCity}/>
      </div>
    </div>
  );
}

export default App;
