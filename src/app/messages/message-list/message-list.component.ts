import { Component } from '@angular/core';
import { Message } from '../message.model';
@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent {

  messages: Message[] = [
    new Message(2, 'Hello', 'How are you?', 'Jane'),
    new Message(3, 'Meeting', 'Don\'t forget the meeting tomorrow', 'Bob'),
    new Message(4, 'Vacation', 'I\'m going on vacation next week', 'John')
  ];
  onAddMessage(message: Message){
    this.messages.push(message);
  }


}
