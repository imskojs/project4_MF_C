/**
 * Created by Seunghoon Ko on 10/10/2015
 * As part of applicat platform
 *
 * Copyright (C) Applicat (www.applicat.co.kr) & Seunghoon Ko - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Seunghoon Ko <imskojs@gmail.com>, 10/10/2015
 *
 */
//  Dependencies
//ng-file-uploead
//cordovaCamera/
//MessageService
(function(angular) {
  'use strict';

  angular.module('app')
    .factory('Photo', Photo);

  Photo.$inject = [
    '$cordovaCamera', '$window', '$timeout', '$q', '$cordovaFile', '$rootScope', '$ionicModal',
    'SERVER_URL', 'Message', 'Upload'
  ];

  function Photo(
    $cordovaCamera, $window, $timeout, $q, $cordovaFile, $rootScope, $ionicModal,
    SERVER_URL, Message, Upload
  ) {

    var _ = $window._;
    $ionicModal.fromTemplateUrl('state/0Template/ImageCropModal.html', {
        id: '1',
        scope: $rootScope,
        animation: 'instant-slide'
      })
      .then(function(modal) {
        $rootScope.ImageCropModal = modal;
      });

    $rootScope.ImageCropAttribute = {
      sourceImageBase64: '',
      croppedImageBase64: '',
      resultImageSize: 600,
      areaType: 'square',
      aspectRatio: 1
    };

    var service = {
      get: get,
      post: post,
      clean: clean
    };

    return service;

    //====================================================
    //  Photo.get Usage
    //====================================================
    //Usage
    //  Photo.get('camera' || 'gallery', 800, true, 300,'square | circle | rectangle', aspectRatioIfRectangle)
    //Output:
    //  'data:base64, asdfk1jmcl1j등등어쩌구저쩌구'
    function get(sourceType, width, cropTrue, resultImageSize, areaType, aspectRatio) {

      var promise;

      if (sourceType === 'camera') {
        promise = $cordovaCamera.getPicture({
            quality: 50,
            destinationType: $window.Camera.DestinationType.FILE_URI,
            encodingType: $window.Camera.EncodingType.JPEG,
            targetWidth: width || 800,
            correctOrientation: true,
            mediaType: $window.Camera.MediaType.PICTURE,
            cameraDirection: $window.Camera.Direction.BACK,
            sourceType: 1 //camera
          })
          .catch(function(err) {
            console.log("---------- err camera ----------");
            console.log(err);
            return $q.reject({
              message: 'camera'
            });
          });
      } else if (sourceType === 'gallery') {
        promise = pickImage(width)
          .catch(function(err) {
            console.log("---------- err gallery ----------");
            console.log(err);
            return $q.reject({
              message: 'gallery'
            });
          });
      }

      promise = promise
        .then(function(filePath) {
          var name = filePath.substr(filePath.lastIndexOf('/') + 1);
          var namePath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
          return $cordovaFile.readAsDataURL(namePath, name);
        })
        .catch(function(err) {
          console.log("---------- err readAsDataURL ----------");
          console.log(err);
          return $q.reject({
            message: 'readAsDataURL'
          });
        });

      if (cropTrue) {
        $rootScope.ImageCropAttribute.sourceImageBase64 = null;
        $rootScope.ImageCropAttribute.areaType = areaType || 'square';
        $rootScope.ImageCropAttribute.aspectRatio = aspectRatio || 1;
        $rootScope.ImageCropAttribute.resultImageSize = resultImageSize || 600;
        $rootScope.ImageCropModal.show();
        promise = promise
          .then(function(base64) {
            $rootScope.ImageCropAttribute.sourceImageBase64 = base64;
            // $rootScope.ImageCropModal.show();
            var deferred = $q.defer();
            var modalHiddenListenerOff = $rootScope.$on('modal.hidden', function(event, modal) {
              if (modal.id === '1') {
                deferred.resolve($rootScope.ImageCropAttribute.croppedImageBase64);
              } else {
                deferred.reject({
                  message: 'Modal is Hidden but is not ImageCropModal'
                });
              }
            });
            return $q.all([deferred.promise, modalHiddenListenerOff]);
          })
          .then(function(array) {
            var base64 = array[0];
            var modalHiddenListenerOff = array[1];
            modalHiddenListenerOff();
            return base64;
          })
          .catch(function(err) {
            console.log("---------- err ngImgCrop ----------");
            console.log(err);
            return $q.reject({
              message: 'ngImgCrop'
            });
          });
      }

      return promise;

    }

    //====================================================
    //  Photo.post Usage
    //====================================================
    // Usage:
    //Photo.post(
    //  '/place',
    //  { files: ['dataUri:base64', 'dataUri:base64'],
    //    title: '포스트 이름',
    //    content: '냠냠냠'
    //  },
    //  POST
    //)
    //  Promise with with response from server:
    // Output usage:
    //promise
    //  .then(function(createdPlaceWrapper){
    //    console.log(createdPlaceWrapper.data);
    //  })
    //  .catch(function(err){
    //    $q.reject(err);
    //  })
    function post(url, form, method) {
      var form_copy = _.clone(form);
      var filesToSend = [];
      angular.forEach(form_copy.files, function(base64File) {
        if (base64File != null) {
          filesToSend.push(base64ToFile(base64File));
        }
      });
      delete form_copy.files;

      if (url[0] !== '/') {
        url = '/' + url;
      }

      var promise = Upload.upload({
        url: SERVER_URL + url,
        method: method || 'POST',
        file: filesToSend,
        fields: form_copy,
        header: {
          enctype: "multipart/form-data"
        }
      });
      return promise;

    } //end post

    function clean() {
      return $cordovaCamera.cleanup();
    }

    //====================================================
    //  HELPERS
    //====================================================

    function pickImage(width) {
      var deferred = $q.defer();
      $window.imagePicker.getPictures(function(results) {
        deferred.resolve(results[0]);
      }, function(err) {
        deferred.reject(err);
      }, {
        maximumImagesCount: 1,
        width: width || 800,
        height: width || 800
      });
      return deferred.promise;
    }

    function base64ToFile(dataUris) {
      var byteString;
      var mimestring;
      if (dataUris.split(',')[0].indexOf('base64') !== -1) {
        byteString = $window.atob(dataUris.split(',')[1]);
      } else {
        byteString = decodeURI(dataUris.split(',')[1]);
      }
      mimestring = dataUris.split(',')[0].split(':')[1].split(';')[0];
      console.log(mimestring);
      var content = [];
      for (var i = 0; i < byteString.length; i++) {
        content[i] = byteString.charCodeAt(i);
      }
      return new $window.Blob([new $window.Uint8Array(content)], {
        type: mimestring
      });
    }
  } // End
})(angular);
