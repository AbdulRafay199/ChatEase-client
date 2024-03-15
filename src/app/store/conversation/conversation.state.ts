import {ConvoInterface } from "./conversation.model";

export const initialState : ConvoInterface = [
  {
    id: 0,
    p1Id:0,
    p2Id: 0,
    p1LastMessages: [],
    p2LastMessages: [],
    lastMessage:"",
    lastActivityTimestamp:"",
    otherUserName:""
  }
]