import firebase from "../firebase";

export function reducer(state, action) {
  switch (action.type) {
    case "saveSnapshot":
      return { ...state, cities: setCities(action.payload.cities, state) };
    case "setSelectedCity":
      return {
        ...state,
        selectedCity: setSelectedCity(
          action.payload.name,
          action.payload.id,
          state
        ),
      };
    case "saveCity":
      return { ...state, cities: saveCity(action.payload.cityName, state) };
    case "userLogin":
      return {
        ...state,
        userData: action.payload.response.user,
      };
    case "logUserIn":
      return {
        ...state,
        userData: action.payload.userData,
      };
    case "userSignup":
      return {
        ...state,
        userData: action.payload.response.user,
      };
    case "authorisationLogout":
      return { ...state, userData: null, cities: [], selectedCity: {} };
    case "removeCity":
      removeCity(action.payload.cityToRemove);
      return {
        ...state,
        selectedCity: setSelectedCity(
          action.payload.name,
          action.payload.id,
          state
        ),
      };

    default:
      return state;
  }
}

function setCities(cities, state) {
  const citiesData = [];
  if (state.userData) {
    cities.forEach((city) => {
      if (city.data().uid === state.userData.uid) {
        citiesData.push({ ...city.data(), id: city.id });
      }
    });
  }

  return citiesData;
}

function setSelectedCity(name, id, state) {
  if (name && id) {
    return { name: name, id: id };
  } else if (state.cities.length) {
    return { name: state.cities[0].name, id: state.cities[0].id };
  } else {
    return { name: "", id: "" };
  }
}

function saveCity(cityName, state) {
  const db = firebase.firestore();
  db.collection("cities").add({ name: cityName, uid: state.userData.uid });
}

function removeCity(id) {
  const db = firebase.firestore();
  db.collection("cities").doc(id).delete();
}
