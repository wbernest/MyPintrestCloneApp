'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './usermemes.routes';
const Masonry = require('masonry-layout');
const imagesLoaded = require('imagesloaded');

export class UsermemesComponent {
  memes = [];
  favorites = [];
  me;
  user;

  /*@ngInject*/
  constructor($http, $scope, socket, Auth, $stateParams) {
    'ngInject';
    this.$http = $http;
    this.socket = socket;
    $http.get('/api/users/'+$stateParams.id).then(response => {
      this.user = response.data;
      this.user._id = $stateParams.id;
      this.loadData();
    });
    Auth.getCurrentUser(user => this.me = user);
    imagesLoaded( '.grid', x =>{
      setTimeout(() =>{
        new Masonry('.grid',{      
          itemSelector: '.grid-item'
        });    
      }, 500);
    } )


    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('meme');
      socket.unsyncUpdates('favorite');
    });
  }

  loadData() {
    this.$http.get('/api/favorites')
      .then(response =>{
        this.favorites = response.data.filter(like => like.userid == this.me._id);
        this.mergeLikes();
        this.socket.syncUpdates('favorite', this.favorites, ()=>{
          this.favorites = this.favorites.filter(like => like.userid == this.me._id);
          this.mergeLikes();
        });

    });

    this.$http.get('/api/memes')
      .then(response => {        
        this.memes = response.data.filter(meme => meme.userid == this.user._id);
        this.mergeLikes();
        this.socket.syncUpdates('meme', this.memes, ()=>{
          this.memes = this.memes.filter(meme => meme.userid == this.user._id);

          this.mergeLikes();
          setTimeout(() =>{
            this.msnry = new Masonry('.grid',{      
              itemSelector: '.grid-item'
            });    
          }, 500);    
        });
      });
  }

  mergeLikes(){
    this.memes.map(meme => {
      if(this.favorites.map(like => like.memeid).indexOf(meme._id) >= 0)
        meme.like = true;
      else 
        meme.like = false;
      
      return meme;
    });
  }

  likeMeme(meme){
    this.$http.post('/api/favorites',{
      userid: this.me._id,
      memeid: meme._id
    });
  }

  calculateRemainingHeight(){
    return window.innerHeight 
              - 60  
              - 300
              - document.getElementsByTagName('footer')[0].clientHeight - 50;
  }

}

export default angular.module('myPintrestCloneAppApp.usermemes', [uiRouter])
  .config(routes)
  .component('usermemes', {
    template: require('./usermemes.html'),
    controller: UsermemesComponent,
    controllerAs: 'usermemesCtrl'
  })
  .name;
