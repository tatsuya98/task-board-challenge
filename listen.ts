const app = require("./app.ts");
const {DB_PORT} = process.env;
app.listen(DB_PORT, () => {
    console.log(`Example app listening on port ${DB_PORT}`);
})