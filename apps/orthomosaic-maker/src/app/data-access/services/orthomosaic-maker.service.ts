import {HttpClient, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrthomosaicMakerService {
  constructor(private http: HttpClient) {
  }

  uploadImages(images: FileList, payload: Record<string, any>) {
    const fd = new FormData()

    for (const file of images) {
      fd.append('images', file)
    }

    fd.append('body', JSON.stringify(payload))

    const req = new HttpRequest('POST', 'http://127.0.0.1:8000/', fd, {
      reportProgress: true
    });

    return this.http.request(req)
  }

  checkProgress(id: string) {
    return this.http.get(`http://127.0.0.1:8000/${id}`)
  }
}
