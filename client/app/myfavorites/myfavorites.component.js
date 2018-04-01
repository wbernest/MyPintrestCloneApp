'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './myfavorites.routes';
const Masonry = require('masonry-layout');
const imagesLoaded = require('imagesloaded');
import _ from 'lodash';

export class MyfavoritesComponent {
  $http;
  socket;
  me;
  myLikes = [];
  memes = [];
  /*@ngInject*/
  constructor($scope, socket, Auth, $http) {
    'ngInject';
    this.$http = $http;
    this.socket = socket;
    Auth.getCurrentUser(user => this.me = user);

    imagesLoaded( '.grid', x =>{
      setTimeout(() =>{
        this.msnry = new Masonry('.grid',{      
          itemSelector: '.grid-item'
        });    
      }, 500);
    } )

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('favorite');
    });


  }

  $onInit() { 
    this.$http.get('/api/favorites')
      .then(response => {
        this.myLikes = response.data.filter(x=> x.userid == this.me._id);
        this.memes = [];
        _.each( this.myLikes, ( like, index) => {
          this.$http.get('/api/memes/'+like.memeid).then(memeRes =>{
             this.memes.push( memeRes.data);
          });
        });
        this.socket.syncUpdates('favorite', this.myLikes, (res) =>{
          this.memes = [];
          _.each( this.myLikes, ( like, index) => {
            this.$http.get('/api/memes/'+like.memeid).then(memeRes =>{
               this.memes.push( memeRes.data);
            });
          });
            setTimeout(() =>{
            this.msnry = new Masonry('.grid',{      
              itemSelector: '.grid-item'
            });    
          }, 500);    
        });
      });
  }

  removeMeme(meme){
    
    this.$http.delete("/api/favorites/" + this.myLikes[this.myLikes.map(x=> x.memeid).indexOf(meme._id)]._id);

  }

  calculateRemainingHeight(){
    return window.innerHeight 
              - 60  
              - 300
              - document.getElementsByTagName('footer')[0].clientHeight - 50;
  }


}

export default angular.module('myPintrestCloneAppApp.myfavorites', [uiRouter])
  .config(routes)
  .component('myfavorites', {
    template: require('./myfavorites.html'),
    controller: MyfavoritesComponent,
    controllerAs: 'myfavoritesCtrl'
  })
  .name;
