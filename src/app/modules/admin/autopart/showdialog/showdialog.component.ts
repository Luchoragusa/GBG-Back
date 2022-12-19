import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  type: 'image' | 'description';
  data: string;
}
  

@Component({
  selector: 'app-showdialog',
  templateUrl: './showdialog.component.html',
  styleUrls: ['./showdialog.component.scss']
})
export class ShowdialogComponent implements OnInit {

  constructor(
    @Inject (MAT_DIALOG_DATA) public data: DialogData, 
  ) { }

  ngOnInit(): void {

  }

  isImage(): boolean {
    return this.data.type === 'image';
  }
}
