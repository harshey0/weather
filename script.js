$("form").submit((event) => {
    event.preventDefault();
    const city = $("input").val();

  
    background(city);
    getWeather(city);
});
async function background(city){
try{
    const response = await axios.get("https://api.unsplash.com/search/photos?query="+city+"&client_id=td5pJx39B08uWiCxzhBC5KIfAnNiKOh4voVvOKjReMM");
document.body.style.backgroundImage = `url(${response.data.results[0].urls.regular})`;
document.body.style.backgroundSize = "cover";
}
catch (error) {
    document.body.style.backgroundImage = `url('https://source.unsplash.com/1600x900/?beach')`;
    console.error('Error fetching location picture:', error);

}
};
async function getWeather(city){

try{
   
    const response = await axios.get("https://api.openweathermap.org/data/2.5/weather?q="+ city +"&appid=723a0936a1655424606761923fb6166d");
    const data = response.data;

    document.querySelector(".city").innerHTML=`Weather in ${data.name}`;
    document.querySelector(".temp").innerHTML=`${(data.main.temp-273.15).toFixed(1)} °C`;
    document.querySelector(".desc").innerHTML=(data.weather[0].description);
    document.querySelector(".icon").src = " https://openweathermap.org/img/wn/"+data.weather[0].icon+".png";
    document.querySelector(".humidity").innerHTML="Humidity: "+data.main.humidity+"％";
    document.querySelector(".wind").innerHTML="Wind Speed: "+(data.wind.speed).toFixed(1)+" km/h";
    

}
    catch (error) {
        document.querySelector(".city").innerHTML = "City not found";
        document.querySelector(".temp").innerHTML= "";
        document.querySelector(".desc").innerHTML="";
        document.querySelector(".icon").src = "";
        document.querySelector(".humidity").innerHTML="";
        document.querySelector(".wind").innerHTML="";
        document.body.style.backgroundImage = "none";
        console.error('Error fetching weather data:', error);

    }


};
