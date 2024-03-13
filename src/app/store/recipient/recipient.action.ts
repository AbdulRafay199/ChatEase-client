import { createAction, props } from "@ngrx/store";

export const addrecipient = createAction("addrecipient", props<{recipientitem: object}>())