import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseurl="http://127.0.0.1:8000";
  
  httpHeaders=new HttpHeaders({'Content-Type':'application/json'});
  constructor(private http: HttpClient) { }

  getAllMovies(): Observable<any>{
    return this.http.get(this.baseurl+'/movies/',{headers:this.httpHeaders});
  }

  getOneMovie(id): Observable<any>{
    return this.http.get(this.baseurl+'/movies/'+id+'/',{headers:this.httpHeaders});
  }
  updateMovie(movie): Observable<any>{
    const body={title:movie.title,desc:movie.desc,year:movie.year};
    return this.http.put(this.baseurl+'/movies/'+movie.id+'/',body,{headers:this.httpHeaders});
  }
  createMovie(movie): Observable<any>{
    const body={title:movie.title,desc:movie.desc,year:movie.year};
    return this.http.post(this.baseurl+'/movies/',body,{headers:this.httpHeaders});
  }
  deleteMovie(id): Observable<any>{
    return this.http.delete(this.baseurl+'/movies/'+id+'/',{headers:this.httpHeaders});
  }
  simulateplot(): Observable<any>{
    return this.http.get(this.baseurl+'/printdata/',{headers:this.httpHeaders});
  }
  showplot(): Observable<any>{
    return this.http.get(this.baseurl+'/outputplot/',{headers:this.httpHeaders});
  }
  getData():Observable<any>{
    return this.http.get("https://angulardeploy-test.herokuapp.com/outputplot/",{headers:this.httpHeaders});
  }
  postData():Observable<any>{
    const body={id:8,x:"say"};
    return this.http.post("https://angulardeploy-test.herokuapp.com/outputplot/",body,{headers:this.httpHeaders});
  }
}
