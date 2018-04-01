'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './mymemes.routes';
const Masonry = require('masonry-layout');
const imagesLoaded = require('imagesloaded');

export class MymemesComponent {
  /*@ngInject*/
  myMemes;
  me;
  $http;
  socket;
  msnry;
  constructor($scope, socket, Auth, $http, Modal) {
    'ngInject';
    this.modal = Modal.meme.add(x=> console.log(x));
    this.$http = $http;
    this.socket = socket;

    imagesLoaded( '.grid', x =>{
      setTimeout(() =>{
        this.msnry = new Masonry('.grid',{      
          itemSelector: '.grid-item'
        });    
      }, 500);
    } )

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('meme');
    });
    Auth.getCurrentUser(user => this.me = user);
  }

  $onInit() { 
    this.$http.get('/api/memes')
      .then(response => {
        this.myMemes = response.data.filter(x=> x.userid == this.me._id);
        this.socket.syncUpdates('meme', this.myMemes, (res) =>{
          this.myMemes = this.myMemes.filter(x=> x.userid == this.me._id);
          setTimeout(() =>{
            this.msnry = new Masonry('.grid',{      
              itemSelector: '.grid-item'
            });    
          }, 500);    
        });
      });
  }

  removeMeme(meme){
    this.$http.delete("/api/memes/" + meme._id);
  }
  
  calculateRemainingHeight(){
    return window.innerHeight 
              - document.getElementsByTagName('navbar')[0].clientHeight
              - document.getElementsByTagName('banner')[0].clientHeight
              - document.getElementsByTagName('footer')[0].clientHeight - 50;
  }

}

export default angular.module('myPintrestCloneAppApp.mymemes', [uiRouter])
  .config(routes)
  .component('mymemes', {
    template: require('./mymemes.html'),
    controller: MymemesComponent,
    controllerAs: 'mymemesCtrl'
  })
  .name;
