const input = document.querySelector("#input");
const button = document.querySelector(".button");
const delete1 = document.querySelector(".delete");
const container = document.querySelector(".container");
const form = document.querySelector(".form");
const msgSpan =document.querySelector(".msgSpan")

let cities = JSON.parse(localStorage.getItem("cities")) || [];

window.addEventListener("load", () => {
  getCityListFromLocalStorage();
});

const getCityListFromLocalStorage = () => {
  cities.forEach((city) => {
    createWeather(city);
  });
};

form.addEventListener("submit", (e) => {
  // console.log(input.value);
  e.preventDefault();
  cityinput = input.value;
  //   console.log(cityinput);
  if (cityinput.trim() === "") {
    msgSpan.innerText = "Please enter a city";
    setTimeout(()=>{
      msgSpan.innerText=""
    },2000)
    // alert("please enter a city");
  } else {
    getFetchData();
  }

  //   cityinput = input.value;
  form.reset();
  // input.focus();
});

const getFetchData = () => {
  let API = "8f476966e75f896c4c73cf65cc1e398b";
  let URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityinput}&appid=${API}&units=metric`;
  fetch(URL)
    .then((res) => res.json())
    .then((data) => createWeatherInfo(data));
};

const createWeatherInfo = (data) => {
  const {
    name,
    sys: { country },
    main: { temp },
    weather: [{ icon, description }],
  } = data;

  const cityData = {
    name: name,
    country: country,
    temp: temp,
    icon: icon,
    description: description,
  };

  //   cityList.forEach((e) => {
  //     if (e.name == cityInfo.name) {
  //       alert("Enter anoter city");
  //     } else {
  //       createWeather(cityInfo);
  //       cityList.push(cityInfo);

  //       localStorage.setItem("cityList", JSON.stringify(cityList));
  //     }
  //   });
  let flag = true;
  cities.forEach((x) => x.name == cityData.name && (flag = false));
  if (flag) {
    createWeather(cityData);
    cities.push(cityData);
    localStorage.setItem("cities", JSON.stringify(cities));
  } else {
     msgSpan.innerText = "Please enter another city";
     setTimeout(() => {
       msgSpan.innerText = "";
     }, 2000);
  }
};

const createWeather = (cityData) => {
  //   console.log(data);
  const { name, country, temp, icon, description } = cityData;
  //   console.log(description);
  container.innerHTML += `
    <div class="card">
    <span>${name}</span>
    <span>${country}</span>
    <span style="font-size: 1.5rem">${temp} &#8451 </span>
    <img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="">
    <span>${description}</span>
    <button class="btn">X</button>
    </div>`;
};

container.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn")) {
    console.log(cities);
    console.log(e.target.parentElement.children[0].innerText);
    e.target.closest("div").remove();
    cities = cities.filter((x) => {
      return x.name != e.target.parentElement.children[0].innerText;
    });
    localStorage.setItem("cities", JSON.stringify(cities));
    console.log(cities);
  }
});

delete1.addEventListener("click", (e) => {
  container.innerHTML=""
  cities = [];
  localStorage.setItem("cities", JSON.stringify(cities));
});
