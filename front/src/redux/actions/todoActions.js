import {
 SHOW_MODAL, EDIT_INPUT, SAVE_TASK, CHECK_TASK, DEL_TASK 
} from '../actionNames/todoTypes';

export const showModal = (i) => (dispatch) => {
  dispatch({
    type: SHOW_MODAL,
    index: i,
  });
};
export const editInput = (txt) => (dispatch) => {
  dispatch({
    type: EDIT_INPUT,
    text: txt,
  });
};
export const saveTask = () => (dispatch) => {
  console.log('in saveTask dispatch');

  dispatch({
    type: SAVE_TASK,
  });
};
export const checkTask = (i) => (dispatch) => {
  dispatch({
    type: CHECK_TASK,
    index: i,
  });
};
export const delTask = (i) => (dispatch) => {
  dispatch({
    type: DEL_TASK,
    index: i,
  });
};

// export {
//  showModal, editInput, saveTask, checkTask, delTask
// };
