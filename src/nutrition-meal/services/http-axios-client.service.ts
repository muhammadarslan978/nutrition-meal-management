import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { IHttpClient } from '../interfaces/http-client.interface';

@Injectable()
export class HttpAxiosClient implements IHttpClient {
  constructor(private readonly httpService: HttpService) {}

  async post<T>(url: string, body: any): Promise<T> {
    try {
      const response = await firstValueFrom(
        this.httpService.post<T>(url, body).pipe(
          catchError((error: AxiosError) => {
            throw new HttpException(
              `HTTP Request failed: ${error.message}`,
              HttpStatus.INTERNAL_SERVER_ERROR,
            );
          }),
        ),
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        `HTTP Request error: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
