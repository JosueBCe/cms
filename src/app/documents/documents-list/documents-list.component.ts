import { Component, Output, EventEmitter, Injectable, OnInit } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Injectable()
@Component({
  selector: 'cms-documents-list',
  templateUrl: './documents-list.component.html',
  styleUrls: ['./documents-list.component.css']
})
export class DocumentsListComponent implements OnInit {

  documents: Document[] = [ ];

  constructor(private documentService: DocumentService) { }

  ngOnInit() {
      this.documents = this.documentService.getDocuments();
      this.documentService.documentChangedEvent.subscribe(
        (documents: Document[]) => {
          this.documents = documents;
        }
      )
  }

  

}
