import { PrismaClient } from "@prisma/client";
import { env } from "../config/index.js";
import prismaModelExtensions from "./extension/model/index.js";
import prismaClientExtension from "./extension/client/index.js";

export default new PrismaClient({
    datasources: {
        db: { url: env.DATABASE_URL },
    },
}).$extends({
    model: {
        ...prismaModelExtensions,
    },
    client: {
        ...prismaClientExtension,
    },
});
