import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-try',
  templateUrl: './try.component.html',
  styleUrls: ['./try.component.scss']
})
export class TryComponent implements OnInit {
  public status = true;
  public weight: number;
  public height: number;
  public bmi: string;

  constructor() { }

  ngOnInit() {
  }

  public calculate(): void {
    this.bmi = (this.weight / this.height / this.height).toFixed(1);
    this.status = false;
  }

}
