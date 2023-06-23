import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css'],
})
export class ContactDetailComponent implements OnInit {

  @Input() contact!: Contact ;
  id!: string;
  private subscription!: Subscription;
  
  groupContacts: Contact[] = [];
  // contact: Contact = new Contact(
  //   '1',
  //   'R. Kent Jackson',
  //   'jacksonk@byui.edu',
  //   '208-496-3771',
  //   '../../assets/images/jacksonk.jpg',
  //   []
  // );

  constructor(
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: any) => {
        this.id = params['id'];
        this.contact = this.contactService.getContact(this.id);
      }
    );
    this.subscription = this.contactService.contactChangedEvent.subscribe((contacts: Contact[]) => {
      const updatedContact = contacts.find(c => c.id === this.contact.id);
      if (updatedContact && updatedContact.group) {
        this.groupContacts = updatedContact.group.slice();
      }
    });
  }
  onDelete(){
    this.contactService.deleteContact(this.contact);
    this.router.navigateByUrl('/contacts');
  }

}