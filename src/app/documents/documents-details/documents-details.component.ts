import { Component, Input, OnInit } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'cms-documents-details',
  templateUrl: './documents-details.component.html',
  styleUrls: ['./documents-details.component.css']
})
export class DocumentsDetailsComponent implements OnInit {
  @Input() document: Document | undefined;
  
  constructor() {}

  ngOnInit(): void {}

}
