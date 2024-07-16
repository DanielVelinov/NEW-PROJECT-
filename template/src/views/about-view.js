import { CONTAINER_SELECTOR } from "../common/constants.js";
import { q } from "../events/helpers.js";

export const toAboutView = () => {
  q(CONTAINER_SELECTOR).innerHTML = `
    <div id="about">
      <div class="content">
        <h1>About the app</h1>
        <h2>Created by: Daniel Velinov, Ivo Dimitrov, and Stoyan Radichev.</h2>
        <h3>Technologies used</h3>
        <ul>
          <li>JavaScript</li>
          <li>HTML & CSS</li>
          <li>Node.js</li>
        </ul>
        <h4>Contact US</h4>
        <p><a href="www.telerikacademy.com">www.telerikacademy.com</a></p>
      </div>
    </div>
  `;
};
