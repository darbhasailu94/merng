module.exports.validateRegisterInput = (
    username,
    email,
    password,
    confirmPassword
) => {
    const errors = {};

    if(username.trim() === ''){
        errors.username = 'username empty';
    }
    if(email.trim() ===''){
        errors.email = 'email empty';
    } 
    else {
        const regEx = /^[a-zA-Z0-9_!#$%&’*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$/;
    // ^([0-9a-zA-Z](-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
        if(!email.match(regEx)){
            errors.email = 'email should be email';
            }
        }
    if(password === ''){
        errors.password = 'password empty';
    } else if(password !== confirmPassword){
        errors.confirmPassword = 'passwords dont match';
    }
    return {
        errors,
        valid: Object.keys(errors).length < 1
    };
};
module.exports.validateLoginInput = (username, password) => {
    const errors = {};
    if(username.trim() === ''){
        errors.username = 'username empty';
    }
    if(password === ''){
        errors.password = 'password empty';
    }
    return {
        errors,
        valid: Object.keys(errors).length < 1
    };
}