import { createAction, props } from "@ngrx/store";

export const newchat = createAction("newchat", props<{newitem: object[]}>())
export const addchat = createAction("addchat", props<{chatitem: object[]}>())