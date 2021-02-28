import { Component,ViewChild,ElementRef, OnInit} from '@angular/core';
import { ApiService } from './api.service';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { Observable, forkJoin, interval, of } from "rxjs";
import * as _ from 'lodash';
import {
  trigger,
  state,
  style,
  animate,
  transition
  // ...
} from "@angular/animations";
import { ElementFinder } from 'protractor';
declare var Plotly:any;



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger("flyInOut", [
      state("in", style({ transform: "translateX(0)" })),
      transition("void => *", [
        style({ transform: "translateX(-100%)" }),
        animate(200)
      ]),
      transition("* => void", [
        animate(200, style({ transform: "translateX(100%)" }))
      ])
    ])
  ],
  providers:[ApiService]
})


export class AppComponent {

  dataform:FormGroup;
  @ViewChild('chart',{static:false}) el: ElementRef;
  title = 'crud';
  movies=[{title:'hate story'}];
  num=[1,2,3,4];
  selectedmovie;
  showcompo_var:boolean=false;
  name='yes';
  pltx:[];
  plty:[];
  imagevars:boolean[];
  startIndex:number;
  constructor(private api:ApiService,public fb: FormBuilder){
    this.getMovies();
    this.selectedmovie={id:-1,title:'',desc:'',year:0};
    this.dataform=this.fb.group({
      R1:['',[Validators.required]],
      RF:['',[Validators.required]]
    });
  }

  onsubmitform(dataform2){
    console.log(dataform2);
    this.api.getData().subscribe(
      data=>{console.log(data);},
      error=>{console.log(error);}
    );
    this.api.postData().subscribe(
      data=>{console.log(data);},
      error=>{console.log(error);}    
    );
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

  Imagedata = [
    "https://picsum.photos/id/402/2500/1667",
    "https://picsum.photos/id/301/2500/1667",
    "https://picsum.photos/id/302/2500/1667",
    "https://picsum.photos/id/400/2500/1667"
  ];

  ngOnInit() {
    this.imagevars=[true,false,false];
    console.log(this.imagevars);
    this.slideshow();
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}
  
  //image slider3
  slideshow(){
    this.imagevars[0]=true;
    this.imagevars[1]=false;
    this.imagevars[2]=false;
    this.delay(2000);
    this.imagevars[0]=false;
    this.imagevars[1]=true;
    this.imagevars[2]=false;
    this.delay(2000);
    this.imagevars[0]=false;
    this.imagevars[1]=false;
    this.imagevars[2]=true;
    this.delay(2000);
  }
  
  


  /*
  __FunctionSlide() {
    const slides = Array.from(document.getElementsByClassName('mall-show-slide'));
    console.log(slides);
    if (slides === []) {
      this.Repeat();
    }
    for (const x of slides) {
      const y = x as HTMLElement;
      console.log(y);
      y.style.display = 'none';
    }
    if (this.startIndex > slides.length - 1) {
      this.startIndex = 0;
      const slide = slides[this.startIndex] as HTMLElement;
      slide.style.display = 'block';
      this.startIndex++;
    } else {

      const slide = slides[this.startIndex] as HTMLElement;
      slide.style.display = 'block';
      this.startIndex++;
    }
  }*/


  
}
