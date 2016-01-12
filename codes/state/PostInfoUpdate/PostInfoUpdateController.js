(function() {
  'use strict';
  angular.module('app')
    .controller('PostInfoUpdateController', PostInfoUpdateController);

  PostInfoUpdateController.$inject = [
    '$scope', '$state', '$q',
    'PostInfoModel', 'PostInfoUpdateModel', 'U', 'Post', 'Preload', 'Message'
  ];

  function PostInfoUpdateController(
    $scope, $state, $q,
    PostInfoModel, PostInfoUpdateModel, U, Post, Preload, Message
  ) {
    var PostInfoUpdate = this;
    PostInfoUpdate.Model = PostInfoUpdateModel;
    $scope.$on('$ionicView.beforeEnter', onBeforeEnter);
    $scope.$on('$ionicView.afterEnter', onAfterEnter);
    $scope.$on('$ionicView.beforeLeave', onBeforeLeave);

    PostInfoUpdate.sendForm = sendForm;
    //====================================================
    //  Implementation
    //====================================================
    function onBeforeEnter() {
      U.loading(PostInfoUpdateModel);
    }

    function onAfterEnter() {
      return findOnePost()
        .then(function(post) {
          U.bindData(post, PostInfoUpdateModel, 'form');
        })
        .catch(function(err) {
          U.error(err);
        });
    }

    function onBeforeLeave() {
      PostInfoUpdateModel.form = {
        title: '',
        content: ''
      };
    }

    function sendForm() {
      Message.loading();
      return updatePost()
        .then(function(updatedPost) {
          console.log("---------- updatedPost ----------");
          console.log(updatedPost);
          return Message.alert('글 수정 알림', '글수정을 완료하였습니다.');
        })
        .then(function() {
          U.goToState('Main.PostInfoDetail', {
            id: $state.params.id
          }, 'back');
        })
        .catch(function(err) {
          U.error(err);
        });
    }

    //====================================================
    //  REST
    //====================================================
    function findOnePost(extraQuery, extraOperation) {
      var queryWrapper = {
        query: {
          where: {
            id: $state.params.id
          }
        }
      };
      angular.extend(queryWrapper.query.where, extraQuery);
      angular.extend(queryWrapper.query, extraOperation);
      return Post.findOne(queryWrapper).$promise
        .then(function(post) {
          var photosPromise = Preload.photos(post, 'Cloudinary600', true, 'neverMind');
          return $q.all([post, photosPromise]);
        })
        .then(function(array) {
          var post = array[0];
          return post;
        });
    }

    function updatePost() {
      var queryWrapper = {
        query: {
          id: $state.params.id,
          title: PostInfoUpdateModel.form.title,
          content: PostInfoUpdateModel.form.content,
          fitnessType: PostInfoModel.Info.name
        }
      };
      return Post.update({}, queryWrapper).$promise;
    }
  }
})();
