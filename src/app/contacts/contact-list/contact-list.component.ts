import { Component, EventEmitter, OnInit, Input, Output, Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Injectable()
@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
})
export class ContactListComponent implements OnInit {
  term: string = '';
  contacts: Contact[] = [];
  private subscription!: Subscription;
  constructor(private contactService: ContactService) { }

  ngOnInit() {
    //this.contacts = this.contactService.getContacts();
    this.subscription = this.contactService.contactListChangedEvent.subscribe(
      (contacts: Contact[]) => {
        this.contacts = contacts;
      }
    )
    this.contactService.contactChangedEvent.subscribe(
      (contacts: Contact[]) => {
        this.contacts = contacts;
      }
    )

  }
  
search(value: string) {

  this.term = value;
  
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  onSelected(contact: Contact) {
    this.contactService.contactSelectedEvent.emit(contact);
  }
}


