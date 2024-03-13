import { createReducer, on } from "@ngrx/store"
import { initialState } from "./user.state"
import { adduser } from "./user.action"

const _UserReducer = createReducer(initialState,
    on(adduser,(state:any,action:any)=>{return action.useritem}),
)

export function UserReducer(state: any, action:any){
    return _UserReducer(state,action)
}