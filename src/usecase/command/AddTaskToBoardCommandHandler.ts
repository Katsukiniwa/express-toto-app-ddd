import { UserRepository } from "../../domain/model/user/UserRepository";
import { CommandHandler } from "../../ddd_common/usecase/CommandHandler";
import { BoardRepository } from "../../domain/model/board/BoardRepository";

export interface CreateTaskCommand {
  taskName: string;
  deadline: Date;
  userId: number;
  boardId: number;
  point: number;
}

/**
 * ボードにタスクを追加するユースケース
 * Trelloでレーンにカードを追加するイメージ
 * CRUD指向だとCreateTaskとかになりがち
 */
export class AddTaskToBoardCommandHandler implements CommandHandler<CreateTaskCommand> {
  constructor(
    private boardRepository: BoardRepository,
    private userRepository: UserRepository
  ) {}

  public async handle(command: CreateTaskCommand): Promise<void> {
    const user = this.userRepository.findById(command.userId);

    if (user == null) {
      throw new Error("ユーザが見つかりません");
    }

    const board = await this.boardRepository.findById(command.boardId);

    if (board == null) {
      throw new Error("ボードが見つかりません");
    }

    board.addTask({
      id: null,
      taskName: command.taskName,
      assignedUser: user,
      deadline: command.deadline,
      point: command.point,
    });

    this.boardRepository.store(board);
  }
}
