import { Component,ViewChild,ElementRef } from '@angular/core';
import { ApiService } from './api.service';
import * as _ from 'lodash';
declare var Plotly:any;



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[ApiService]
})
export class AppComponent {

  @ViewChild('chart',{static:false}) el: ElementRef;
  title = 'crud';
  movies=[{title:'hate story'}];
  num=[1,2,3,4];
  selectedmovie;
  showcompo_var:boolean=false;
  name='yes';
  pltx:[];
  plty:[];
  constructor(private api:ApiService){
    this.getMovies();
    this.selectedmovie={id:-1,title:'',desc:'',year:0};
  }
  getMovies = () =>{
    this.api.getAllMovies().subscribe(
      data=>{
        this.movies=data;
        console.log(data);
      },
      error=>{
        console.log(error);
      }
    )
  }
  movieClicked(movie){
    console.log(movie.id);
    this.api.getOneMovie(movie.id).subscribe(
      data=>{
        console.log(data);
        this.selectedmovie=data;
      },
      error=>{
        console.log(error);
      }
    )
  }
  updateMovie(){
    this.api.updateMovie(this.selectedmovie).subscribe(
      _data=>{
        this.getMovies();
      },
      error=>{
        console.log(error);
      }
    )
  }
  createMovie(){
    this.api.createMovie(this.selectedmovie).subscribe(
      data=>{
        this.movies.push(data);
      },
      error=>{
        console.log(error);
      }
    )
  }
  deleteMovie(){
    this.api.deleteMovie(this.selectedmovie.id).subscribe(
      _data=>{
        this.getMovies();
      },
      error=>{
        console.log(error);
      }
    )
  }
  simulate(){
    this.api.simulateplot().subscribe(
      data=>{
        //this.movies.push(data);
        console.log(data);
      },
      error=>{
        console.log(error);
      }
    )
  }

  showplot(){
    this.api.showplot().subscribe(
      data=>{
        //this.movies.push(data);
        console.log(data);
        this.pltx=data[0].x.split(',');
        this.plty=data[0].y.split(',');
        console.log(this.pltx,this.plty);
        this.basicChart(this.pltx,this.plty);
      },
      error=>{
        console.log(error);
      }
    )
  }
  showcompo(){
    this.showcompo_var=true;
  }
  basicChart(xa:string[],ya:string[]){
    const element=this.el.nativeElement
    //console.log(xa,ya);
    var xlst:number[]=new Array();
    var ylst:number[]=new Array();
    //xlst.push(5);
    console.log(xa.length);
    for (let i = 0; i < xa.length; i++) {
      xlst.push(parseInt(xa[i],10));
      ylst.push(parseInt(ya[i],10));
    }
    console.log(xlst,ylst);
    const data=[{
      x:xlst,
      y:ylst
    }]
    const style={
      margin:{ t:0}
    }
  Plotly.plot(element,data,style)
  }

  topoChart(data: any){
    const element=this.el.nativeElement
    const formattedData=[{
      z:data,
      type:'surface'
    }];
    const layout={
      title:'Mt',
      autosize: false,
      width: 750,
      height:500,
      margin:{
        l:65,
        r:50,
        b:65,
        t:90
      }
    };
    Plotly.plot(element,data,layout);
  }
  
}
