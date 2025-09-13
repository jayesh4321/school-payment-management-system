import { Controller, Post, Get, Body, Query, ParseIntPipe } from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { WebhookDto } from '../dto/webhook.dto';

@Controller('webhook')
export class WebhookController {
  constructor(private webhookService: WebhookService) {}

  @Post()
  async processWebhook(@Body() webhookDto: WebhookDto) {
    return this.webhookService.processWebhook(webhookDto);
  }

  @Get('logs')
  async getWebhookLogs(
    @Query('page', new ParseIntPipe({ optional: true })) page: number = 1,
    @Query('limit', new ParseIntPipe({ optional: true })) limit: number = 10,
  ) {
    return this.webhookService.getWebhookLogs(page, limit);
  }
}
