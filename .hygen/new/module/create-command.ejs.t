---
to: "src/modules/<%= h.fileName(name) %>/commands/<%= h.createCommandFileName(name) %>.ts"
unless_exists: true
skip_if: <%= !blocks.includes('CreateCommand') %>
---
<%
  CreateCommandName = h.CreateCommandName(name);
  CreateHandlerName = h.CreateHandlerName(name);

  CreateDtoName = h.CreateDtoName(name);
  createDtoName = h.changeCase.camel(CreateDtoName);
  createDtoFileName = h.createDtoFileName(name);

  EntityName = h.EntityName(name);
  entityFileName = h.entityFileName(name);
  entityVarName = h.changeCase.camel(EntityName);
%>
import type { ICommand, ICommandHandler } from '@nestjs/cqrs';
import { CommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { <%= EntityName %> } from '../<%= entityFileName %>';
import type { <%= CreateDtoName %> } from '../dtos/<%= createDtoFileName %>';

export class <%= CreateCommandName %> implements ICommand {
  constructor(public readonly <%= createDtoName %>: <%= CreateDtoName %>) {}
}

@CommandHandler(<%= CreateCommandName %>)
export class <%= CreateHandlerName %> implements ICommandHandler<<%= CreateCommandName %>, <%= EntityName %>> {
  constructor(
    @InjectRepository(<%= EntityName %>)
    private <%= entityVarName %>Repository: Repository<<%= EntityName %>>,
  ) {}

  async execute(command: <%= CreateCommandName %>) {
    const { <%= createDtoName %> } = command;
    const <%= entityVarName %> = this.<%= entityVarName %>Repository.create(<%= createDtoName %>);

    await this.<%= entityVarName %>Repository.save(<%= entityVarName %>);

    return <%= entityVarName %>;
  }
}
