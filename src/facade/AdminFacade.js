
/*
function getAllCountries() {
  return null
}

function getAllUsers() {
  return null;
}

function deleteCountryByID(id) {
  return null;
}

function deleteUserByID(id) {
  return null;
}

function updateCountryById(id, data) {
  // Añadimos la zona horaria del usuario para registrar cambios
  Object.assign(
        data, {
          "clientTimeOffset": new Date().getTimezoneOffset() 
        } 
      )
  return null;
}

function updateUseryById(id, data) {
  Object.assign(
    data, {
      "clientTimeOffset": new Date().getTimezoneOffset() 
    } 
  )
  return null;
}

function addCountry(data) {
  Object.assign(
    data, {
      "clientTimeOffset": new Date().getTimezoneOffset() 
    } 
  )
  return null
}

function addUser(data) {
  Object.assign(
    data, {
      "clientTimeOffset": new Date().getTimezoneOffset() 
    } 
  )
  for (const label in data) {
    data[label.toLowerCase().replaceAll(' ', '_')] = data[label]
    delete data[label]
  }
  return null
}

function addAllCountries(data) {
  return null
}

export { getAllCountries, 
         deleteCountryByID, 
         getAllUsers, 
         deleteUserByID, 
         updateCountryById, 
         updateUseryById,
         addCountry,
         addUser,
         addAllCountries
         };

*/