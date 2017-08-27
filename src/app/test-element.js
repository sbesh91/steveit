import {Element as PolymerElement} from '@polymer/polymer/polymer-element.js';

export class TestElement extends PolymerElement {
  
  // Define a string template instead of a `<template>` element.
  static get template() {
    return `<div>This is my [[name]] app.</div>`
  }

  constructor() {
    super();
  }

  // properties, observers, etc. are identical to 2.x
  static get properties() {
    name: {
      Type: String
    }
  }
}

customElements.define('test-element', TestElement);