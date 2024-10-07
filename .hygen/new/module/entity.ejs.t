---
to: "src/modules/<%= h.fileName(name) %>/<%= h.entityFileName(name) %>.ts"
unless_exists: true
skip_if: <%= !blocks.includes('Entity') %>
---
<%
  DtoName = h.DtoName(name);
  DtoOptionName = h.DtoOptionName(name);
  TableName = h.TableName(name);
  EntityName = h.EntityName(name);
  dtoFileName = h.dtoFileName(name);
%>
import { Entity } from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity';
import { UseDto } from '../../decorators';
import type { <%= DtoOptionName %> } from './dtos/<%= dtoFileName %>';
import { <%= DtoName %> } from './dtos/<%= dtoFileName %>';

@Entity({ name: '<%= TableName %>' })
@UseDto(<%= DtoName %>)
export class <%= EntityName %> extends AbstractEntity<<%= DtoName %>, <%= DtoOptionName %>> {}
