import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contactListChangedEvent = new Subject<Contact[]>();
  contactSelectedEvent = new EventEmitter<Contact>();
  contactChangedEvent = new EventEmitter<Contact[]>();
  contacts: Contact[] = [];
  maxContactId: number;
  constructor() { 
    this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxId();}

  getContacts(): Contact[] {
    return this.contacts.slice();
  }

  getContact(id: string): Contact {
    for (const contact of this.contacts) {
      if (contact.id === id) {
        return contact;
      }
    }
  return null!;
  }
/*   deleteContact(contact: Contact) {
    if (!contact) {
      return;
    }
    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      return;
    }
    this.contacts.splice(pos, 1);
    this.contactChangedEvent.emit(this.contacts);
  } */
  getMaxId(): number {
    let maxId = 0
    for (const contact of this.contacts) {
      let currentId = parseInt(contact.id)
      if (currentId > maxId) {
        maxId = currentId;
      }

    } return maxId;
  }
  addcontact(newContact: Contact) {
    if (!newContact) {
      return;
    }
    this.maxContactId++;
    newContact.id = this.maxContactId.toString();
    this.contacts.push(newContact);
    let contactListClone = this.contacts.slice();
    this.contactListChangedEvent.next(contactListClone)
  }
  updatecontact(originalcontact: Contact, newcontact: Contact) {
    if (!originalcontact || !newcontact) {
      return;
    }
    const pos = this.contacts.indexOf(originalcontact);
    if (pos < 0) {
      return;
    }
    newcontact.id = originalcontact.id;
    this.contacts[pos] = newcontact;
    let contactListClone = this.contacts.slice();
    this.contactListChangedEvent.next(contactListClone)
  }
  deletecontact(contact: Contact) {
    if (!contact) {
      return;
    }
    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      return;
    }
    this.contacts.splice(pos, 1);
    let contactListClone = this.contacts.slice();
    this.contactListChangedEvent.next(contactListClone)
  }

}
