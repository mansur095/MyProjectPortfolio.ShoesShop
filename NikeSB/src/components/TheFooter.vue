<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-columns">
        <div class="footer-col">
          <h4>Покупателям</h4>
          <ul>
            <li><a href="#">Частые вопросы</a></li>
            <li><a href="#">Доставка и оплата</a></li>
            <li><a href="#">Юридическая информация</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>О компании</h4>
          <ul>
            <li><a href="#">О нас</a></li>
            <li><a href="#">Контакты</a></li>
            <li><a href="#">Вакансии</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Наши проекты</h4>
          <ul>
            <li><a href="#">NikeSB Guru</a></li>
            <li><a href="#">NikeSB Stream</a></li>
          </ul>
        </div>
        <div class="footer-col social-col">
          <h4>Мы в соцсетях</h4>
          <div class="footer-social">
            <a href="#" aria-label="VK"><i class="fab fa-vk"></i></a>
            <a href="#" aria-label="Telegram"><i class="fab fa-telegram"></i></a>
            <a href="#" aria-label="YouTube"><i class="fab fa-youtube"></i></a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <div class="footer-copyright">
          © NikeSB 2024. Все права защищены.
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: #232424;
  color: #e0e0e0;
  padding: 2.5rem 0 1.2rem 0;
  font-size: 1rem;
  margin-top: 0.7rem;
  width: 99vw;
  position: relative;
}
.footer-content {
  max-width: 1300px;
  margin: 0 auto;
  padding: 0 2rem;
  width: 100%;
}
.footer-columns {
  display: flex;
  gap: 2.5rem;
  justify-content: space-between;
  flex-wrap: wrap;
}
.footer-col {
  min-width: 180px;
  flex: 1 1 0;
  margin-bottom: 1.5rem;
}
.footer-col h4 {
  color: #fff;
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 1rem;
}
.footer-col ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.footer-col li {
  margin-bottom: 0.7rem;
}
.footer-col a,
.footer-col a:hover,
.footer-col a:active,
.footer-col a:focus {
  background: transparent !important;
  color: #e0e0e0;
  text-decoration: none;
  transition: color 0.2s;
}
.footer-col a:hover {
  color: #fff;
  text-decoration: underline;
}
.footer-social {
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
}
.footer-social a {
  color: #e0e0e0;
  font-size: 1.5rem;
  transition: color 0.2s;
}
.footer-social a:hover {
  color: #fff;
}
.footer-bottom {
  border-top: 1px solid #333;
  margin-top: 1.5rem;
  padding-top: 1rem;
  text-align: center;
  font-size: 0.95rem;
  color: #aaa;
}
@media (max-width: 900px) {
  .footer-columns {
    flex-direction: column;
    gap: 1.5rem;
  }
  .footer-content {
    padding: 0 1rem;
  }
}
</style> 