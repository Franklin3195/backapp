---
to: "src/modules/<%= h.fileName(name) %>/<%= h.serviceFileName(name) %>.ts"
unless_exists: true
skip_if: <%= !blocks.includes('Service') %>
---
<%
  EntityName = h.EntityName(name);
  entityName = h.changeCase.camel(EntityName);
  entityFileName = h.entityFileName(name);
  fieldName = h.changeCase.camel(ClassName);

  ServiceName = h.ServiceName(name);

  CreateCommandName = h.CreateCommandName(name);
  createCommandFileName = h.createCommandFileName(name);

  DtoName = h.DtoName(name);
  dtoFileName = h.dtoFileName(name);

  CreateDtoName = h.CreateDtoName(name);
  createDtoFileName = h.createDtoFileName(name);

  PageOptionsDtoName = h.PageOptionsDtoName(name);
  pageOptionsDtoFileName = h.pageOptionsDtoFileName(name);

  UpdateDtoName = h.UpdateDtoName(name);
  updateDtoFileName = h.updateDtoFileName(name);

  NotFoundExceptionName = h.NotFoundExceptionName(name);
  notFoundExceptionFileName = h.notFoundExceptionFileName(name);

  createFunctionName = 'create' + ClassName;
  updateFunctionName = 'update' + ClassName;
  deleteFunctionName = 'delete' + ClassName;
  getAllFunctionName = 'getAll' + ClassName;
  getSingleFunctionName = 'getSingle' + ClassName;

  GetQueryName = h.GetQueryName(name);
  getQueryFileName = h.getQueryFileName(name);
%>

import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transactional } from 'typeorm-transactional';

import type { PageDto } from '../../common/dto/page.dto';
import { <%= EntityName %> } from './<%= entityFileName %>';
import { <%= CreateCommandName %> } from './commands/<%= createCommandFileName %>';
import type { <%= DtoName %> } from './dtos/<%= dtoFileName %>';
import type { <%= PageOptionsDtoName %> } from './dtos/<%= pageOptionsDtoFileName %>';
import { <%= CreateDtoName %> } from './dtos/<%= createDtoFileName %>';
import type { <%= UpdateDtoName %> } from './dtos/<%= updateDtoFileName %>';
import { <%= NotFoundExceptionName %> } from './exceptions/<%= notFoundExceptionFileName %>';
import { <%= GetQueryName %> } from './queries/<%= getQueryFileName %>';

@Injectable()
export class <%= ServiceName %> {
  constructor(
    @InjectRepository(<%= EntityName %>)
    private <%= fieldName %>Repository: Repository<<%= EntityName %>>,
    private commandBus: CommandBus,
    private queryBus: QueryBus,
  ) {}

  @Transactional()
  <%= createFunctionName %>(
    <%= h.changeCase.camel(CreateDtoName) %>: <%= CreateDtoName %>,
  ): Promise<<%= EntityName %>> {
    return this.commandBus.execute<<%= CreateCommandName %>, <%= EntityName %>>(
      new <%= CreateCommandName %>(<%= h.changeCase.camel(CreateDtoName) %>),
    );
  }

  async <%= getAllFunctionName %>(
    <%= h.changeCase.camel(PageOptionsDtoName) %>: <%= PageOptionsDtoName %>,
  ): Promise<PageDto<<%= DtoName %>>> {
    const queryBuilder = this.<%= fieldName %>Repository.createQueryBuilder('<%= fieldName %>');
    const [items, pageMetaDto] = await queryBuilder.paginate(<%= h.changeCase.camel(PageOptionsDtoName) %>);

    return items.toPageDto(pageMetaDto);
  }

  async <%= getSingleFunctionName %>(id: Uuid): Promise<<%= EntityName %>> {
    return this.queryBus.execute<<%= GetQueryName %>, <%= EntityName %>>(
      new <%= GetQueryName %>(id),
    );
  }

  async <%= updateFunctionName %>(
    id: Uuid,
    <%= h.changeCase.camel(UpdateDtoName) %>: <%= UpdateDtoName %>,
  ): Promise<void> {
    const queryBuilder = this.<%= fieldName %>Repository
      .createQueryBuilder('<%= fieldName %>')
      .where('<%= fieldName %>.id = :id', { id });

    const <%= fieldName %>Entity = await queryBuilder.getOne();

    if (!<%= fieldName %>Entity) {
      throw new <%= NotFoundExceptionName %>();
    }

    this.<%= fieldName %>Repository.merge(<%= fieldName %>Entity, <%= h.changeCase.camel(UpdateDtoName) %>);

    await this.<%= fieldName %>Repository.save(<%= fieldName %>Entity);
  }

  async <%= deleteFunctionName %>(id: Uuid): Promise<void> {
    const deleteResult = await this.<%= fieldName %>Repository.softDelete(id);

    if (deleteResult.affected === 0) {
      throw new <%= NotFoundExceptionName %>();
    }
  }
}
