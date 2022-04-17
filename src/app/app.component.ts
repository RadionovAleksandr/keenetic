import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {AppService, Route} from "./app.service";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";

interface Head {key: string, value: HeadType, sort: SortType};

enum HeadType {
  address = 'Адрес',
  interface = 'Интерфейс',
  gateway = 'Шлюз'
}

enum SortType {
  more = '>',
  less = '<'
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'keneetic';
  list: Route[] = [];
  heads: { key: string, value: HeadType, sort: SortType }[] = [
    {key: 'address', value: HeadType.address, sort: SortType.more},
    {key: 'gateway', value: HeadType.gateway, sort: SortType.more},
    {key: 'interface', value: HeadType.interface, sort: SortType.more}
  ];
  destroy$ = new Subject<void>();

  constructor(
    private readonly _cd: ChangeDetectorRef,
    private readonly appService: AppService
    ) {}

  ngOnInit(): void {
    this.appService.getList()
      .pipe(takeUntil(this.destroy$))
      .subscribe(resp => {
        this.list = resp;
        this._cd.markForCheck();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  sort(item: Head): void {
    switch (item.value) {
      case HeadType.address:
        this.sortAddress(item);
        break;
      case HeadType.gateway:
      case HeadType.interface:
        const key: Head['key'] = item.key;
        if (item.sort === SortType.more) {
          // @ts-ignore
          this.list.sort((a, b) => a[key] > b[key] ? 1 : -1);
        } else {
          // @ts-ignore
          this.list.sort((a, b) => a[key] < b[key] ? 1 : -1);
        }
        break;
    }

    item.sort = item.sort === SortType.more ? SortType.less : SortType.more;
  }

  trackByFn(_: number, item: Route): Route['uuid'] {
    return item.uuid;
  }

  private sortAddress(item: Head): void {
    this.list.sort((a, b) => {
      const firstIP = a.address.split('.');
      const secondIP = b.address.split('.');
      let maxIndex;

      maxIndex = firstIP.length > secondIP.length ? firstIP.length : secondIP.length;

      for (let i = 0; i <= maxIndex; i++) {
        if (firstIP[i] === secondIP[i]) {
          continue;
        }
        if (item.sort === SortType.more) {
          return Number(firstIP[i]) > Number(secondIP[i]) ? 1 : -1;
        } else {
          return Number(firstIP[i]) < Number(secondIP[i]) ? 1 : -1;
        }
      }
      return 0;
    });
  }
}
