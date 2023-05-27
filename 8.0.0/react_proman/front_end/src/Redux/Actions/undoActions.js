import * as types from '../Constants/ActionTypes';

export const undoAction = () => ({
  type: types.UNDO_ACTION,
});
export const redoAction = () => ({
  type: types.REDO_ACTION,
});
