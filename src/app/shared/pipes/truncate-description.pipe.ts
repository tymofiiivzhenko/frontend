import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateDescription',
  standalone: true
})
export class TruncateDescriptionPipe implements PipeTransform {
  transform(value: string | null | undefined, limit: number = 100): string {
    if (!value) {
      return '';
    }

    const trimmed = value.trim();
    if (trimmed.length <= limit) {
      return trimmed;
    }

    return trimmed.slice(0, limit).trimEnd() + '…';
  }
}
