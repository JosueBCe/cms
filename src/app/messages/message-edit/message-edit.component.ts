import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  EventEmitter,
  Output
} from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent {
  currentSender = "Josue"
  @ViewChild('subject', { static: false }) subject: ElementRef | undefined;
  @ViewChild('msgText', { static: false }) msgText: ElementRef | undefined;
  @Output() addMessageEvent = new EventEmitter<Message>();
  constructor() { }

  onSendMessage(){
    const subject = this.subject?.nativeElement.value;
    const msgText = this.msgText?.nativeElement.value;
    const newMsg = new Message(1, subject, msgText ,this.currentSender);
    this.addMessageEvent.emit(newMsg);
  }
  onClear(){
    // this.subject?.nativeElement.value  = null;
    // this.msgText?.nativeElement.value = null;
  }
}
