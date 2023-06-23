/* import { Component } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';
@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent {

  messages: Message[] = [];
  constructor(private messageService: MessageService) { }

  ngOnInit() {
    //this.messages = this.messageService.getMessages();
    this.messageService.messageChangedEvent 
      .subscribe(
        (messages: Message[]) => {
          this.messages = messages;
        }
      );
  }
  onAddMessage(message: Message){
    this.messages.push(message);
  }


}
 */
/* import { Component } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent {
  messages: Message[] = [];

  constructor(private messageService: MessageService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe((data: Data) => {
      this.messages = data['messages'];
      this.messageService.setMessages(this.messages);
    });
  }

  onAddMessage(message: Message) {
    this.messages.push(message);
  }
} */
/* import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [];

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(
      (data: Data) => {
        this.messages = data['messages'];
      }
    );
  }
   onAddMessage(message: Message) {
    this.messages.push(message);
  }
} */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [];

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.messages = this.route.snapshot.data['messages'];
  }
  onAddMessage(message: Message) {
    this.messages.push(message);
  }
}