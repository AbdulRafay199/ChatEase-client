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

recording: boolean = false;
  recordedAudio!: boolean | string | ArrayBuffer;
  mediaRecorder!: MediaRecorder;
  chunks: Blob[] = [];

  toggleRecording() {
    if (this.recording) {
      this.stopRecording();
    } else {
      this.startRecording();
    }
  }

  async startRecording() {
    try {
      this.recording = true;
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.mediaRecorder = new MediaRecorder(stream);

      this.chunks = [];
      this.mediaRecorder.ondataavailable = (event) => {
        this.chunks.push(event.data);
      };

      this.mediaRecorder.onstop = () => {
        this.recording = false;
        const blob = new Blob(this.chunks, { type: 'audio/wav' });
        this.recordedAudio = window.URL.createObjectURL(blob);
      };

      this.mediaRecorder.start();
    } catch (error) {
      console.error('Error recording audio:', error);
    }
  }

  stopRecording() {
    if (this.mediaRecorder && this.mediaRecorder.state === 'recording') {
      this.mediaRecorder.stop();
      console.log("Audio: ",this.recordedAudio)
    }
  }

}
