import { createReducer, on } from "@ngrx/store"
import { initialState } from "./chat.state"
import { addchat, newchat } from "./chat.action"

const _chatReducer = createReducer(initialState,
    on(addchat,(state:any,action:any)=>{return action.chatitem}),
    on(newchat,(state:any,action:any)=>{return [...state, action.newitem]}),
)

export function chatReducer(state: any, action:any){
    return _chatReducer(state,action)
}