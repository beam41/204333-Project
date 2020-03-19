import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'roomName',
})
export class RoomNamePipe implements PipeTransform {
  transform(value: string, roomId: string): string {
    return value !== '' ? value : 'Untitled-' + roomId.slice(0, 5);
  }
}
