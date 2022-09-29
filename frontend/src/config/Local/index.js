const secureStorage = require("../Storage");

var localService = {
    setJsonValue:function(key, value){
        secureStorage.setItem(key, value);
    },
    getJsonValue:function(key) {
        try {
            return secureStorage.getItem(key);
        } catch (e) {
            this.clearToken();
            window.location = '/login';
        }
    },
    clearToken:function() {
        return secureStorage.clear();
    },
    removeJsonValue:function(key) {
        secureStorage.removeItem(key);
    }
};

module.exports = localService;

