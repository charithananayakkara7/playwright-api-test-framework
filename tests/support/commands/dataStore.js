let datastorage = {};

export function saveValue(key, data) {
  datastorage[key] = data;
}

export function getValue(key){
  return datastorage[key];
}

module.exports = { saveValue, getValue };
