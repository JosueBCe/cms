import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,  Params, Router } from '@angular/router';
import { WindRefService } from 'src/app/wind-ref.service';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';


@Component({
  selector: 'cms-documents-details',
  templateUrl: './documents-details.component.html',
  styleUrls: ['./documents-details.component.css']
})
export class DocumentsDetailsComponent implements OnInit {
  nativeWindow: any;
  document!: Document ;
  id!: string;  
  constructor(private documentService: DocumentService,
    private route: ActivatedRoute,
    private router: Router,
    private windowRef: WindRefService
    ) {
}


  ngOnInit(){
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.document = this.documentService.getDocument(this.id);
      }
    )
    this.nativeWindow = this.windowRef.getNativeWindow();
  }
  onView(){
    if(this.document.url){
      this.nativeWindow.open(this.document.url);
    }
  }
  onDelete(){
    this.documentService.deleteDocument(this.document);
    this.router.navigate(['/documents']);
  }

}
