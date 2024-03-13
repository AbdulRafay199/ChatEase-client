import { createReducer, on } from "@ngrx/store"
import { initialState } from "./conversation.state"
import { addconvo } from "./conversation.action"

const _ConversationReducer = createReducer(initialState,
    on(addconvo,(state:any,action:any)=>{return action.convoitem}),
)

export function ConversationReducer(state: any, action:any){
    return _ConversationReducer(state,action)
}