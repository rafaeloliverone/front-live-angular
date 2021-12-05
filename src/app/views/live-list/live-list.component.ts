import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Live } from 'src/app/shared/model/live.model';
import { LiveService } from 'src/app/shared/services/live.service';

@Component({
  selector: 'app-live-list',
  templateUrl: './live-list.component.html',
  styleUrls: ['./live-list.component.css']
})
export class LiveListComponent implements OnInit {
 
  livesPrevious!: Live[]
  livesNext!: Live[]

  constructor(
    private liveService: LiveService,
    private sanitizer: DomSanitizer
    ) { }

  ngOnInit(): void {
    this.getLives()
    this.livesNext.forEach(x => x.urlSafe)
  }
  
  getLives(){
    this.liveService.getLivesWithFlag('previous').subscribe(data =>{
      this.livesPrevious = data.content
      console.log('Lives anteriores',this.livesPrevious)
      this.livesPrevious.forEach(live =>{
        live.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(live.liveLink)
      })
    })

    this.liveService.getLivesWithFlag('next').subscribe(data =>{
      this.livesNext = data.content
      console.log('Próximas lives',this.livesNext)
      this.livesNext.forEach(live =>{
        live.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(live.liveLink)
      })
    })
  }

}
