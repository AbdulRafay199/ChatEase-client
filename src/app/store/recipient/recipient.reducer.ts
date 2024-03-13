import { createReducer, on } from "@ngrx/store"
import { initialState } from "./recipient.state"
import { addrecipient } from "./recipient.action"

const _RecipientReducer = createReducer(initialState,
    on(addrecipient,(state:any,action:any)=>{return action.recipientitem}),
)

export function RecipientReducer(state: any, action:any){
    return _RecipientReducer(state,action)
}