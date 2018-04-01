'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './meme.events';

var MemeSchema = new mongoose.Schema({
  name: String,
  link: String,
  userid: String,
  username: String
});

registerEvents(MemeSchema);
export default mongoose.model('Meme', MemeSchema);
