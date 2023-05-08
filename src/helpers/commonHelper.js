const sql = require('../helpers/db');

const searchData = (data) => {
    return new Promise((resolve, reject) => {

        let {tbl_name,where_condition}=data

        let query=`SELECT * FROM ${tbl_name} ${where_condition}`
        sql.query(query,(err, result) => {
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

module.exports={
    searchData
}