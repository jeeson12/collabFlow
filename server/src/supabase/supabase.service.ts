import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SupabaseService {
  public readonly client: SupabaseClient;
  constructor(private config: ConfigService) {
    this.client = createClient(
      this.config.getOrThrow<string>('SUPABASE_URL'),
      this.config.getOrThrow<string>('SUPABASE_SERVICE_ROLE_KEY'),
    );
  }
  async uploadFiles(path: string, file: Buffer, contentType: string) {
    const { data, error } = await this.client.storage
      .from('attachments')
      .upload(path, file, { contentType, upsert: false });
    if (error) {
      throw error;
    }
    return data;
  }

  async createSignedUrl(path: string) {
    const { data, error } = await this.client.storage
      .from('attachments')
      .createSignedUrl(path, 300);

    if (error) {
      return error.message;
    }

    return data.signedUrl;
  }

  async deleteFile(path: string) {
    const { data, error } = await this.client.storage
      .from('attachments')
      .remove([path]);
    if (error) {
      throw error;
    }
    return data;
  }
}
