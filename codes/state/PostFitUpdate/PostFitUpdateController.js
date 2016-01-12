(function() {
  'use strict';
  angular.module('app')
    .controller('PostFitUpdateController', PostFitUpdateController);

  PostFitUpdateController.$inject = [
    '$scope', '$state', '$q',
    'PostFitModel', 'PostFitUpdateModel', 'U', 'Post', 'Preload', 'Message'
  ];

  function PostFitUpdateController(
    $scope, $state, $q,
    PostFitModel, PostFitUpdateModel, U, Post, Preload, Message
  ) {
    var PostFitUpdate = this;
    PostFitUpdate.Model = PostFitUpdateModel;
    $scope.$on('$ionicView.beforeEnter', onBeforeEnter);
    $scope.$on('$ionicView.afterEnter', onAfterEnter);
    $scope.$on('$ionicView.beforeLeave', onBeforeLeave);

    PostFitUpdate.sendForm = sendForm;
    //====================================================
    //  Implementation
    //====================================================
    function onBeforeEnter() {
      U.loading(PostFitUpdateModel);
    }

    function onAfterEnter() {
      return findOnePost()
        .then(function(post) {
          U.bindData(post, PostFitUpdateModel, 'form');
        })
        .catch(function(err) {
          U.error(err);
        });
    }

    function onBeforeLeave() {
      PostFitUpdateModel.form = {
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
          U.goToState('Main.PostFit.PostFitList');
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
          title: PostFitUpdateModel.form.title,
          content: PostFitUpdateModel.form.content,
          location: PostFitModel.Location.name
        }
      };
      return Post.update({}, queryWrapper).$promise;
    }

    //====================================================
    //  Future use. Not applied yet.
    //====================================================
    // function updatePost() {
    //   var queryWrapper = {
    //     query: {
    //       where: {
    //         id: $state.params.id
    //       },
    //       data: {
    //         title: PostFitUpdateModel.form.title,
    //         content: PostFitUpdateModel.form.content
    //       }
    //     }
    //   };
    //   return Post.update({}, queryWrapper).$promise;
    // }
  }
})();
