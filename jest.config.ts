import { createDefaultPreset } from "ts-jest";

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
export default {
    testEnvironment: "node",
    moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json", "node"],
    transform: {
        ...tsJestTransformCfg,
    },
    preset: "ts-jest",
    maxWorkers: 1,
};
