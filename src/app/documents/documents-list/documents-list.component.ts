import { Component, Output, EventEmitter } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'cms-documents-list',
  templateUrl: './documents-list.component.html',
  styleUrls: ['./documents-list.component.css']
})
export class DocumentsListComponent {

  documents: Document[] = [
    new Document(
      1,
      'Document 1',
      'This is the first document',
      'https://example.com/documents/1',[]
    ),
    new Document(
      2,
      'Document 2',
      'This is the second document',
      'https://example.com/documents/2',[]
    ),
    new Document(
      3,
      'Document 3',
      'This is the third document',
      'https://example.com/documents/3',[]
    ),
    new Document(
      4,
      'Document 4',
      'This is the fourth document',
      'https://example.com/documents/4',[]
    ),
    new Document(
      5,
      'Document 5',
      'This is the fifth document',
      'https://example.com/documents/5',[]
    )
  ];

  @Output() selectedDocumentEvent = new EventEmitter<Document>();
  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }

}
