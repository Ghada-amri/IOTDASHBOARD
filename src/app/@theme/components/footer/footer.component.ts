import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">Created ♥ by <b><a href="https://www.intercom-technologies.fr/" target="_blank">Intercom Technologies</a></b> 2019</span>
    <div class="socials">
      <a href="https://www.facebook.com" target="_blank" class="ion ion-social-facebook"></a>
      <a href="https://www.twitter.com" target="_blank" class="ion ion-social-twitter"></a>
      <a href="https://www.linkedin.com" target="_blank" class="ion ion-social-linkedin"></a>
    </div>
  `,
})
export class FooterComponent {
}
