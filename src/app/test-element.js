import {Element as PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-list/iron-list.js';
import '@polymer/paper-input/paper-input.js';

export class TestElement extends PolymerElement {
  
  // Define a string template instead of a `<template>` element.
  static get template() {
    return `
      <div>This is my [[name]] app.</div>
      <paper-input value="{{paperName}}"></paper-input>
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
    return{
      name: {
        Type: String
      },
      paperName: {
        Type: String,
        notify: true,
        observer: '_paperNameChanged'
      },
      items: {
        Type: Array,
        notify: true
      }
    }
  }

  _paperNameChanged(value) {
    console.log(value);
    var event = new CustomEvent('custom-add', { detail: value });
    document.querySelector('app-root').dispatchEvent(event);
  }
}

customElements.define('test-element', TestElement);