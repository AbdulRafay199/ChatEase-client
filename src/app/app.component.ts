import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { Store } from '@ngrx/store';
import { ConversationService } from './services/conversation/conversation.service';
import { addconvo } from './store/conversation/conversation.action';
import { userInterface } from './store/user/user.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ChatEase';
  
  private hubConnectionBuilder!: HubConnection;

  store = inject(Store)
  chatService = inject(ConversationService)

  currentUser : userInterface = {
    userId:0,
    username:"",
    email:""
  }

  recipient:any = {

  }

  ngOnInit(): void {

    this.store.select('recipient').subscribe(data=>{
      // console.log("recipient store: ", data)
      this.recipient = data
    })

    this.store.select('user').subscribe(data=>{
      this.currentUser = data
    })

    this.hubConnectionBuilder = new HubConnectionBuilder()
      .withUrl('https://localhost:7005/chat')
      .build();
    this.hubConnectionBuilder
      .start()
      .then(() => console.log('Connection started.......!'))
      .catch(err => console.log('Error while connect with server'));

      this.hubConnectionBuilder.on('ReceiveMessage', (body) => {
        // console.log("websockets sending from app: ",body)
        this.getConvo(body.msg);
      });
  }

  getConvo(msg:any){
    const token = localStorage.getItem("token")
    if(this.currentUser.userId == msg.sender || this.currentUser.userId == msg.receiver){
      // console.log("convo get")
      this.chatService.GetConversations(token).subscribe(data=>{
        // console.log("getting convo from websockets: ",data?.body?.conversations)
        this.store.dispatch(addconvo({convoitem: data?.body?.conversations}))
        if(this.currentUser.userId == msg.receiver){
          let audio = new Audio();
          audio.src = "./assets/noti.mp3";
          audio.load();
          audio.play();
        }
      })
    }
  }


}
