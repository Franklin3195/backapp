import type {
  EntitySubscriberInterface,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
import { DataSource, EventSubscriber } from 'typeorm';

import { AbstractEntity } from '../common/abstract.entity';
import { ContextProvider } from './../providers/context.provider';

@EventSubscriber()
export class BlameableSubscriber
  implements EntitySubscriberInterface<AbstractEntity>
{
  constructor(dataSource: DataSource) {
    dataSource.subscribers.push(this);
  }

  listenTo() {
    return AbstractEntity;
  }

  beforeInsert(event: InsertEvent<AbstractEntity>) {
    const user = ContextProvider.getAuthUser();
    event.entity.createdBy = user ? user.id : 'Anonymous';
  }

  beforeUpdate(event: UpdateEvent<AbstractEntity>) {
    const user = ContextProvider.getAuthUser();

    if (event.entity) {
      event.entity.updatedBy = user ? user.id : 'Anonymous';
    }
  }
}
