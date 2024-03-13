import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AvatarModule } from 'primeng/avatar';
import { ConversationService } from '../../services/conversation/conversation.service';
import { userInterface } from '../../store/user/user.model';
import { ChatInterface } from '../../store/chat/chat.model';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { TimePipe } from '../../pipes/time/time.pipe';
import { ExternalElementService } from '../../services/ExternalElement/external-element.service';
import { FormsModule } from '@angular/forms';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { newchat } from '../../store/chat/chat.action';
import { addconvo } from '../../store/conversation/conversation.action';

@Component({
  selector: 'app-chat-box',
  standalone: true,
  imports: [AvatarModule,NgFor,NgIf,NgClass,TimePipe,FormsModule],
  templateUrl: './chat-box.component.html',
  styleUrl: './chat-box.component.css'
})
export class ChatBoxComponent implements OnInit {

  store = inject(Store)
  chatService = inject(ConversationService)
  externalElementService = inject(ExternalElementService)

  private hubConnectionBuilder!: HubConnection;

  @ViewChild('chatContainer') chatContainer!: ElementRef;

  ngAfterViewInit() {
    this.externalElementService.externalElement = this.chatContainer;
  }

  currentUser : userInterface = {
    userId:0,
    username:"",
    email:""
  }

  recipient:any = {

  }

  chat : ChatInterface =[
    {id: 2, sender: 1, receiver: 2, msg: 'How are you aman?', timestamp: '2024-03-11T20:48:24.407'}
  ]

  body={
    id: 0,
    sender: 0,
    receiver: 0,
    msg: "",
  }

  ngOnInit(): void {
    this.hubConnectionBuilder = new HubConnectionBuilder().withUrl('https://localhost:7005/chat').build();
    this.hubConnectionBuilder.start().then(() => console.log('Connection started.......!')).catch(err => console.log('Error while connect with server'));

    this.store.select('recipient').subscribe(data=>{
      // console.log("recipient store: ", data)
      this.recipient = data
    })

    this.store.select('user').subscribe(data=>{
      this.currentUser = data
    })

    this.store.select('chat').subscribe(data=>{
      // console.log("chat store: ", data)
      this.chat = data
    })

    this.hubConnectionBuilder.on('ReceiveMessage', (body) => {
      if((body.msg.sender == this.currentUser.userId || body.msg.sender == this.recipient.id) && (body.msg.receiver == this.currentUser.userId || body.msg.receiver == this.recipient.id)){
        this.store.dispatch(newchat({newitem:body.msg}))
        this.scrollToBottom();
      }
    });
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

  sendmsg(){
    this.body={
      ...this.body,
      sender: this.currentUser.userId,
      receiver: this.recipient.id,
    }
    this.chatService.SendMsg(this.body).subscribe(res=>{
      if(res.body){
        this.body.msg = ""
        this.hubConnectionBuilder.invoke('Sendmsg',res.body).catch((err)=>{
          console.log(err)
        })
      }
    })
  }

}
