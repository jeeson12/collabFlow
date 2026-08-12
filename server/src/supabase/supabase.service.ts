import { NotFoundException, Injectable, Logger } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ConfigService } from '@nestjs/config';
import fetch from 'cross-fetch';

@Injectable()
export class SupabaseService {
  public readonly client: SupabaseClient;
  private readonly logger = new Logger(SupabaseService.name);

  constructor(private config: ConfigService) {
    this.client = createClient(
      this.config.getOrThrow('SUPABASE_URL'),
      this.config.getOrThrow('SUPABASE_SERVICE_ROLE_KEY'),
      {
        global: {
          fetch: fetch,
        },
      },
    );
  }

  async uploadFiles(
    path: string,
    file: Buffer,
    contentType: string,
    upsert = false,
  ) {
    const { data, error } = await this.client.storage
      .from('attachments')
      .upload(path, file, {
        contentType,
        upsert,
      });

    if (error) {
      throw error;
    }

    return data;
  }

  async createSignedUrl(path: string, download = false) {
    if (!path) return null;
    
    try {
      const { data, error } = await this.client.storage
        .from('attachments')
        .createSignedUrl(path, 3600, {
          download,
        });

      if (error) {
        this.logger.warn(`Supabase signed URL error for path ${path}: ${error.message}`);
        return null; // Return null instead of crashing the whole request
      }

      return data?.signedUrl || null;
    } catch (error) {
      this.logger.error(`Exception generating signed URL for ${path}`, error);
      return null;
    }
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
