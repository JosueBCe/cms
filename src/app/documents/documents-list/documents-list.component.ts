import { Component, Output, EventEmitter, Injectable, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Injectable()
@Component({
  selector: 'cms-documents-list',
  templateUrl: './documents-list.component.html',
  styleUrls: ['./documents-list.component.css']
})
export class DocumentsListComponent implements OnInit {
  private subscription!: Subscription;
  documents: Document[] = [];

  constructor(private documentService: DocumentService) { }

  ngOnInit() {
    // this.documents = this.documentService.getDocuments();
    this.subscription = this.documentService.documentListChangedEvent.subscribe(
      (documents: Document[]) => {
        this.documents = documents;
        
      }
    )
 /*    this.documentService.documentChangedEvent.subscribe(
      (documents: Document[]) => {
        this.documents = documents;
      }
    ) */
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
