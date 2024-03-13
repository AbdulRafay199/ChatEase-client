import { isDevMode } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { UserReducer } from '../user/user.reducer';
import { ConversationReducer } from '../conversation/conversation.reducer';
import { RecipientReducer } from '../recipient/recipient.reducer';
import { chatReducer } from '../chat/chat.reducer';

export interface State {

}

export const reducers: ActionReducerMap<State> = {
  user:UserReducer,
  conversation:ConversationReducer,
  recipient:RecipientReducer,
  chat:chatReducer
};


export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
