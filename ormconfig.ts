import { TypeOrmModuleOptions } from "@nestjs/typeorm"
import * as dotenv from "dotenv"

dotenv.config()

const ormconfig: TypeOrmModuleOptions = {
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    logging: true,
    entities: [__dirname + "/**/*.entity{.ts,.js}"],

    synchronize: true,
}

export default ormconfig;