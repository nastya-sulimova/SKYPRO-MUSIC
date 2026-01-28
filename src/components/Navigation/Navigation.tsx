'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './navigation.module.css';
import { useRouter, usePathname } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { clearUser } from '@/store/features/authSlice';
import { setFavoriteTracks } from '@/store/features/trackSlice';

export default function Navigation() {
  const dispatch = useAppDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const { access } = useAppSelector((state) => state.auth);
  const router = useRouter();
  const pathname = usePathname();

  const handleBurgerClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    dispatch(clearUser());
    dispatch(setFavoriteTracks([]));
    if (pathname === '/music/favorite') {
      router.push('/music/main');
    }
  };

  return (
    <nav className={styles.main__nav}>
      <div className={styles.nav__logo}>
        <Image
          width={250}
          height={170}
          className={styles.logo__image}
          src="/img/logo.png"
          alt={'logo'}
        />
      </div>
      <div onClick={handleBurgerClick} className={styles.nav__burger}>
        <span className={styles.burger__line}></span>
        <span className={styles.burger__line}></span>
        <span className={styles.burger__line}></span>
      </div>
      <div
        className={`${styles.nav__menu} ${isMenuOpen ? styles.menu_open : ''}`}
      >
        <ul className={styles.menu__list}>
          <li className={styles.menu__item}>
            <Link href="/music/main" className={styles.menu__link}>
              Главное
            </Link>
          </li>

          {access && (
            <li className={styles.menu__item}>
              <Link href="/music/favorite" className={styles.menu__link}>
                Мой плейлист
              </Link>
            </li>
          )}

          <li className={styles.menu__item}>
            {access ? (
              <button onClick={handleLogout} className={styles.menu__link}>
                Выйти
              </button>
            ) : (
              <Link href="/auth/signin" className={styles.menu__link}>
                Войти
              </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}
