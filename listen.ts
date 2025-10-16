import app from "./app.ts";
const {NODE_PORT} = process.env;
app.listen(NODE_PORT, () => {
    console.log(`Example app listening on port ${NODE_PORT}`);
})