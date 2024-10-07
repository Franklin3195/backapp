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
import { CreateUploadDto } from './dtos/create-upload.dto';
import { UpdateUploadDto } from './dtos/update-upload.dto';
import type { UploadDto } from './dtos/upload.dto';
import { UploadPageOptionsDto } from './dtos/upload-page-options.dto';
import { UploadService } from './upload.service';

@Controller('uploads')
@ApiTags('uploads')
export class UploadController {
  constructor(private uploadService: UploadService) {}

  @Post()
  @ApiOperation({ summary: 'Create a upload' })
  @Auth([])
  @HttpCode(HttpStatus.CREATED)
  async createUpload(@Body() createUploadDto: CreateUploadDto) {
    const entity = await this.uploadService.createUpload(createUploadDto);

    return entity.toDto();
  }

  @Get()
  @ApiOperation({ summary: 'List all uploads with pagination' })
  @Auth([])
  @HttpCode(HttpStatus.OK)
  getAllUpload(
    @Query() uploadPageOptionsDto: UploadPageOptionsDto,
  ): Promise<PageDto<UploadDto>> {
    return this.uploadService.getAllUpload(uploadPageOptionsDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get details of a specific upload by ID' })
  @Auth([])
  @HttpCode(HttpStatus.OK)
  async getSingleUpload(@UUIDParam('id') id: Uuid): Promise<UploadDto> {
    const entity = await this.uploadService.getSingleUpload(id);

    return entity.toDto();
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update upload details' })
  @Auth([])
  @HttpCode(HttpStatus.ACCEPTED)
  updateUpload(
    @UUIDParam('id') id: Uuid,
    @Body() updateUploadDto: UpdateUploadDto,
  ): Promise<void> {
    return this.uploadService.updateUpload(id, updateUploadDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a upload' })
  @Auth([])
  @HttpCode(HttpStatus.ACCEPTED)
  async deleteUpload(@UUIDParam('id') id: Uuid): Promise<void> {
    await this.uploadService.deleteUpload(id);
  }
}
