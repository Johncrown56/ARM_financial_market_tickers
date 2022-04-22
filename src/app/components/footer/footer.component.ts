import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  socials?: any;
  logo = "../../../assets/img/logo/arm-logo.png";
  year?: any;

  constructor() { }

  ngOnInit(): void {
    this.year = (new Date()).getFullYear();
    this.socials = {
      whatsApp: "",
      linkedin: "https://www.linkedin.com/",
      facebook: "https://facebook.com/",
      twitter: "https://twitter.com/",
      instagram: "https://instagram.com/",
      youtube: "https://youtube.com/"
    }
  }

}
