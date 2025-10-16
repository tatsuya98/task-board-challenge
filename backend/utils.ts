import pool from "./database/connection.ts";


  function validateId(id: string):boolean{
    const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    const uuidLength: number = 36
    return !(id.length !== uuidLength && !UUID_REGEX.test(id));
}

  async function checkBoardIdExists(id: string):Promise<boolean>{
    const queryResult = await pool.query(`SELECT * FROM boards where board_id = $1`, [id])
    return queryResult.rowCount === 1
}
export {validateId, checkBoardIdExists}