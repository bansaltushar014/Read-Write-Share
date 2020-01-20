// re for read, wr for write and sh for share
angular.module('rewrsh', []);

var Socketdata = function ($scope, getData) {
    getData
       .success(function(data){
           console.log(data);
           $scope.data = data;
       })
       .error(function(e){
           console.log(e);
       })
};

var getData = function($http){
    console.log("inside");
   return $http.get('https://floating-stream-61460.herokuapp.com/api/signup');
}
angular
.module('rewrsh')
.controller('SocketData', Socketdata)
.service('getData', getData);