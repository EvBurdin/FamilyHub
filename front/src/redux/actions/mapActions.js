import { CHANGE_SELF_LOCATION, GET_FAMILY_LOCATION } from '../actionNames/mapActionNames';

export const getFamilyLocations=()=>async (dispatch)=>{
    const response = await fetch('http://134.209.82.36:3000/api/family/coordinates'{
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Cache: 'no-cache',
            credentials: 'same-origin',
            Cookie: 'connect.sid=s:IbnzXEW3AGkWl_taWKkfVK9Y4FDaohA1.vnysLJuDJH3L4pL5DudyhiaKSCMCA7FaxkWV/Hc/nEo',
        },
    }) //familyID  по идее приходит при логине и хранится в стейте юзера
    const myJson = await response.json();
    
    dispatch({type:GET_FAMILY_LOCATION,payload:myJson});
}