import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { EventService } from './event.service';
import { EventDto } from './dto/event.dto';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get()
  async getAll(): Promise<EventDto[]> {
    return this.eventService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: number): Promise<EventDto> {
    return this.eventService.getById(id);
  }

  @Post()
  async create(@Body() data: EventDto): Promise<EventDto> {
    return this.eventService.create(data);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() data: EventDto,
  ): Promise<EventDto> {
    return this.eventService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.eventService.delete(id);
  }
}
