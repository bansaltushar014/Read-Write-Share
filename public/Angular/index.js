// re for read, wr for write and sh for share
angular.module('rewrsh', []);

var Socketdata = function ($scope) {
    $scope.data = [
        {
            "_id": {
                "$oid": "5ca8da22c592df0017a85467"
            },
            username: "admin",
            "email": "admin@admin.com",
            "password": "$2b$05$QzeCM3wNEpNQVgBJxXqyk.22IOUi0WhWW1QDpCm8XeTJt4H6LE3HG",
            "__v": 0
        },
        {
            "_id": {
                "$oid": "5ca8da91c592df0017a85468"
            },
            username: "Singhal",
            "email": "kanika.singhal091@gmail.com",
            "password": "$2b$05$bbGYQohMjwHQgWXZUrgD0.aDqlHqAIYFxj9/0Gn.4UT5pzgk8Q8wK",
            "__v": 0
        },
        {
            "_id": {
                "$oid": "5ca949d4100d020017c3051d"
            },
            username: "User gghh",
            "email": "gghh@w",
            "password": "$2b$05$7R8/TemxCgtqSUwQwAeySOqMHlJ3AwNvf72dwJmMt6Kv0z4Jd1rd2",
            "__v": 0
        },
        {
            "_id": {
                "$oid": "5d1af37a362f8f148b7dbe15"
            },
            username: "Rahul Kumar",
            "email": "kumar@gmail.com",
            "password": "$2b$05$KupEam4dV/Fq7ge3ZnIsVu7iqghvidqEh1jYhc.INtV.gECBJ/sk2",
            "__v": 0
        }
    ]
};


angular
.module('rewrsh')
.controller('SocketData', Socketdata);