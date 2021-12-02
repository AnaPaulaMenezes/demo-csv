import { User } from '../../entities/user';
import { IMailProvider } from '../../providers/IMailProvider';
import { IUsersRepository } from '../../repositories/IUsersRepository'
import { ICreateUserRequestDto } from './ICreateUserDTO';
export class CreateUserUseCase {
    constructor(
        private usersRepository: IUsersRepository,
        private mailProvider: IMailProvider
    ) {

    }

    async execute(data: ICreateUserRequestDto) {
        const userAlreadyExists = await this.usersRepository.findByEmail(data.email);
        if (userAlreadyExists) {
            throw new Error("User already exists!")
        }

        const user = new User(data);
        await this.usersRepository.save(user);
        await this.mailProvider.sendMail({
            to: {
                name: data.name,
                email: data.email,
            },
            from: {
                name: "Equipe App",
                email: "equipe@app.com"
            },
            subject: "Bem vindo ao APP",
            body: "<p>Faça login no app</p>"
        })
    }
}