import { createAction, props } from "@ngrx/store";

export const addconvo = createAction("addconvo", props<{convoitem: object[]}>())