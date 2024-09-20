

function validateToken(clientid, req, callback) {
    if (!clientid) {
        //return callback(new Error('Token is missing'), null);
        return callback(null, null);
    }
   
    var inputs = [
        req.st.db.escape(clientid)
    ];

    //const query = 'CALL icr_audit_validate_token_Client(?)'; // Replace 'validate_token_sp' with your actual SP name
    var query = 'CALL icr_audit_validate_Client(' + inputs.join(',') + ')';
    console.log(query)
    req.db.query(query, function (err, result) {
        if (err) {
            // Handle any SQL error
            return callback(null, null);
           // return callback(new Error('Database error during token validation'), null);
        }

        // Check if the SP returned any data
        if (result && result[0] && result[0][0]) {
            // Assume the SP returns a 'valid' column that indicates if the token is valid
            const tokenResult = result[0][0];
            
            if (tokenResult.valid) {
                // Token is valid, pass the result to the callback
                return callback(null, tokenResult);
            } else {
                return callback(null, null);
               // return callback(new Error('Invalid token'), null);
            }
        } else {
            // No result returned from the SP
            console.log("No Token Results Found");
            callback(null,null);
        }
    });
}


module.exports = { validateToken };


