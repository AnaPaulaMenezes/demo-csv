
import { User } from "../../entities/user";
import { IUsersRepository } from "../IUsersRepository";
import { client } from "../../database/client";

export class PostgresUsersRepository implements IUsersRepository {
    async findByEmail(email: string): Promise<User | null> {
        const user = await client.user.findMany({
            where: {
                email: email
            },
        })
        return user[0];
    }

    async save(user: User): Promise<void> {
        await client.user.create({
            data: {
                name: user.name,
                email: user.email,
                password: user.password
            }
        })
    }

}