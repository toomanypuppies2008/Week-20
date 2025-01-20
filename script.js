const button = document.getElementById("findButton");
const chosenOption = document.getElementById("starwars_options");
const chosenNumber = document.getElementById("numbers_options");
const results = document.querySelector(".results");
const loading = document.querySelector(".loading");
const errorBlock = document.querySelector(".error");

const fetchData = async () => {
  try {
    if (!chosenNumber.value) {
      throw new Error("Вы не выбрали номер!");
    }
    if (!(chosenNumber.value >= 1 && chosenNumber.value <= 10)) {
      throw new Error("Выбранный номер должен быть в диапазоне от 1 до 10");
    }
    const response = await fetch(
      `https://swapi.dev/api/${chosenOption.value}/${chosenNumber.value}/`
    );
    if (!response.ok) {
      throw new Error(
        `Произошла ошибка сервера(таких данных нет): ${response.status}`
      );
    }
    const data = await response.json();
    switch (chosenOption.value) {
      case "people":
        results.innerHTML = `Name: ${data.name}, Weight: ${data.mass}, Gender: ${data.gender}`;
        break;
      case "films":
        results.innerHTML = `Director: ${data.director}, Producer: ${data.producer}, Created: ${data.created}`;
        break;
      case "starships":
        results.innerHTML = `Name: ${data.name}, Model: ${data.model}, Length: ${data.length}`;
        break;
      case "vehicles":
        results.innerHTML = `Model: ${data.model}, Passengers: ${data.passengers}`;
        break;
      case "species":
        results.innerHTML = `Name: ${data.name}, Language: ${data.language}, Designation: ${data.designation}`;
        break;
      case "planets":
        results.innerHTML = `Name: ${data.name}, Gravity: ${data.gravity}, Population: ${data.population}`;
        break;
    }
    errorBlock.innerHTML = "";
  } catch (error) {
    errorBlock.innerHTML = `${error.message}`;
    results.innerHTML = "";
  } finally {
    console.log("Запрос был");
  }
};

button.addEventListener("click", function () {
  loading.innerHTML = "";
  fetchData();
});
