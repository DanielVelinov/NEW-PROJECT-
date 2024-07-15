import { CONTAINER_SELECTOR } from "../common/constants.js";
import { q } from "../events/helpers.js";

export const toAboutView = () => {
  q(CONTAINER_SELECTOR).innerHTML = `
<div id="about">
  <div class="content">
    <h1>About the app</h1>
    <h2>Authors: Telerik Academy</h2>
    <h2>Date: 2021</h2>
  </div>
</div>
`
};
// TODO