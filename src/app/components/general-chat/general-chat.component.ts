import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { FormsModule } from '@angular/forms';
import { AvatarModule } from 'primeng/avatar';

type chatInterface = Array<{
  user: "",
  message:""
}>

@Component({
  selector: 'app-general-chat',
  standalone: true,
  imports: [CommonModule, RouterOutlet,FormsModule,AvatarModule],
  templateUrl: './general-chat.component.html',
  styleUrl: './general-chat.component.css'
})
export class GeneralChatComponent {

  chat : chatInterface = []
  username = ""
  message = ""
  private hubConnectionBuilder!: HubConnection;

  ngOnInit(): void {
    this.hubConnectionBuilder = new HubConnectionBuilder()
      .withUrl('https://localhost:7005/chat')
      .build();
    this.hubConnectionBuilder
      .start()
      .then(() => console.log('Connection started.......!'))
      .catch(err => console.log('Error while connect with server'));
    this.hubConnectionBuilder.on('ReceiveMessage', (user: any, message) => {
      const response = {user:user, message:message}
      this.chat.push(response)
      console.log(response)
    });
}

sendmsg(){
  this.hubConnectionBuilder.invoke('Sendmsg',this.username, this.message).catch((err)=>{
    console.log(err)
  })
}

}
