 
var crypto = require('crypto');
// var algorithm = 'aes-256-ctr';
var algorithm = 'aes-256-cbc';
var iv = "1234567891234567";
 
function Encryption() {
};
 
Encryption.prototype.encrypt = function encrypt(buffer, secretKey) {
    try {
        if (buffer) {
            var encPassword = secretKey;
            var password = crypto.createHash("sha256").update(encPassword).digest();
            var cipher = crypto.createCipheriv(algorithm, password, iv);
            var crypted = Buffer.concat([cipher.update(buffer), cipher.final()]);
            return crypted;
        } else {
            return '';
        }
    } catch (ex) {
        console.log("encryption error ", ex)
        return '';
    }
};
 
Encryption.prototype.decrypt = function decrypt(buffer, secretKey) {
    try {
        var encPassword = secretKey;
        var password = crypto.createHash("sha256").update(encPassword).digest();
        // var buffer = new Buffer(response);
        var decipher = crypto.createDecipheriv(algorithm, password, iv);
        var dec = Buffer.concat([decipher.update(buffer), decipher.final()]);
        return dec;
    } catch (ex) {
        return '';
    }
};
 
Encryption.prototype.decrypt1 = function decrypt1(buffer, secretKey) {
    try {
        if (buffer) {
            buffer = Buffer.from(buffer, 'base64')
            var encPassword = secretKey;
            var password = crypto.createHash("sha256").update(encPassword).digest();
            var decipher = crypto.createDecipheriv(algorithm, password, iv);
            var dec = Buffer.concat([decipher.update(buffer), decipher.final()]);
            return dec;
        } else {
            return '';
        }
    } catch (ex) {
        console.log("decryption error ", ex)
        return '';
    }
}
 
module.exports = Encryption;
 
 
 