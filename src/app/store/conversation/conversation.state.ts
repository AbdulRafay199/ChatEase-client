import {ConvoInterface } from "./conversation.model";

export const initialState : ConvoInterface = [
  {
    conversation:{
      id: 0,
      p1Id:0,
      p2Id: 0,
      lastMessage:"",
      lastActivityTimestamp:""
    },
    otherUserName:""
  }
]