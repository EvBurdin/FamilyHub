import {
 SHOW_MODAL, EDIT_INPUT, SAVE_TASK, CHECK_TASK, DEL_TASK, GET_FAMILY_TODOS 
} from '../actionNames/todoTypes';

export const showModal = (needToShow, i) => (dispatch) => {
  dispatch({
    type: SHOW_MODAL,
    bool: needToShow,
    index: i,
  });
};
export const editInput = (txt) => async (dispatch) => {
  // try {
  //   console.log('-----------------------');
  //   console.log('trying FETCH - PUT...');
  //   const response = await fetch('http://134.209.82.36:3000/api/user/todo', {
  //     method: 'PUT',
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //       Cache: 'no-cache',
  //       credentials: 'same-origin',
  //       Cookie: `connect.sid=${cookies}`,
  //     },
  //     body: JSON.stringify({ a: 1, b: 'Textual content' }),
  //   });
  //   const myJson = await response.json();

  dispatch({
    type: EDIT_INPUT,
    text: txt,
  });
  // } catch (err) {
  //   console.log(`Error with EDITING family TODOs: ${err}\n`);
  // }
};
export const saveTask = () => async (dispatch) => {
  // try {
  //   console.log('-----------------------');
  //   console.log('trying FETCH - POST...');
  //   const response = await fetch('http://134.209.82.36:3000/api/user/todo', {
  //     method: 'POST',
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //       Cache: 'no-cache',
  //       credentials: 'same-origin',
  //       Cookie: `connect.sid=${cookies}`,
  //     },
  //     body: JSON.stringify({ a: 1, b: 'Textual content' }),
  //   });
  //   const myJson = await response.json();

  dispatch({
    type: SAVE_TASK,
  });
  // } catch (err) {
  //   console.log(`Error with saving family TODOs: ${err}\n`);
  // }
};

export const checkTask = (title, checked, i, id, cookies) => async (dispatch) => {
  try {
    console.log('-----------------------');
    console.log('trying FETCH - PUT - CHECK...');
    const response = await fetch('http://134.209.82.36:3000/api/user/todo', {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Cache: 'no-cache',
        credentials: 'same-origin',
        Cookie: `connect.sid=${cookies}`,
      },
      body: JSON.stringify({ goal: title, active: !checked, id }),
    });
    const myJson = await response.json();
    console.log(`Respons on CHECK: ${myJson}`);

    dispatch({
      type: CHECK_TASK,
      index: i,
    });
  } catch (err) {
    console.log(`Error with EDITING family TODOs: ${err}\n`);
  }
};
export const delTask = (i) => (dispatch) => {
  dispatch({
    type: DEL_TASK,
    index: i,
  });
};

export const getFamilyToDo = (cookies) => async (dispatch) => {
  try {
    console.log('-----------------------');
    console.log('trying FETCH - GET...');
    const response = await fetch('http://134.209.82.36:3000/api/family/todo', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Cache: 'no-cache',
        credentials: 'same-origin',
        Cookie: `connect.sid=${cookies}`,
      },
    });
    const myJson = await response.json();
    console.log(`Object.keys(myJson[0]): ${Object.keys(myJson[0])}`);
    // Object.keys(myJson[0]): id,familyName,Todos
    console.log(`Object.keys(myJson[0].Todos): ${Object.keys(myJson[0].Todos)}`);
    console.log(`Object.keys(myJson[0].Todos[0]): ${Object.keys(myJson[0].Todos[0])}\n`);
    const data = myJson[0].Todos;
    dispatch({
      type: GET_FAMILY_TODOS,
      loadedToDo: data,
      loadFamilyID: myJson[0].id,
    });
  } catch (err) {
    console.log(`Error with loading family TODOs: ${err}\n`);
  }
};
