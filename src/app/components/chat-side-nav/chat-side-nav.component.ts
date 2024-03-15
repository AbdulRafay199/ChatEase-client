import { Component, ViewChild, inject } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { AvatarModule } from 'primeng/avatar';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from '../../services/auth/auth.service';
import { adduser } from '../../store/user/user.action';
import { userInterface } from '../../store/user/user.model';
import { ConversationService } from '../../services/conversation/conversation.service';
import { addconvo } from '../../store/conversation/conversation.action';
import { ConvoInterface } from '../../store/conversation/conversation.model';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { TimePipe } from '../../pipes/time/time.pipe';
import { addrecipient } from '../../store/recipient/recipient.action';
import { addchat } from '../../store/chat/chat.action';
import { ExternalElementService } from '../../services/ExternalElement/external-element.service';
import { DialogModule } from 'primeng/dialog';
import { BadgeModule } from 'primeng/badge';

type allUserInterface = Array<{
  id:0,
  name:'',
  email:''
}>

@Component({
  selector: 'app-chat-side-nav',
  standalone: true,
  imports: [RouterModule,InputTextModule,AvatarModule,NgFor,TimePipe,DialogModule,NgClass,BadgeModule,NgIf],
  templateUrl: './chat-side-nav.component.html',
  styleUrl: './chat-side-nav.component.css',
})
export class ChatSideNavComponent {

router = inject(Router)
store = inject(Store)
authService = inject(AuthService)
convoService = inject(ConversationService)
externalElementService = inject(ExternalElementService)

getAvatarColor(id: number): string {
  const colors = [
    '#2196F3', '#4CAF50', '#FF5722', '#9C27B0', '#FF9800',
    '#00BCD4', '#673AB7', '#FFC107', '#8BC34A', '#FF4081',
    '#03A9F4', '#E91E63', '#CDDC39', '#FF5252', '#9E9E9E',
    '#00ACC1', '#F44336', '#FFEB3B', '#3F51B5', '#795548',
    '#8E24AA', '#009688', '#FF7043', '#607D8B', '#9C27B0'
  ];
  const index = id % colors.length;
  return colors[index];
}

allUsers : allUserInterface = [
  {id:0,name:'',email:''}
]

currentUser : userInterface = {
  userId:0,
  username:"Loading...",
  email:"saim123@gmail.com"
}

conversation : ConvoInterface = [{
  id: 0,
  p1Id:0,
  p2Id: 0,
  p1LastMessages:[],
  p2LastMessages:[],
  lastMessage:"",
  lastActivityTimestamp:"",
  otherUserName:""
}
]

ngOnInit() {
  this.getdata();
  this.getallusers();
}

getallusers(){
  this.authService.GetAllUsers().subscribe(res=>{
    console.log(res.body.users)
    this.allUsers = res.body.users
  })
}

getdata(){
  const token = localStorage.getItem("token")
  this.authService.GetUserDetails(token).subscribe(data=>{
    this.store.dispatch(adduser({useritem: data?.body}))
    this.store.select('user').subscribe(result=>{
      // console.log("user store",result)
      this.currentUser = result
      this.getConvo();
    })
  })
}

getConvo(){
  const token = localStorage.getItem("token")
  this.convoService.GetConversations(token).subscribe(data=>{
    this.store.dispatch(addconvo({convoitem: data?.body?.conversations}))
    this.store.select('conversation').subscribe(result=>{
      // console.log("result: ",result)
      this.conversation = result
    })
  })
}

setRecipientId(id:number,convoid:number){
  this.authService.GetUserById(id).subscribe(res=>{
    // console.log("userbyId: ",res.users)
    this.store.dispatch(addrecipient({recipientitem:res.users}))
    this.convoService.GetAllMsg(this.currentUser.userId,res.users.id).subscribe(data=>{
      // console.log("chat: ",data.body.messages)
      this.store.dispatch(addchat({chatitem:data.body.messages}))
      this.scrollToBottom();
      if(convoid!=0){
        const token = localStorage.getItem('token') || ''
        this.convoService.readMsgs(convoid,token).subscribe(res=>{
          this.getConvo();
        })
      }
    })
  })

}

scrollToBottom(): void {
  try {
    setTimeout(() => { 
      const externalElement = this.externalElementService.externalElement;
      // console.log(externalElement)
        if (externalElement) {
          externalElement.nativeElement.scrollTop = externalElement.nativeElement.scrollHeight;
          // console.log("scroll: ",externalElement.nativeElement.scrollTop)
        } else {
          console.log('External element reference is not available.');
        }
    }, 100);
  } catch(err) { }
}

logout(){
  localStorage.removeItem("token")
  this.router.navigateByUrl("/login")
}

visible: boolean = false;

showDialog() {
    this.visible = true;
}

hideDialog() {
    this.visible = false;
}

SetNotifyStyle(each: any){
  const status = this.checkUnreadMsg(each);
  if(status){
    return 'fw-bold text-dark'
  }
  else{
    return ''
  }
}

getUnreadMsgLength(each:any){
  if(this.currentUser.userId==each.p1Id){
    return each.p1LastMessages.length.toString()
  }
  else{
    return each.p2LastMessages.length.toString()
  }
}

checkUnreadMsg(each:any){
  if(this.currentUser.userId==each.p1Id){
    if(each.p1LastMessages.length>0){
      return true
    }
    else{
      return false
    }
  }
  else{
    if(each.p2LastMessages.length>0){
      return true
    }
    else{
      return false
    }
  }
}

}
