---
to: "src/modules/<%= h.fileName(name) %>/dtos/<%= h.dtoFileName(name) %>.ts"
unless_exists: true
skip_if: <%= !blocks.includes('DTO') %>
---
<%

 DtoName = h.DtoName(name);
 DtoOptionsName = "I" + h.DtoName(name) + "Options";
 EntityName = h.EntityName(name);
 entityFileName = h.entityFileName(name);

%>
import { AbstractDto } from '../../../common/dto/abstract.dto';
import type { <%= EntityName %> } from '../<%= entityFileName %>';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface <%= DtoOptionsName %> {}

export class <%= DtoName %> extends AbstractDto {
  constructor(entityName: <%= EntityName %>, _options?: <%= DtoOptionsName %>) {
    super(entityName);
  }
}
