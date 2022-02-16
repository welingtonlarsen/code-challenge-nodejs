import { container, delay, Lifecycle } from "tsyringe";
import StudyScheduleTypeOrmRepository from "../database/sql/repository/StudyScheduleTypeOrmRepository";
import CreateStudyScheduleFactoryTsYRing from "../factory/CreateStudyScheduleFactoryTsYRing";

container.register(
  "StudyScheduleRepository",
  {
    useClass: delay(() => StudyScheduleTypeOrmRepository),
  },
  { lifecycle: Lifecycle.Singleton }
);

container.register(
  "CreateStudyScheduleFactory",
  {
    useClass: delay(() => CreateStudyScheduleFactoryTsYRing),
  },
  { lifecycle: Lifecycle.Singleton }
);
