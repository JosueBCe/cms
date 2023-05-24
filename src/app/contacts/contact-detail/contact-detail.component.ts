import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    )
  }
  onDelete(){
    this.contactService.deleteContact(this.contact);
    this.router.navigateByUrl('/contacts');
  }

}