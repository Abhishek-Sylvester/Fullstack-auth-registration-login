import { Component, signal } from '@angular/core';
import { disabled } from '@angular/forms/signals';
import { RouterOutlet } from '@angular/router';
import { FormsModule  } from '@angular/forms';
import { NgClass, NgStyle,CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  imports: [FormsModule, CommonModule, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  
  
}
