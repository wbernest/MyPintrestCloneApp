'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './favorite.events';

var FavoriteSchema = new mongoose.Schema({
  userid: String,
  memeid: String
});

registerEvents(FavoriteSchema);
export default mongoose.model('Favorite', FavoriteSchema);
