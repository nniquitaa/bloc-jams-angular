(function() {
     function SongPlayer() {
          var SongPlayer = {};

          /**
          * @desc current song object
          * @type {Object}
          **/
          var currentSong = null;

          /**
          * @desc Buzz audio file object
          * @type {Object}
          **/

    
          var currentBuzzObject = null;

          /**
          * @function setSong
          * @desc Stops currently playing song and loads new audio file as currentBuzzObject
          * @param {Object} song
          **/

          var setSong = function(song) {
              if (currentBuzzObject) {
                  currentBuzzObject.stop();
                  currentSong.playing = null;
              }

              currentBuzzObject = new buzz.sound(song.audioUrl, {
                  formats: ['mp3'],
                  preload: true
              });

              currentSong = song;
          };

          /**
          * @function playSong
          * @desc  Plays audio file as currentBuzzObject and sets the .playing property of the object to true
          * @param {Object} song
          **/

          // private function
          var playSong = function(song) {
          // plays current Buzz object!
              currentBuzzObject.play();

          // sets .playing property to true
              song.playing = true;  
          };

          SongPlayer.play = function(song) {
              if (currentSong !== song) {
                 setSong(song);
          // replace two instances of song.playing w/ playSong
          // #1
                 playSong(song);

              } else if (currentSong === song) {
                 if (currentBuzzObject.isPaused()) {
                     playSong(song);
                 }
              }
          };

          SongPlayer.pause = function(song) {
              currentBuzzObject.pause();
              song.playing = false;
          };

          return SongPlayer;
          }


     angular
         .module('blocJams')
         .factory('SongPlayer', SongPlayer);
 })();