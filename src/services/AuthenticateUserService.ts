import { compare } from "bcryptjs";
import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository";
import { sign } from "jsonwebtoken";

interface IAuthenticateRequest {
  email: string;
  password: string;
}

class AuthenticateUserService {
  async execute({email, password}: IAuthenticateRequest) {
    const usersRepository = getCustomRepository(UsersRepository);

    // Verifica se email existe
    const user = await usersRepository.findOne({
      email
    });

    if (!user) {
      throw new Error("Email/Password incorrect");
    }

    // Verifica se senha está correta
    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("Email/Password incorrect");
    }

    // Gera token
    const token = sign({
      email: user.email
    }, "391592bf226cd99ae55fda45f73a7ce1", {
      subject: user.id,
      expiresIn: "1d"
    });

    return token;
  }
}

export { AuthenticateUserService };