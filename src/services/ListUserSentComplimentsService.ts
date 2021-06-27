import { getCustomRepository } from "typeorm";
import { ComplimentRepository } from "../repositories/ComplimentRepository";
import { UsersRepository } from "../repositories/UsersRepository";

class ListUserSentComplimentsService {
  async execute(user_id: string) {
    const complimentRepository = getCustomRepository(ComplimentRepository);

    const compliments = await complimentRepository.find({
      where: {
        user_sender: user_id
      }
    });

    return compliments;
  }
}

export { ListUserSentComplimentsService };