import { NotFoundException, Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SupabaseService {
  public readonly client: SupabaseClient;

  constructor(private config: ConfigService) {
    this.client = createClient(
      this.config.getOrThrow('SUPABASE_URL'),
      this.config.getOrThrow('SUPABASE_SERVICE_ROLE_KEY'),
    );
  }

  async uploadFiles(path: string, file: Buffer, contentType: string) {
    const { data, error } = await this.client.storage
      .from('attachments')
      .upload(path, file, {
        contentType,
        upsert: false,
      });

    if (error) {
      throw error;
    }

    return data;
  }

  async createSignedUrl(path: string, download = false) {
    const { data, error } = await this.client.storage
      .from('attachments')
      .createSignedUrl(path, 300, {
        download,
      });

    if (error) {
      console.error('Supabase signed URL error:', {
        path,
        message: error.message,
        statusCode: error.statusCode,
      });

      throw new NotFoundException(
        `Attachment file not found in storage: ${path}`,
      );
    }

    if (!data?.signedUrl) {
      throw new NotFoundException('Supabase did not return a signed URL');
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
