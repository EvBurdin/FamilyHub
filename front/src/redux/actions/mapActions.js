import { CHANGE_SELF_LOCATION, GET_FAMILY_LOCATION } from '../actionNames/mapActionNames';

export const getFamilyLocations=()=>async (dispatch)=>{
    const response = await fetch('http://134.209.82.36.nip.io:3000/api/?familyID=qwerty') //familyID  по идее приходит при логине и хранится в стейте юзера
    const myJson = await response.json();
    
    dispatch({type:GET_FAMILY_LOCATION,payload:myJson});
}