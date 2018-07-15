'use babel';

import LycheeView from './lychee-view';
import { CompositeDisposable } from 'atom';

export default {

  lycheeView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.lycheeView = new LycheeView(state.lycheeViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.lycheeView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'lychee:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.lycheeView.destroy();
  },

  serialize() {
    return {
      lycheeViewState: this.lycheeView.serialize()
    };
  },

  toggle() {
    console.log('Lychee was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
