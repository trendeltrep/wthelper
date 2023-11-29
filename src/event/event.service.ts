import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Event, Prisma } from '@prisma/client';
import { EventDto } from './dto';

@Injectable()
export class EventService {
  constructor(private prisma: PrismaService) {}

  async getAll(): Promise<EventDto[]> {
    const events = await this.prisma.event.findMany();
    return events.map(this.mapToDto);
  }

  async getById(id: number): Promise<EventDto> {
    const event = await this.prisma.event.findUnique({ where: { id } });
    return this.mapToDto(event);
  }

  async create(data: EventDto): Promise<EventDto> {
    const event = await this.prisma.event.create({
      data: this.mapToPrisma(data),
    });
    return this.mapToDto(event);
  }

  async update(id: number, data: EventDto): Promise<EventDto> {
    id = +id;
    const event = await this.prisma.event.update({
      where: { id },
      data: this.mapToPrisma(data),
    });
    return this.mapToDto(event);
  }

  async delete(id: number): Promise<void> {
    id = +id;
    await this.prisma.event.delete({ where: { id } });
  }

  private mapToDto(event: Event | null): EventDto {
    if (!event) return null;
    return {
      id: event.id,
      name: event.name,
      date: event.date,
      place: event.place,
      status: event.status,
      series: event.series,
      userId: Number(event.userId),
      discipline: event.discipline,
    };
  }

  private mapToPrisma(eventDto: EventDto) {
    return {
      name: eventDto.name,
      date: eventDto.date,
      place: eventDto.place,
      status: eventDto.status,
      series: eventDto.series,
      user: { connect: { id: Number(eventDto.userId) } },
      discipline: eventDto.discipline,
    };
  }
}

// async update(id: number, data: EventDto): Promise<EventDto> {
//   id = +id;
//   return this.prisma.event
//     .update({
//       where: { id },
//       data: this.mapToPrisma(data),
//     })
//     .then((data) => {
//       return this.mapToDto(data);
//     });
// }
