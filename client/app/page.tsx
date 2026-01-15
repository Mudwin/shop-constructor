'use client';

import styles from './styles/page.module.css';
import CustomButton from '../src/components/CustomButton/CustomButton';

export default function HomePage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles['header-content']}>
          <div className={styles.logo}></div>
          <nav className={styles.nav}>
            <a href="#" className={`${styles['nav-link']} ${styles.active}`}>
              Главная
            </a>
            <a href="#" className={styles['nav-link']}>
              Каталог
            </a>
            <a href="#" className={styles['nav-link']}>
              О нас
            </a>
            <a href="#" className={styles['nav-link']}>
              Отзывы
            </a>
            <a href="#" className={styles['nav-link']}>
              Контакты
            </a>
          </nav>
          <CustomButton
            buttonType="add"
            fontSize={15}
            paddingInline={30}
            type="button"
            href="/auth/login"
          >
            Вход
          </CustomButton>
        </div>
      </header>

      <main className={styles.main}>
        <h2 className={styles.subtitle}>Как это работает?</h2>
        <h1 className={styles.title}>
          Создайте сайт за <span className={styles.highlight}>3</span> простых шага
        </h1>

        <div className={styles.stepsContainer}>
          <div className={styles.stepCard}>
            <div className={styles.stepNumberContainer}>
              <span className={styles.stepNumber}>1</span>
            </div>
            <h3 className={styles.stepTitle}>Шаблон</h3>
            <p className={styles.stepDescription}>
              Более 300 готовых дизайнов под разные хобби — от рукоделия и фотографии до
              онлайн-курсов и услуг. Каждый шаблон адаптивный и красивый из коробки. Просто выберите
              подходящий и начните редактировать.
            </p>
          </div>

          <div className={styles.stepCard}>
            <div className={styles.stepNumberContainer}>
              <span className={styles.stepNumber}>2</span>
            </div>
            <h3 className={styles.stepTitle}>Контент</h3>
            <p className={styles.stepDescription}>
              Добавляйте текст, фото, видео и товары с помощью простого drag-and-drop редактора. Без
              кода и дизайнеров — всё интуитивно и быстро. Сделайте сайт полностью своим за
              считанные минуты.
            </p>
          </div>

          <div className={styles.stepCard}>
            <div className={styles.stepNumberContainer}>
              <span className={styles.stepNumber}>3</span>
            </div>
            <h3 className={styles.stepTitle}>Оплата</h3>
            <p className={styles.stepDescription}>
              Интегрируйте ЮKassa, Сбер или Tinkoff в один клик. Принимайте заказы, продавайте
              курсы, услуги или товары. Начните зарабатывать на хобби уже сегодня.
            </p>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <div className={styles['footer-content']}>
          <div className={styles['footer-column']}>
            <div className={`${styles.logo} ${styles['footer-logo']}`}></div>
          </div>

          <div className={styles['footer-column']}>
            <h4 className={styles['footer-mini-title']}>Всегда рядом</h4>
            <a href="mailto:tech.help@gmail.com" className={styles['footer-link']}>
              tech.help@gmail.com
            </a>
            <a href="tel:88005553535" className={styles['footer-link']}>
              8-800-555-35-35
            </a>
          </div>

          <div className={styles['footer-column']}>
            <a href="#" className={styles['footer-link']}>
              Политика конфиденциальности
            </a>
            <a href="#" className={styles['footer-link']}>
              Уголок потребителя
            </a>
            <a href="#" className={styles['footer-link']}>
              Правовая информация
            </a>
          </div>

          <div className={styles['footer-column']}>
            <h4 className={styles['footer-mini-title']}>Больше информации здесь</h4>
            <div className={styles.socialIcons}>
              <div className={`${styles.socialIcon} ${styles.telegram}`}></div>
              <div className={`${styles.socialIcon} ${styles.vk}`}></div>
              <div className={`${styles.socialIcon} ${styles.youtube}`}></div>
            </div>
          </div>

          <div className={styles['footer-column']}>
            <a href="#" className={styles['footer-link']}>
              Узнать о Cookie
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
