import { Controller, Get, Post, Param, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DriversService } from './drivers.service.js';

@Controller('drivers')
export class DriversController {
  constructor(private readonly driversService: DriversService) {}

  @Get()
  findAll() {
    return this.driversService.findAll();
  }

  @Post(':id/kyc')
  @UseInterceptors(FileInterceptor('file'))
  uploadKyc(@Param('id') id: string, @UploadedFile() file: Express.Multer.File) {
    // In a real app, save 'file' to AWS S3 or a local folder.
    // For now, we simulate saving the path to DB.
    const fileUrl = `/uploads/${file.originalname}`;
    return this.driversService.updateKyc(id, fileUrl);
  }
}

