import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Live } from '../model/live.model';
import { ResponsePageable } from '../model/responsePageable.model';

@Injectable({
  providedIn: 'root'
})
export class LiveService {

  url = 'https://backend-live-spring.herokuapp.com/lives'
  notificationUrlLives = 'https://microservice-email1.herokuapp.com/sending-email'

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':'application/json'
    })
  }

  constructor(private  httpClient: HttpClient) { }

  public getAllLives():Observable<Live[]>{
    return this.httpClient.get<Live[]>(this.url)
  }

  public getLivesWithFlag(flag: string):Observable<ResponsePageable>{
    return this.httpClient.get<ResponsePageable>(`${this.url}?flag=${flag}`)
  }

  public postLives(live:any):Observable<Live>{
    return this.httpClient.post<any>(this.url,live, this.httpOptions)
  } 

  public postNotification(live: any):Observable<any> {
    console.log(live)
    const text = `Nome da live: ${live.liveName} \n Nome canal: ${live.channelName} \n Link live: ${live.liveLink}`

    const email = {
      "ownerRef": "Cadastro live",
      "emailFrom": "skaterafaf14@gmail.com", 		
      "emailTo": "rafaelbatistacg@gmail.com",
      "subject": "Live cadastrada com sucesso",
      "text": text
    }

    return this.httpClient.post<any>(this.notificationUrlLives, email, this.httpOptions)
  }

}
