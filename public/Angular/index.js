// re for read, wr for write and sh for share
angular.module('rewrsh', []);

var Socketdata = function ($scope, servicefun) {
    
    
    servicefun
    .success(function(data){
        $scope.data = servicefun;
    })
    .error(function(e){
        console.log(e);
    });
};

// var servicefun = function () {
//     return [{
//         "_id": {
//             "$oid": "5d1af37a362f8f148b7dbe15"
//         },
//         username: "Rahul Kumar",
//         "email": "kumar@gmail.com",
//         "password": "$2b$05$KupEam4dV/Fq7ge3ZnIsVu7iqghvidqEh1jYhc.INtV.gECBJ/sk2",
//         "__v": 0
//     },{
//         "_id": {
//             "$oid": "5ca949d4100d020017c3051d"
//         },
//         username: "User gghh",
//         "email": "gghh@w",
//         "password": "$2b$05$7R8/TemxCgtqSUwQwAeySOqMHlJ3AwNvf72dwJmMt6Kv0z4Jd1rd2",
//         "__v": 0
//     }];
//     };


 var servicefun = function ($http) {
    console.log("working");
    return $http.get('https://floating-stream-61460.herokuapp.com/api/signup');
    };
    


 angular
.module('rewrsh')
.controller('SocketData', Socketdata)
.service('servicefun', servicefun);

