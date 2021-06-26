import { getCustomRepository } from "typeorm";
import { ComplimentRepository } from "../repositories/ComplimentRepository";
import { UsersRepository } from "../repositories/UsersRepository";

interface IComplimentRequest {
  tag_id: string;
  user_sender: string;
  user_receiver: string;
  message: string;
}

class CreateComplimentService {
  async execute({ tag_id, user_sender, user_receiver, message }: IComplimentRequest) {
    const complimentRepository = getCustomRepository(ComplimentRepository);
    const usersRepository = getCustomRepository(UsersRepository);

    if (user_sender === user_receiver) {
      throw new Error("You cannot send a compliment to yourself");
    }

    const userReceiverExists = await usersRepository.findOne(user_receiver);

    if (!userReceiverExists) {
      throw new Error("User Receiver does not exist");
    }

    const compliment = complimentRepository.create({
      tag_id, 
      user_sender, 
      user_receiver, 
      message
    })

    await complimentRepository.save(compliment);

    return compliment;
  }
}

export { CreateComplimentService };