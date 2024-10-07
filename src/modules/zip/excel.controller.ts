/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable unicorn/import-style */
import {
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs';
import { diskStorage } from 'multer';
import * as path from 'path';
import { promisify } from 'util';

import { ExcelService } from './excel.service';

const unlinkAsync = promisify(fs.unlink);

@Controller('excel')
export class ExcelController {
  constructor(private readonly excelService: ExcelService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const extension = path.extname(file.originalname);
          cb(null, `${file.fieldname}-${uniqueSuffix}${extension}`);
        },
      }),
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!file) {
      throw new HttpException('File not provided', HttpStatus.BAD_REQUEST);
    }

    try {
      const resultados = await this.excelService.procesarArchivoExcel(
        file.path,
      );

      // Devolver los resultados generados por el servicio de Excel
      return resultados.map((result) => ({
        nombre: result.nombre,
        data: result.data,
      }));
    } catch {
      throw new HttpException(
        'Error processing file',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } finally {
      // Eliminar el archivo después de ser procesado, independientemente de si hubo un error o no
      if (file && file.path) {
        await unlinkAsync(file.path);
      }
    }
  }
}
