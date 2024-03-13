import { Component, OnInit, inject } from '@angular/core';
import { ChatBoxComponent } from "../chat-box/chat-box.component";
import { ChatSideNavComponent } from "../chat-side-nav/chat-side-nav.component";
import { Store } from '@ngrx/store';
import { ChatInterface } from '../../store/chat/chat.model';
import { NgIf } from '@angular/common';
import { NoChatComponentComponent } from "../no-chat-component/no-chat-component.component";

@Component({
    selector: 'app-chat-container',
    standalone: true,
    templateUrl: './chat-container.component.html',
    styleUrl: './chat-container.component.css',
    imports: [ChatBoxComponent, ChatSideNavComponent, NgIf, NoChatComponentComponent]
})
export class ChatContainerComponent implements OnInit {

    store = inject(Store)
    totalChats = 0

    ngOnInit(): void {
        this.store.select('chat').subscribe(data=>{
            this.totalChats = data.length
            console.log(this.totalChats)
        })
    }

}
