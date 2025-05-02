import { NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout2',
  standalone: true,
  imports: [NgClass, NgIf, RouterModule],
  templateUrl: './layout2.component.html',
  styleUrl: './layout2.component.css'
})
export class Layout2Component {
  isCollapsed = true;

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

}
