import { Component, EventEmitter, OnInit, Input, Output, Injectable } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Injectable()
@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
})
export class ContactListComponent implements OnInit {
  
  contacts: Contact[] = [];
  constructor(private contactService: ContactService) { }

  ngOnInit() {
    this.contacts = this.contactService.getContacts();
   }
  onSelected(contact: Contact) {
    this.contactService.contactSelectedEvent.emit(contact);  }
}

