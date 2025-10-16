import seed from "./seed";
import pool from "./connection";

const runSeed = async () => {
    await seed();
    return pool.end;
}

runSeed();