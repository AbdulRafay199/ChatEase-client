import { createAction, props } from "@ngrx/store";

export const adduser = createAction("adduser", props<{useritem: object}>())