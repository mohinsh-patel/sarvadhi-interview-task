const checkValidation = (req, res, next) => {
    let message = ""
    let bodyData = req.body
    let { team_id, player_id, action_type, age, dob } = bodyData

    if (dob) {
        const dateOfBirth = new Date(dob);
        const currentDate = new Date();

        if (isNaN(dateOfBirth.getTime())) {
            message += "Enter valid date of birth,";
        } else if (dateOfBirth > currentDate) {
            message += "Enter valid date of birth,"
        }
    }

    if (team_id) {
        if (isNaN(team_id)) {
            message += "Enter valid team id,"
        }
    }

    if (player_id) {
        if (isNaN(player_id)) {
            message += "Enter valid player id,"
        }
    }

    if (action_type){
        if (action_type != 'add' && action_type != 'edit') {
            message += "Enter valid action type,"
        }
    }

    if(age){
        if (isNaN(age)) {
            message += "Enter valid age,"
        }
    }

    if(message){
        res.send({status:false,message:message})
    }else{
        next()
    }
}

module.exports = {
    checkValidation
};