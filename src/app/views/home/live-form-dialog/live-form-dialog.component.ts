import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { LiveService } from 'src/app/shared/services/live.service';

@Component({
  selector: 'app-live-form-dialog',
  templateUrl: './live-form-dialog.component.html',
  styleUrls: ['./live-form-dialog.component.css']
})
export class LiveFormDialogComponent implements OnInit {

  public liveForm!: FormGroup

  constructor(
    public fb: FormBuilder,
    public rest: LiveService,
    public dialogRef: MatDialogRef<LiveFormDialogComponent>
  ) { }

  ngOnInit(): void {
    this.liveForm = this.fb.group({
      liveName: ['', [Validators.required]],
      channelName: ['', [Validators.required]],
      liveLink: ['', [Validators.required]],
      liveDate: ['', [Validators.required]],
      liveTime: ['', [Validators.required]]
    })
  }

  cancelar(): void {
    this.dialogRef.close()
    this.liveForm.reset()
  }

  salvar():void {
    this.rest.postLives(this.liveForm.value).subscribe(result =>{})
    this.dialogRef.close()
    this.liveForm.reset()
  }
}
