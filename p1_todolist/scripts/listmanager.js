var ListManager = function(){

    var lists = [];

    var create = function(){

    };

    var load = function(){
    };

    return {
        create: create,
        load: load,
        toString: function(){
            return JSON.stringify(lists);
        }
    };
}();