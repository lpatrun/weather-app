import firebase from "../firebase";

export function reducer(state, action) {
  switch (action.type) {
    case "saveSnapshot":
      return { ...state, cities: setCities(action.payload.cities, state) };
    case "setSelectedCity":
      return {
        ...state,
        selectedCity: action.payload.index > -1 ? action.payload.index : -1,
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
    case "loadingCities":
      return { ...state, loadingCities: true };
    case "notLoadingCities":
      return { ...state, loadingCities: false };
    case "removeCity":
      removeCity(action.payload.cityToRemove, state);
      return {
        ...state,
        selectedCity: state.cities.length > 1 ? 0 : -1,
      };

    default:
      return state;
  }
}

function setCities(cities, state) {
  const citiesData = [];
  if (state.userData) {
    cities.forEach((city) => {
      citiesData.push({ ...city.data(), id: city.id });
    });
  }
  return citiesData;
}

function saveCity(cityName, state) {
  const db = firebase.firestore();
  db.collection("cities")
    .doc(state.userData.uid)
    .collection("userCities")
    .add({ name: cityName, uid: state.userData.uid });
}

function removeCity(id, state) {
  const db = firebase.firestore();
  db.collection("cities")
    .doc(state.userData.uid)
    .collection("userCities")
    .doc(id)
    .delete();
}
