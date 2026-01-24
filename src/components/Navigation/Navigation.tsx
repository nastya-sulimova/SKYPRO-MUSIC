'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './navigation.module.css';
import { useRouter } from 'next/navigation';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const handleBurgerClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    setIsMenuOpen(!isMenuOpen);
  };

  const router = useRouter();
  const onEntrance = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    router.push('/auth/signin');
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
            <Link href="#" className={styles.menu__link}>
              Главное
            </Link>
          </li>
          <li className={styles.menu__item}>
            <Link href="#" className={styles.menu__link}>
              Мой плейлист
            </Link>
          </li>
          <li className={styles.menu__item}>
            {/* <Link href="../signin.html" className={styles.menu__link}>
              Войти
            </Link> */}
            <button onClick={onEntrance} className={styles.menu__link}>
              Войти
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
