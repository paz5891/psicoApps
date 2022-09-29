var CryptoJS = require("crypto-js");
const SecureStorage = require('secure-web-storage');
var SECRET_KEY = "3xmz8DaVvcGzz41bVcrq8ImKE8EwPTlXjUNaLOxqsb00YcT9RhV5rkUTmjgw7NJ3FjexDaZ34tZfBrtAAF0RgxUzBFmfZoWjzOaNzBJMdXmjqFeDUAUFltZdxR5anA0p";
var secureStorage = new SecureStorage(localStorage, {
    hash: function hash(key) {
        key = CryptoJS.SHA256(key, SECRET_KEY);
        return key.toString();
    },
    encrypt: function encrypt(data) {
        data = CryptoJS.AES.encrypt(data, SECRET_KEY);
        data = data.toString();
        return data;
    },
    decrypt: function decrypt(data) {
        data = CryptoJS.AES.decrypt(data, SECRET_KEY);
        data = data.toString(CryptoJS.enc.Utf8);
        return data;
    }
});

module.exports = secureStorage;

