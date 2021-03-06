import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './main.routes';
const Masonry = require('masonry-layout');
const imagesLoaded = require('imagesloaded');

export class MainController {
  memes = [];
  favorites = [];
  user;
  /*@ngInject*/
  constructor($http, $scope, socket, Auth) {
    this.$http = $http;
    this.socket = socket;
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

  $onInit() {
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
        this.memes = response.data;
        this.mergeLikes();
        this.socket.syncUpdates('meme', this.memes, ()=>{
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

export default angular.module('myPintrestCloneAppApp.main', [uiRouter])
  .config(routing)
  .component('main', {
    template: require('./main.html'),
    controller: MainController
  })
  .name;
