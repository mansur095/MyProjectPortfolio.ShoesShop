<script setup lang="ts">
import bannerImg from '../assets/banner-shoes.jpg';
import nikeSbHome from '../assets/nike-home-logo.svg';
import run from '../assets/run.svg';
import thread from '../assets/thread.svg';
import shield from '../assets/shield.svg';
import design from '../assets/design.svg';
import comfort from '../assets/comfort.svg';
import basket from '../assets/basket.svg';
import box from '../assets/delivery-box.svg';
</script>

<template>
  <div class="home">
    <div class="container-1">
      <img 
        class="banner-img" 
        :src="bannerImg" 
        alt="Nike SB Shoes" 
      />
      <div class="banner-overlay"></div>
      <div class="banner-content">
        <img 
        :src="nikeSbHome" 
        alt="Nike SB Logo" 
        class="nike-sb-home"
        style="filter: drop-shadow(0 0 3px white) drop-shadow(0 0 3px white);"
        />
        <h1 class="banner-title">Добро пожаловать в мир Nike SB – стиль, комфорт и качество!</h1>
        <p class="banner-subtitle">Лучшие кроссовки для скейтбординга</p>
      </div>
    </div>
    <div class="container-info-selections">
      <div class="info-selection">
        <h2>Nike SB!</h2>
        <div class="feature-icon">
            <img :src="run" alt="run" class="nike-sb-logo-about"/>
          </div>
        <p class="accent">Лучшие кроссовки для скейтеров и не только!</p>
        <p>Nike SB – это не просто обувь, а настоящая легенда уличной культуры. Если ты ценишь удобство, прочность и стильный дизайн, ты в нужном месте!</p>
      </div>
      <div class="info-selection">
        <h2>Почему Nike SB?</h2>
        <ul class="list-shoes">
          <li>
            <img 
            :src="thread" 
            alt="run" 
            class="nike-sb-logo-home"/>
            Идеальная посадка – технологичная колодка для максимального контроля доски.</li>
          <li><img 
            :src="shield" 
            alt="run" 
            class="nike-sb-logo-home"/> Усиленная износостойкость – прочные материалы для долгой носки.</li>
          <li><img 
            :src="design" 
            alt="run" 
            class="nike-sb-logo-home"/> Современный дизайн – от классических силуэтов до ярких коллабораций.</li>
          <li><img 
            :src="comfort" 
            alt="run" 
            class="nike-sb-logo-home"/> Комфорт на весь день – амортизация и поддержка стопы.</li>
        </ul>
      </div>
      <div class="info-selection">
        <h2>Хиты продаж</h2>
        <ul>
          <li>  Nike SB Dunk Low – легендарная модель с культовым дизайном.</li>
          <li>Nike SB Zoom Blazer – классика с улучшенной амортизацией.</li>
          <li>Nike SB Janoski – минимализм и удобство от именитого скейтера.</li>
        </ul>
        <p class="accent"><img 
            :src="basket" 
            alt="run" 
            class="logo-home"/> Выбирай свою пару и заказывай прямо сейчас!<br><img 
            :src="box" 
            alt="run" 
            class="logo-home"/> Бесплатная доставка при заказе от 10 000 ₽!</p>
        <p class="final">Nike SB – для тех, кто не стоит на месте!</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home {
  padding: 0;
  overflow-x: hidden;
  font-family: Museo,Segoe UI,sans-serif;
}

.accent {
  font-size: 1.5rem;
  font-weight: 300;
  line-height: 2rem;
}

.container-1 {
  width: 100vw;
  position: relative;
  left: 0;
  margin-left: 0;
  margin-right: 0;
  overflow: hidden;
}

.banner-img {
  width: 100vw;
  height: 800px;
  object-fit: cover;
  display: block;
}

.banner-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 800px;
  background: rgba(0,0,0,0.6);
  z-index: 2;
}

.banner-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 3;
  text-align: center;
  color: #fff;
  width: 100vw;
}

.banner-title {
  font-size: 3rem;
  font-weight: 900;
  color: white;
  margin-bottom: 1rem;
  text-shadow: 0 2px 16px rgba(0,0,0,0.4);
}

.banner-subtitle {
  font-size: 2.2rem;
  font-weight: 400;
  text-shadow: 0 2px 8px rgba(0,0,0,0.3);
}

.container-info-selections {
  display: flex;
  gap: 2rem;
  justify-content: center;
  align-items: stretch;
  width: 100%;
  margin: 2.5rem 0;
  padding: 0 2vw;
}

.feature-icon {
  font-size: 2.5rem;
  color: #111;
  margin-right: 1.5rem;
  width: 50px;
  text-align: center;
}

.nike-sb-home {
  width: 200px;
  height: auto;
}

.nike-sb-logo-about {
  width: 60px;
  height: auto;
}

.nike-sb-logo-home {
  width: 40px;
  height: auto;
  margin-right: 0.7rem;
}

.logo-home {
  width: 40px;
  height: auto;
  margin-right: 0.1rem;
}

.list-shoes {
  list-style: none;
}

.info-selection {
  flex: 1 1 0;
  min-width: 220px;
  background: #fff;
  border-radius: 1.5rem;
  box-shadow: 0 2px 16px rgba(0,0,0,0.07);
  padding: 3.5rem 3rem;
  color: #222;
  font-size: 1.1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.info-selection:hover {
  transform: translateY(-5px) scale(1.02);
  box-shadow: 0 8px 32px rgba(0,0,0,0.12);
}

.info-selection h2 {
  font-size: 1.7rem;
  margin-bottom: 1rem;
  line-height: 1.1rem;
  font-weight: 900;
  text-transform: uppercase;
}

.info-selection p {
  font-size: 1.3rem;
  font-weight: 500;
  line-height: 1.8rem;
}

.info-selection ul {
  margin: 1rem 0 1.5rem 1.2rem;
  padding: 0;
  text-align: left;
}

.info-selection li {
  font-size: 1.3rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  line-height: 1.8;
}

.info-selection .accent {
  font-size: 1.3rem;
  color: #8a3127;
  font-weight: 600;
  margin: 1rem 0;
}

.info-selection .final {
  margin-top: 2rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: #111;
}

@media (max-width: 1100px) {
  .container-info-selections {
    flex-direction: column;
    gap: 1.5rem;
    max-width: 700px;
    margin: 2.5rem auto;
  }
}

@media (max-width: 700px) {
  .banner-img, .banner-overlay {
    height: 220px;
    min-height: 220px;
    max-height: 220px;
  }
  .banner-title {
    font-size: 2rem;
  }
  .banner-subtitle {
    font-size: 1rem;
  }
  .info-selection {
    padding: 1.2rem 0.5rem;
  }
}

</style>
