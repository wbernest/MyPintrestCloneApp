/**
 * Meme model events
 */

'use strict';

import {EventEmitter} from 'events';
var MemeEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
MemeEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Meme) {
  for(var e in events) {
    let event = events[e];
    Meme.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc) {
    MemeEvents.emit(event + ':' + doc._id, doc);
    MemeEvents.emit(event, doc);
  };
}

export {registerEvents};
export default MemeEvents;
