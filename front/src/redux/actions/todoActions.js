import {
 SHOW_MODAL, EDIT_INPUT, SAVE_TASK, CHECK_TASK, DEL_TASK, GET_FAMILY_TODOS 
} from '../actionNames/todoTypes';

export const showModal = (needToShow, i, currID) => (dispatch) => {
  dispatch({
    type: SHOW_MODAL,
    bool: needToShow,
    index: i,
    currIDinDB: currID,
  });
};
export const editInput = (txt) => async (dispatch) => {
  dispatch({
    type: EDIT_INPUT,
    text: txt,
  });
};

export const saveTaskNew = (todoLength, title, checked, taskID, cookies) => async (dispatch) => {
  if (todoLength && title.length && taskID >= 0) {
    // edit task - not empty array && there is a new text && editing task ID
    try {
      console.log('-----------------------');
      console.log('trying FETCH - PUT - UPDATE TITLE...');
      console.log(`todoLength: ${todoLength}, title: ${title}, checked: ${checked}, taskID: ${taskID}`);
      const response = await fetch('http://134.209.82.36:3000/api/user/todo', {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Cache: 'no-cache',
          credentials: 'same-origin',
          Cookie: `connect.sid=${cookies}`,
        },
        body: JSON.stringify({
          goal: title,
          active: checked,
          id: taskID,
        }),
      });
      const myJson = await response.json();
      console.log(`Response on UPDATE: ${myJson}`);
      dispatch({
        type: SAVE_TASK,
      });
    } catch (err) {
      console.log(`Error with UPDATE TITLE family TODOs: ${err}\n`);
    }
  }
};

export const saveTask = () => async (dispatch) => {
  dispatch({
    type: SAVE_TASK,
  });
};

export const checkTask = (title, checked, i, taskID, cookies) => async (dispatch) => {
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
      body: JSON.stringify({ goal: title, active: !checked, id: taskID }),
    });
    const myJson = await response.json();
    console.log(`Response on CHECK: ${myJson}`);

    dispatch({
      type: CHECK_TASK,
      index: i,
    });
  } catch (err) {
    console.log(`Error with CHECKING family TODOs: ${err}\n`);
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
