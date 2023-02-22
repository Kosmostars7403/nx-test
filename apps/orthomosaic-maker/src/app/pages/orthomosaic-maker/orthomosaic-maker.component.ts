import {CommonModule} from '@angular/common';
import {HttpEventType, HttpResponse} from '@angular/common/http';
import {Component} from '@angular/core';
import {FormBuilder, FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {interval, NEVER, Subject, switchMap} from 'rxjs';
import {OrthomosaicMakerService} from '../../data-access/services/orthomosaic-maker.service';

interface OrthomosaicMakerForm {
  flightType: FormControl<string | null>,
}

@Component({
  selector: 'nx-test-orthomosaic-maker',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './orthomosaic-maker.component.html',
  styleUrls: ['./orthomosaic-maker.component.scss'],
})
export class OrthomosaicMakerComponent {
  images: FileList | null = null
  uploadProgress$ = new Subject<number>()

  orthomosaicFlightId$ = new Subject<string | null>()

  processOfMakingOrthomosaic$ = this.orthomosaicFlightId$.asObservable()
    .pipe(
      switchMap(id => {
        if (id) return interval(2000).pipe(
          switchMap(() => this.orthomosaicMakerService.checkProgress(id))
        )

        return NEVER
      })
    )


  form = this.fb.group<OrthomosaicMakerForm>({
    flightType: this.fb.control('test', Validators.required),
  })

  constructor(
    private orthomosaicMakerService: OrthomosaicMakerService,
    private fb: FormBuilder) {
  }

  submit() {
    if (this.images) {
      this.orthomosaicMakerService.uploadImages(this.images, this.form.value)
        .subscribe((event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.uploadProgress$.next(Math.round(100 * event.loaded / event.total))
          } else if (event instanceof HttpResponse) {
            this.orthomosaicFlightId$.next(event.body.id)
          }
        })
    }
  }

  onDropFile({files}: HTMLInputElement) {
    this.images = files
  }
}
