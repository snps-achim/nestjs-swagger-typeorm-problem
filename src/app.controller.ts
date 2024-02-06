import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiProperty, ApiResponse } from '@nestjs/swagger';

class Dto{

  @ApiProperty({ type: String })
  afield: string;
}
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiResponse({description: 'The request has been successfully processed', type: Dto, status: 200})
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
