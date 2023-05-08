const sql = require('../helpers/db');
// const language = require('../config/language')


const getPlayerList = (data) => {
    return new Promise((resolve, reject) => {
        console.log(data)

        let whereCondition = "WHERE 1=1 ";
        let values = [];

        if (data.player_id) {
            whereCondition += " AND player_id = ? "
            values.push(data.player_id)
        }


        // let getQuery = "SELECT towner.*,GROUP_CONCAT(th.hobby_name) as hobby_name,GROUP_CONCAT(toi.image_name) as image_name  " +
        //     "FROM tbl_owner as towner " +
        //     "LEFT JOIN tbl_owner_hobby as toh ON toh.owner_id = towner.owner_id " +
        //     "LEFT JOIN tbl_hobby as th ON th.hobby_id = toh.hobby_id " +
        //     "LEFT JOIN tbl_owner_images as toi ON toi.owner_id = towner.owner_id " +
        //     whereCondition +
        //     " GROUP BY towner.owner_id "

        // let getQuery = "SELECT towner.*, " +
        //     "(SELECT GROUP_CONCAT(th.hobby_name) " +
        //     "FROM tbl_owner_hobby as toh " +
        //     "INNER JOIN tbl_hobby as th ON th.hobby_id = toh.hobby_id " +
        //     "WHERE toh.owner_id = towner.owner_id) as hobby_name, " +
        //     "GROUP_CONCAT(toi.image_name) as image_name " +
        //     "FROM tbl_owner as towner " +
        //     "LEFT JOIN tbl_owner_images as toi ON toi.owner_id = towner.owner_id " +
        //     whereCondition +
        //     "GROUP BY towner.owner_id "

        let query=`SELECT * FROM tbl_player ${whereCondition}`

        sql.query(query, values, (err, result) => {
            if (err) {
                console.log("error", err)
                reject(err)
            } else {
                if (result == "") {
                    resolve({ status: false, message: "No data found", data: [], total_record: 0 })
                } else {
                    resolve({ status: true, message: "Get data successfully", data: result })
                }

            }
        });
    });
}

const addEditPlayer = (data) => {
    return new Promise((resolve, reject) => {

        let showMessage = "";

        let addEditQuery = "";
        let values = [];

        if (data.action_type == "edit") {
            addEditQuery += "UPDATE tbl_player SET team_id=?,name=?,age=?,captain=?,dob=?,updated_at= NOW() WHERE player_id=?";
            values.push(data.team_id, data.name, data.age, data.captain, data.dob, data.player_id);
            showMessage += "Data updated successfully"

        } else {

            addEditQuery = "INSERT INTO tbl_player(team_id, name, age, captain, dob, created_at, updated_at) VALUES (?,?,?,?,?,NOW(),NOW())"
            values = [data.team_id, data.name, data.age, data.captain, data.dob]
            showMessage += "Data inserted successfully"

        }

        sql.query(addEditQuery, values, (err, res) => {
            if (err) {
                console.log("error", err)
                reject(err)
            } else {
                console.log(showMessage);
                resolve({ status: true, message: showMessage });
            }
        })

    })
}

const deletePlayer = (data) => {
    return new Promise((resolve, reject) => {
        
        let query = `DELETE FROM tbl_player WHERE player_id=${data.player_id}`
        sql.query(query, (err, result) => {
            if (err) {
                console.log("error", err)
                reject(err)
            } else {
                resolve({ status: true, message: "Player Data Deleted" })
            }
        });
    })
}

module.exports = {
    // getOwnerList,
    // deleteUser,
    // checkOwnerExistence
    addEditPlayer,
    deletePlayer,
    getPlayerList
}