import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import { UpdateResult } from "typeorm";
import { Task } from "../entities/Task";

@Resolver()
export class TaskResolver {
  @Query(() => String)
  hello(): string {
    return "hello world";
  }

  @Query(() => [Task])
  tasks(): Promise<Task[]> {
    return Task.find({});
  }

  @Query(() => Task, { nullable: true })
  task(
    @Arg("id", () => Int)
    id: number
  ): Promise<Task | undefined> {
    return Task.findOne({ id });
  }

  @Mutation(() => Task)
  createTask(
    @Arg("title", () => String)
    title: string
  ): Promise<Task> {
    return Task.create({ title, isComplete: false }).save();
  }

  @Mutation(() => Boolean)
  deleteTask(
    @Arg("id", () => Int)
    id: number
  ): boolean {
    try {
      Task.delete({ id });
      return true;
    } catch {
      return false;
    }
  }

  @Mutation(() => Boolean, { nullable: true })
  updateTask(
    @Arg("id", () => Int)
    id: number,

    @Arg("isComplete", () => Boolean)
    isComplete: boolean
  ): boolean | null {
    const task = Task.findOne({ id });
    if (!task) {
      return null;
    }

    try {
      Task.update({ id }, { isComplete });
      return true;
    } catch {
      return false;
    }
  }
}
