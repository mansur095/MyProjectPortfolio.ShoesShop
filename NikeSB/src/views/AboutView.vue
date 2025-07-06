<script setup>
import nikeSbLogo from '../assets/logo.svg';
import search from '../assets/search.svg';
import delivery from '../assets/delivery.svg';
import phone from '../assets/headphone.svg';
</script>

<template>
  <!-- Добавляем логотип Nike SB -->
  <div class="about">
    <div class="about-content">
      <h1>О нас – Nike SB Store</h1>
      <h2>Наша миссия</h2>
      <p>Мы – официальный партнер Nike SB в России, и наша цель – обеспечить вас лучшими кроссовками для скейтбординга и уличного стиля. Мы верим, что качественная обувь – это не просто аксессуар, а часть твоего образа жизни.</p>
      <!-- Добавляем иконки -->
      <div class="image-store">
        <img src="../assets/shoes-store.jpg" alt="shoes-store">
        <div class="image-shoes-about-us">
          <img src="../assets/shoes-about-us.jpg">
        </div>
      </div>
      <h2>Почему мы?</h2>
      <ul class="features-list">
        <li class="feature-item">
          <div class="feature-icon">
            <img 
              :src="nikeSbLogo" 
              alt="Nike SB Logo" 
              class="nike-sb-logo-about"
            />
          </div>

          <!-- Добавляем логотип Nike SB -->
          <div class="feature-text">
            <h3>Оригинальная продукция</h3>
            <p>только сертифицированные товары Nike SB</p>
          </div>
        </li>
        <li class="feature-item">
          <div class="feature-icon">
            <img 
              :src="search" 
              alt="Nike SB Logo" 
              class="nike-sb-logo-about"
            />
          </div>

          <!-- Добавляем иконку поиска -->
          <div class="feature-text">
            <h3>Экспертный подбор</h3>
            <p>помогаем выбрать идеальную пару под ваш стиль и потребности</p>
          </div>
        </li>
        <li class="feature-item">
          <div class="feature-icon">
            <img :src="delivery" alt="Nike SB Logo" class="nike-sb-logo-about"/>
          </div>

          <!-- Добавляем иконку доставки -->
          <div class="feature-text">
            <h3>Быстрая доставка</h3>
            <p>отправляем заказы по всей России в кратчайшие сроки</p>
          </div>
        </li>
        <li class="feature-item">
          <div class="feature-icon">
            <img 
              :src="phone" 
              alt="Nike SB Logo" 
              class="nike-sb-logo-about"
            />
          </div>

          <!-- Добавляем иконку телефона -->
          <div class="feature-text">
            <h3>Клиентский сервис</h3>
            <p>всегда на связи, чтобы ответить на любые вопросы</p>
          </div>
        </li>
      </ul>
      <h2>Наша история</h2>
      <p>Мы начали свой путь в 2015 году как небольшая команда энтузиастов скейтбординга. Сегодня мы – один из ведущих магазинов Nike SB, объединяющий профессионалов и любителей уличной культуры.</p>
      <h2>Присоединяйся к Nike SB Family!</h2>
      <p>Следи за новыми релизами, эксклюзивными коллаборациями и специальными предложениями в наших соцсетях.</p>
      <p class="accent">Nike SB Store – не просто магазин, а часть твоего движения!</p>
    </div>
  </div>
</template>



<style scoped>
* {
  font-family: Museo,Segoe UI,sans-serif;
}

/* Стили для компонента AboutView */
.image-store {
  position: relative;
}

.image-store img {
  width: 100%;
  border-radius: 20px;
  margin: 1rem 0 5rem 0;
  box-shadow: -8px 8px 24px 4px rgba(0, 0, 0, 0.445);
  z-index: 1;
}

.image-shoes-about-us {
  position: absolute;
  top: 25%;
  right: -90%;
}

.image-shoes-about-us img {
  z-index: 2;
  width: 35%;
  box-shadow: -4px -4px 35px 10px rgba(0, 0, 0, 0.801);
}

.about {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fafbfc;
  padding: 2rem 0;
}

.about-content {
  background: #fff;
  border-radius: 1.5rem;
  box-shadow: 0 2px 16px rgba(0,0,0,0.07);
  padding: 2.5rem 2rem;
  max-width: 700px;
  width: 100%;
  color: #222;
}

.about-content {
  font-size: 1.2rem;
  font-weight: 400;
  line-height: 1.8rem;
}

.about-content h1 {
  font-size: 2.4rem;
  line-height: 2rem;
  font-weight: 900;
  margin-bottom: 1.5rem;
  color: #111;
}

.about-content h2 {
  font-size: 1.3rem;
  margin-top: 1.5rem;
  margin-bottom: 0.7rem;
  font-weight: 800;
  color: #222;
}

.features-list {
  list-style: none;
  padding: 0;
  margin-top: 2rem;
}

.feature-item {
  display: flex;
  align-items: center;
  margin-bottom: 2.5rem;
}

.feature-icon {
  font-size: 2.5rem;
  color: #111;
  margin-right: 1.5rem;
  width: 50px;
  text-align: center;
}

.nike-sb-logo-about {
  width: 60px;
  height: auto;
}

.feature-text h3 {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
}

.feature-text p {
  font-size: 1rem;
  color: #555;
  line-height: 1.5;
}

.about-content ul {
  margin: 1rem 0 1.5rem 0;
  padding: 0;
}

.about-content li {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

.about-content .accent {
  color: #8a3127;
  font-weight: 600;
  margin-top: 2rem;
  font-size: 1.39rem;
}

@media (max-width: 540px) {

}
</style>
