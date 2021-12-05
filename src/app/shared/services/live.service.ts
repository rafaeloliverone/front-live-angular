import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Live } from '../model/live.model';
import { ResponsePageable } from '../model/responsePageable.model';

@Injectable({
  providedIn: 'root'
})
export class LiveService {

  url = 'http://localhost:8080/lives'
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
}
