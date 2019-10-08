import {
 SHOW_MODAL, EDIT_INPUT, SAVE_TASK, CHECK_TASK, DEL_TASK 
} from '../actionNames/todoTypes';

const initialState = {
  list: [],
  isVisibleNewTask: false,
  newTaskTitle: '',
  editTaskID: -1,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SHOW_MODAL: {
      if (action.index >= 0) {
        return {
          ...state,
          newTaskTitle: state.list[action.index].title,
          editTaskID: action.index,
          isVisibleNewTask: true,
        };
      }
      return {
        ...state,
        newTaskTitle: '',
        editTaskID: -1,
        isVisibleNewTask: true,
      };
    }

    case EDIT_INPUT: {
      console.log('-----------------------');
      console.log(`Object.keys(state): ${Object.keys(state)}`);
      console.log(`state.list: ${state.list}`);
      console.log(`action.type: ${action.type}`);
      console.log(`action.text: ${action.text}`);
      return { ...state, newTaskTitle: action.text };
    }

    case SAVE_TASK: {
      let newList;
      console.log('-----------------------');
      console.log('onSaveNewTask - before setState:');
      console.log(`state.list.length: ${state.list.length}`);
      console.log(`state.newTaskTitle.length: ${state.newTaskTitle.length}`);
      console.log(`state.editTaskID: ${state.editTaskID}`);
      console.log(`typeof state.editTaskID: ${typeof state.editTaskID}\n`);

      if (state.list.length && state.newTaskTitle.length && state.editTaskID >= 0) {
        console.log(`Edit - state.editTaskID: ${state.editTaskID}`);
        // edit task - not empty array && there is a new text && editing task ID
        newList = state.list;
        newList[state.editTaskID].title = state.newTaskTitle;
        return {
          ...state,
          list: newList,
          editTaskID: -1,
          newTaskTitle: '',
          isVisibleNewTask: false,
        };
      }
      if (state.list.length && state.newTaskTitle.length && !(state.editTaskID >= 0)) {
        console.log(`Not empty array - state.editTaskID: ${state.editTaskID}`);
        // adding new task - not empty array && there is a new text && not editing task ID
        return {
          ...state,
          list: [...state.list, { title: state.newTaskTitle, checked: false }],
          newTaskTitle: '',
          editTaskID: -1,
          isVisibleNewTask: false,
        };
      }
      if (state.newTaskTitle.length) {
        console.log(`Empty array - state.newTaskTitle.length: ${state.newTaskTitle.length}`);
        // adding new task (first task) - empty array && not editing task ID
        return {
          ...state,
          list: [{ title: state.newTaskTitle, checked: false }],
          newTaskTitle: '',
          editTaskID: -1,
          isVisibleNewTask: false,
        };
      }
      return { ...state, isVisibleNewTask: false };
    }

    case CHECK_TASK: {
      const newList = state.list;
      newList[action.index].checked = !newList[action.index].checked;
      return { ...state, list: newList };
    }

    case DEL_TASK: {
      return {
        ...state,
        list: state.list.filter((task, index) => index !== action.index),
      };
    }

    default:
      return state;
  }
}
