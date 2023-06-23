import { EventEmitter, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documentSelectedEvent = new EventEmitter<Document>();
  documentChangedEvent = new EventEmitter<Document[]>();
  documentListChangedEvent = new Subject<Document[]>();
  documents: Document[] = [];
  maxDocumentId!: number;
  private documentsUrl = 'https://mean-stack-48dee-default-rtdb.firebaseio.com/documents.json';


  constructor(private http: HttpClient) {
    
    this.getDocuments().subscribe(
      (documents: Document[]) => {
        this.documents = documents;
        this.maxDocumentId = this.getMaxId();
        this.sortDocuments();
        this.documentListChangedEvent.next(this.documents.slice());
      },
      (error: any) => {
        console.log(error);
      }
    );

  }

  getDocuments(): Observable<Document[]> {
    return this.http.get<Document[]>(this.documentsUrl);
  }

 getMaxId(): number {
    let maxId = 0
    for (const document of this.documents) {
      let currentId = parseInt(document.id)
      if (currentId > maxId) {
        maxId = currentId;
      }

    } return maxId;
  }


  private sortDocuments() {
    this.documents.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      } else if (a.name > b.name) {
        return 1;
      } else {
        return 0;
      }
    });
  }

 
  getDocument(id: string): Document {
    for (let document of this.documents) {
      if (document.id === id) {
        return document;
      }
    }
    return null!;
  }


 storeDocuments() {
  const documents = this.documents.slice();
  const headers = new HttpHeaders({'Content-Type': 'application/json'});
  this.http.put(this.documentsUrl, documents, {headers: headers})
    .subscribe(
      () => {
        this.documentListChangedEvent.next(documents.slice());
      },
      (error: any) => {
        console.log(error);
      }
    );
}

addDocument(newDocument: Document) {
  if (!newDocument) {
    return;
  }
  this.maxDocumentId++;
  newDocument.id = this.maxDocumentId.toString();
  this.documents.push(newDocument);
  this.storeDocuments();
}

updateDocument(originalDocument: Document, newDocument: Document) {
  if (!originalDocument || !newDocument) {
    return;
  }
  const pos = this.documents.indexOf(originalDocument);
  if (pos < 0) {
    return;
  }
  newDocument.id = originalDocument.id;
  this.documents[pos] = newDocument;
  this.storeDocuments();
}

deleteDocument(document: Document) {
  if (!document) {
    return;
  }
  const pos = this.documents.indexOf(document);
  if (pos < 0) {
    return;
  }
  this.documents.splice(pos, 1);
  this.storeDocuments();
}



 // constructor() {
  //   this.documents = MOCKDOCUMENTS;
  //   this.maxDocumentId = this.getMaxId();
  // }
  // getDocuments(): Document[] {
  //   return this.documents.slice();
  // }

  // addDocument(newDocument: Document) {
  //   if (!newDocument) {
  //     return;
  //   }
  //   this.maxDocumentId++;
  //   newDocument.id = this.maxDocumentId.toString();
  //   this.documents.push(newDocument);
  //   let documentListClone = this.documents.slice();
  //   this.documentListChangedEvent.next(documentListClone)
  // }
  // updateDocument(originalDocument: Document, newDocument: Document) {
  //   if (!originalDocument || !newDocument) {
  //     return;
  //   }
  //   const pos = this.documents.indexOf(originalDocument);
  //   if (pos < 0) {
  //     return;
  //   }
  //   newDocument.id = originalDocument.id;
  //   this.documents[pos] = newDocument;
  //   let documentListClone = this.documents.slice();
  //   this.documentListChangedEvent.next(documentListClone)
  // }
  // deleteDocument(document: Document) {
  //   if (!document) {
  //     return;
  //   }
  //   const pos = this.documents.indexOf(document);
  //   if (pos < 0) {
  //     return;
  //   }
  //   this.documents.splice(pos, 1);
  //   let documentListClone = this.documents.slice();
  //   this.documentListChangedEvent.next(documentListClone)
  // }

}
