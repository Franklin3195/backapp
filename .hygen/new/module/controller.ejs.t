---
to: "src/modules/<%= h.fileName(name) %>/<%= h.controllerFileName(name) %>.ts"
unless_exists: true
skip_if: <%= !blocks.includes('Controller') %>
---
<%
  ClassName = h.ClassName(name);
  ControllerName = h.ControllerName(name);
  ServiceName = h.ServiceName(name);
  serviceName = h.changeCase.camel(ServiceName);

  CreateDtoName = h.CreateDtoName(name);
  createDtoName = h.changeCase.camel(CreateDtoName);

  UpdateDtoName = h.UpdateDtoName(name);
  updateDtoName = h.changeCase.camel(UpdateDtoName);

  DtoName = h.DtoName(name);

  PageOptionsDtoName = h.PageOptionsDtoName(name);
  pageOptionsDtoName = h.changeCase.camel(PageOptionsDtoName);

  createFunctionName = 'create' + ClassName;
  updateFunctionName = 'update' + ClassName;
  deleteFunctionName = 'delete' + ClassName;
  getAllFunctionName = 'getAll' + ClassName;
  getSingleFunctionName = 'getSingle' + ClassName;

  pluralizedName = h.inflection.pluralize(h.fileName(name).toLowerCase());
%>

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import type { PageDto } from '../../common/dto/page.dto';
import { Auth, UUIDParam } from '../../decorators';
import { <%= ServiceName %> } from './<%= h.serviceFileName(name) %>';
import type { <%= DtoName %> } from './dtos/<%= h.dtoFileName(name) %>';
import { <%= PageOptionsDtoName %> } from './dtos/<%= h.pageOptionsDtoFileName(name) %>';
import { <%= CreateDtoName %> } from './dtos/<%= h.createDtoFileName(name) %>';
import { <%= UpdateDtoName %> } from './dtos/<%= h.updateDtoFileName(name) %>';

@Controller('<%= pluralizedName %>')
@ApiTags('<%= pluralizedName %>')
export class <%= ControllerName %> {
  constructor(private <%= serviceName %>: <%= ServiceName %>) {}

  @Post()
  @ApiOperation({ summary: 'Create a <%= ClassName.toLowerCase() %>' })
  @Auth([])
  @HttpCode(HttpStatus.CREATED)
  async <%= createFunctionName %>(@Body() <%= createDtoName %>: <%= CreateDtoName %>) {
    const entity = await this.<%= serviceName %>.<%= createFunctionName %>(<%= createDtoName %>);

    return entity.toDto();
  }

  @Get()
  @ApiOperation({ summary: 'List all <%= pluralizedName %> with pagination' })
  @Auth([])
  @HttpCode(HttpStatus.OK)
  <%= getAllFunctionName %>(@Query() <%= pageOptionsDtoName %>: <%= PageOptionsDtoName %>): Promise<PageDto<<%= DtoName %>>> {
    return this.<%= serviceName %>.<%= getAllFunctionName %>(<%= pageOptionsDtoName %>);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get details of a specific <%= ClassName.toLowerCase() %> by ID' })
  @Auth([])
  @HttpCode(HttpStatus.OK)
  async <%= getSingleFunctionName %>(@UUIDParam('id') id: Uuid): Promise<<%= DtoName %>> {
    const entity = await this.<%= serviceName %>.<%= getSingleFunctionName %>(id);

    return entity.toDto();
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update <%= ClassName.toLowerCase() %> details' })
  @Auth([])
  @HttpCode(HttpStatus.ACCEPTED)
  <%= updateFunctionName %>(
    @UUIDParam('id') id: Uuid,
    @Body() <%= updateDtoName %>: <%= UpdateDtoName %>,
  ): Promise<void> {
    return this.<%= serviceName %>.<%= updateFunctionName %>(id, <%= updateDtoName %>);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a <%= ClassName.toLowerCase() %>' })
  @Auth([])
  @HttpCode(HttpStatus.ACCEPTED)
  async <%= deleteFunctionName %>(@UUIDParam('id') id: Uuid): Promise<void> {
    await this.<%= serviceName %>.<%= deleteFunctionName %>(id);
  }
}
