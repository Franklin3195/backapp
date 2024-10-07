---
to: "src/modules/<%= h.fileName(name) %>/queries/<%= h.getQueryFileName(name) %>.ts"
unless_exists: true
skip_if: <%= !blocks.includes('GetQuery') %>
---
<%
  GetQueryName = h.GetQueryName(name);
  GetHandlerName = h.GetHandlerName(name);

  EntityName = h.EntityName(name);
  entityName = h.changeCase.camel(EntityName);
  entityFileName = h.entityFileName(name);

  notFoundExceptionFileName = h.notFoundExceptionFileName(name);
  NotFoundExceptionName = h.NotFoundExceptionName(name);
%>

import type { IQuery, IQueryHandler } from '@nestjs/cqrs';
import { QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { <%= EntityName %> } from '../<%= entityFileName %>';
import { <%= NotFoundExceptionName %> } from '../exceptions/<%= notFoundExceptionFileName %>';

export class <%= GetQueryName %> implements IQuery {
  constructor(public readonly id: Uuid) {}
}

@QueryHandler(<%= GetQueryName %>)
export class <%= GetHandlerName %> implements IQueryHandler<<%= GetQueryName %>> {
  constructor(
    @InjectRepository(<%= EntityName %>)
    private <%= entityName %>Repository: Repository<<%= EntityName %>>,
  ) {}

  async execute(query: <%= GetQueryName %>): Promise<<%= EntityName %>> {
    const <%= entityName %> = await this.<%= entityName %>Repository.findOneBy({ id: query.id });

    if (!<%= entityName %>) {
      throw new <%= NotFoundExceptionName %>();
    }

    return <%= entityName %>;
  }
}
