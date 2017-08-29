import {Element as PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-list/iron-list.js';

export class TestElement extends PolymerElement {
  
  // Define a string template instead of a `<template>` element.
  static get template() {
    return `
      <div>This is my [[name]] app.</div>
      <iron-list items="{{items}}" as="item">
        <template>
          <div>
            Name: [[item]]
          </div>
        </template>
      </iron-list>
    `
  }

  constructor() {
    super();
  }

  // properties, observers, etc. are identical to 2.x
  static get properties() {
    name: {
      Type: String
    }
    items: {
      Type: Array;
      notify: true;
    }
  }
}

customElements.define('test-element', TestElement);