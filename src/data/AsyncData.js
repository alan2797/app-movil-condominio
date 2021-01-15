// @flow
'use strict';

import { AsyncStorage } from "react-native";

// async function read(key : string){
//     try {
//         const data = await AsyncStorage.getItem(key);
//         return JSON.parse(data);
//     } catch (error) {
//         console.log("error reading data", error);
//         return null;
//     }
// }

const removeStore = async (key : string) => {
 await AsyncStorage.removeItem(key)
 .then(() => {
   return true;
 })
 .catch((error) => {
   console.log(error);
   return false;
 })
}

function read(key : string) {
    return AsyncStorage.getItem(key)
    .then((result) => {
        return result;
    }, (error) => {
        console.log(error.message);
        return null;
    });
}

async function deleteAll(){
    try{
        await AsyncStorage.clear((error) =>{
            if(error !== null){
                console.log("Inside callback " + error.message);
            }
        });
        return true;
    }
    catch(error){
        console.log(error.message);
        return false;
    }
}

async function save(key : string, value : string){
    var data = JSON.stringify(value);
    try {
        const response = await AsyncStorage.setItem(key, value);
        console.log(response);
    } catch (error) {
        console.log("error saving data", error);
    }
}

const saveMulti = async (values: any) => {
    // console.log(JSON.stringify("valores a guardar " + values));
    try {
        await AsyncStorage.multiSet(values);
        return true;
    } catch (e) {
        console.log("MultiSet " + JSON.stringify(e));
        return false;
    }
}

const readMulti = async (...keys: any) => {
    return await AsyncStorage.multiGet(keys)
        .then(stores => {
            return stores;
        })
        .catch(error => {
            console.log(error.message);
        });
}
/////////utilities
export {read, save, saveMulti, readMulti, deleteAll, removeStore};
