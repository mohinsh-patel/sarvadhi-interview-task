const mld_player = require('../models/mldPlayer');
const language = require('../config/language')

const addEditPlayer = async (req, res) => {
    try {
        let bodyData = req.body
        let result = await mld_player.addEditPlayer(bodyData)
        res.send(result)
        
    } catch (err) {
        console.log(err)
        res.send({ status: "false", "message": language.Unable_TO_ADD_EDIT_Player})
    }
}

const deletePlayer = async (req, res) => {
    try {
        let bodyData = req.body
        let result = await mld_player.deletePlayer(bodyData)
        res.send(result)
        
    } catch (err) {
        console.log(err)
        res.send({ status: "false", "message": language.Unable_TO_Delete_Player })
    }
}

const getPlayerList = async (req, res) => {
    try {
        let bodyData = req.body
        let result = await mld_player.getPlayerList(bodyData)
        res.send(result)
        
    } catch (err) {
        console.log(err)
        res.send({ status: "false", "message": language.Unable_To_Get_Player })
    }
}

module.exports = {
addEditPlayer,
deletePlayer,
getPlayerList
}