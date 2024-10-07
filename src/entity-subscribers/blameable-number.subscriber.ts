import type {
  EntitySubscriberInterface,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
import { DataSource, EventSubscriber } from 'typeorm';

import { AbstractNumberEntity } from '../common/abstract-number.entity';
import { ContextProvider } from './../providers/context.provider';

@EventSubscriber()
export class BlameableNumberSubscriber
  implements EntitySubscriberInterface<AbstractNumberEntity>
{
  constructor(dataSource: DataSource) {
    dataSource.subscribers.push(this);
  }

  listenTo() {
    return AbstractNumberEntity;
  }

  beforeInsert(event: InsertEvent<AbstractNumberEntity>) {
    const user = ContextProvider.getAuthUser();
    event.entity.createdBy = user ? user.id : 'Anonymous';
  }

  beforeUpdate(event: UpdateEvent<AbstractNumberEntity>) {
    const user = ContextProvider.getAuthUser();

    if (event.entity) {
      event.entity.updatedBy = user ? user.id : 'Anonymous';
    }
  }
}
