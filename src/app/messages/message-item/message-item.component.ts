/* import { Component, Input } from '@angular/core';
import { Contact } from 'src/app/contacts/contact.model';
import { ContactService } from 'src/app/contacts/contact.service';
import { Message } from '../message.model';
@Component({
  selector: 'cms-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css']
})
export class MessageItemComponent {
  messageSender: string = '';
  @Input()
  message!: Message; 
  constructor(private contactService: ContactService) { }
  ngOnInit(){
    const contact: Contact = this.contactService.getContact(this.message?.sender);
    this.messageSender = contact.name
  }
}
 */
/* import { Component, Input } from '@angular/core';
import { Contact } from 'src/app/contacts/contact.model';
import { ContactService } from 'src/app/contacts/contact.service';
import { Message } from '../message.model';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'cms-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css']
})
export class MessageItemComponent {
  messageSender$: Observable<string | undefined> = of(undefined);
  @Input() message!: Message; 

  constructor(private contactService: ContactService) { }

  ngOnInit() {
    const contact: Contact | undefined = this.contactService.getContact(this.message?.sender);
    if (contact) {
      this.messageSender$ = of(contact.name);
    }
  }
} */
/* import { Component, Input } from '@angular/core';
import { Contact } from 'src/app/contacts/contact.model';
import { ContactService } from 'src/app/contacts/contact.service';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css']
})
export class MessageItemComponent {
  @Input() message!: Message;
  messageSender: string | undefined;

  constructor(private contactService: ContactService) { }

  ngOnInit() {
    const contact: Contact | undefined = this.contactService.getContact(this.message?.sender);
    if (contact) {
      this.messageSender = contact.name;
    }
  }
} */
/* import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Contact } from 'src/app/contacts/contact.model';
import { ContactService } from 'src/app/contacts/contact.service';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css']
})
export class MessageItemComponent implements OnChanges {
  @Input() message!: Message;
  messageSender: string | undefined;

  constructor(private contactService: ContactService) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['message'] && changes['message'].currentValue) {
      const contact: Contact | undefined = this.contactService.getContact(this.message?.sender);
      if (contact) {
        this.messageSender = contact.name;
      }
    }
  }
} */
import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Contact } from 'src/app/contacts/contact.model';
import { ContactService } from 'src/app/contacts/contact.service';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css']
})
export class MessageItemComponent implements OnInit {
  @Input() message!: Message;
  messageSender$ = new BehaviorSubject<string>('');

  constructor(private contactService: ContactService) { }

  ngOnInit() {
    const contact: Contact | undefined = this.contactService.getContact(this.message?.sender);
    if (contact) {
      this.messageSender$.next(contact.name);
    }
  }
}