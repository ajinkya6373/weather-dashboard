import './App.css';
import Dashboard from './components/dashboard';
function App() {
  return (
    <div className="bg-[#d6d7da] h-[100vh] flex items-center justify-center">
      <Dashboard />
    </div>
  );
}

export default App;




    // const geoLocation = "http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}"
    // useEffect(()=>{
    //     (async()=>{
    //        const res = await axios.get("https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=57df07729208178beddaed5c64404607&units=metric")
    //         console.log(res.data);
    //     })()
    // },[])