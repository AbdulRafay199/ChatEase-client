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
import { NgFor } from '@angular/common';
import { TimePipe } from '../../pipes/time/time.pipe';
import { addrecipient } from '../../store/recipient/recipient.action';
import { addchat } from '../../store/chat/chat.action';
import { ChatBoxComponent } from '../chat-box/chat-box.component';
import { ExternalElementService } from '../../services/ExternalElement/external-element.service';

@Component({
  selector: 'app-chat-side-nav',
  standalone: true,
  imports: [RouterModule,InputTextModule,AvatarModule,NgFor,TimePipe],
  templateUrl: './chat-side-nav.component.html',
  styleUrl: './chat-side-nav.component.css',
})
export class ChatSideNavComponent {

router = inject(Router)
store = inject(Store)
authService = inject(AuthService)
convoService = inject(ConversationService)
externalElementService = inject(ExternalElementService)


currentUser : userInterface = {
  userId:0,
  username:"Loading...",
  email:"saim123@gmail.com"
}

conversation : ConvoInterface = [{

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

ngOnInit() {
  this.getdata();
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

setRecipientId(id:number){
  this.authService.GetUserById(id).subscribe(res=>{
    // console.log("userbyId: ",res.users)
    this.store.dispatch(addrecipient({recipientitem:res.users}))
    this.convoService.GetAllMsg(this.currentUser.userId,res.users.id).subscribe(data=>{
      // console.log("chat: ",data.body.messages)
      this.store.dispatch(addchat({chatitem:data.body.messages}))
      this.scrollToBottom();
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

}
