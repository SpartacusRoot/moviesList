
// import React from 'react-native';
// var {
//   AsyncStorage
// } = React;

// const LocalStorage = {
// get : async (key) => {
// try{
//    await JSON.parse(AsyncStorage.getItem(key));
// } catch (error){
//   console.warn(error);
// }
// },

// set : async (key, value) => {
//   try{
//   await AsyncStorage.setItem(key, JSON.stringify(value));
//   } catch(error){
//     console.warn(error);
//   }
// }
// };

// export default LocalStorage;


import React from 'react-native';
var {
  AsyncStorage
} = React;

var LocalStorage = {
  get: function (key) {
    return AsyncStorage.getItem(key).then(function(value) {
      return JSON.parse(value);
    });
  },

  set: function (key, value) {
    return AsyncStorage.setItem(key, JSON.stringify(value));
  }
}

export default LocalStorage;


