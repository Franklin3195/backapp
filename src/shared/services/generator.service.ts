import { Injectable } from '@nestjs/common';
import { nanoid } from 'nanoid';
import { v4 as uuid } from 'uuid';

@Injectable()
export class GeneratorService {
  public uuid(): string {
    return uuid();
  }

  public fileName(ext: string): string {
    return this.uuid() + '.' + ext;
  }

  public shortCode(): string {
    return nanoid(6);
  }
}
