import Image from 'next/image';
import Link from 'next/link';

export default function Sidebar() {
  return (
    <div className={'main__sidebar'}>
      <div className={'sidebar__personal'}>
        <p className={'sidebar__personalName'}>Sergey.Ivanov</p>
        <div className={'sidebar__icon'}>
          <svg>
            <use xlinkHref="/img/icon/sprite.svg#logout"></use>
          </svg>
        </div>
      </div>
      <div className={'sidebar__block'}>
        <div className={'sidebar__list'}>
          <div className={'sidebar__item'}>
            <Link className={'sidebar__link'} href="#">
              <Image
                src="/img/playlist01.png"
                alt="day's playlist"
                width={250}
                height={170}
              />
            </Link>
          </div>
          <div className={'sidebar__item'}>
            <Link className={'sidebar__link'} href="#">
              <Image
                src="/img/playlist02.png"
                alt="day's playlist"
                width={250}
                height={170}
              />
            </Link>
          </div>
          <div className={'sidebar__item'}>
            <Link className={'sidebar__link'} href="#">
              <Image
                src="/img/playlist03.png"
                alt="day's playlist"
                width={250}
                height={170}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
