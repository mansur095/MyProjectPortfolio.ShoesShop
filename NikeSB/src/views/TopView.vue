<script setup lang="ts">
import { ref, onMounted, watch, onBeforeUnmount, nextTick } from 'vue'
import { gsap } from 'gsap'

const slides = [
  {
    id: 1,
    img: '/src/assets/top/S1.png',
    color: '#e5e4e2',
    accent: '#222',
    bg: '#e5e4e2',
    text: 'SNEA\nKER.',
    number: '01',
    circle: '#d1cecb',
  },
  {
    id: 2,
    img: '/src/assets/top/S2.png',
    color: '#b7e3d8',
    accent: '#2b5c4d',
    bg: '#b7e3d8',
    text: 'SNEA\nKER.',
    number: '02',
    circle: '#b7e3d8',
  },
  {
    id: 3,
    img: '/src/assets/top/S3.png',
    color: '#e7b1a7',
    accent: '#8a3127',
    bg: '#e7b1a7',
    text: 'SNEA\nKER.',
    number: '03',
    circle: '#e7b1a7',
  },
]

const current = ref(0)
const transitioning = ref(false)
const tapeTextsRef = ref<HTMLElement | null>(null)

function goTo(idx: number) {
  // Защита от повторных вызовов во время анимации и кликов на текущий слайд
  if (transitioning.value || idx === current.value) return
  
  transitioning.value = true
  const old = current.value
  current.value = idx
  
  // Анимация NIKE-ленты
  nextTick(() => {
    if (tapeTextsRef.value) {
      gsap.to(tapeTextsRef.value, {
        y: -((tapeTextsRef.value.clientHeight / 3) * idx),
        duration: 0.7,
        ease: 'power2.inOut',
      })
    }
  })

  // Анимация исчезновения старого слайда
  gsap.to(`.slide-img-${old}`, {
    scale: 0,
    x: 0,
    duration: 0.5,
    ease: "power2.in",
    onComplete: () => {
      // Только после полного исчезновения старого слайда начинаем показ нового
      gsap.fromTo(`.slide-img-${idx}`,
        { scale: 0, x: 0 }, // Начальное состояние
        {
          scale: 1,
          x: 0,
          duration: 0.6,
          ease: "power2.out",
          onComplete: () => {
            transitioning.value = false
          }
        }
      )
    }
  })
}

function next() {
  goTo((current.value + 1) % slides.length)
}

function prev() {
  goTo((current.value - 1 + slides.length) % slides.length)
}

let autoSlideInterval: ReturnType<typeof setInterval> | undefined

onMounted(() => {
  // Инициализация: показываем только первый слайд
  gsap.set('.slide-img-0', { scale: 1, x: 0 })
  for (let i = 1; i < slides.length; i++) {
    gsap.set(`.slide-img-${i}`, { scale: 0, x: 0 })
  }
  
  autoSlideInterval = setInterval(() => {
    if (!transitioning.value) { // Автопереход только если нет активной анимации
      next()
    }
  }, 5000)

  if (tapeTextsRef.value) {
    gsap.set(tapeTextsRef.value, { y: 0 })
  }
})

onBeforeUnmount(() => {
  clearInterval(autoSlideInterval)
})

watch(current, () => {
  // Сброс интервала при ручном переключении
  clearInterval(autoSlideInterval)
  autoSlideInterval = setInterval(() => {
    if (!transitioning.value) {
      next()
    }
  }, 5000)
})
</script>

<template>
  <div class="top-slider" :style="{ background: slides[current].bg }">
    <!-- Дуга на заднем плане -->
    <img src="/src/assets/top/Ellipse 1.png" alt="curve" class="curve-bg" />
    <div class="slider-content">
      <div class="slider-left">
        <div class="slide-number">{{ slides[current].number }}</div>
        <div class="slide-title" :style="{ color: slides[current].accent }">
          <span v-for="line in slides[current].text.split('\n')" :key="line">{{ line }}<br /></span>
        </div>
      </div>
      <div class="slider-center">
        <!-- Фоновое изображение и надписи NIKE -->
        <div class="nike-bg-img-wrapper">
          <img src="/src/assets/top/S-bg.png" alt="bg" class="nike-bg-img" />
          <div class="nike-bg-texts" ref="tapeTextsRef">
            <span v-for="i in 24" :key="i" class="nike-bg-text" :style="{ color: slides[current].color }">NIKE</span>
          </div>
        </div>
        <!-- Кроссовки -->
        <div
          v-for="(slide, idx) in slides"
          :key="slide.id"
          class="slide-img"
          :class="'slide-img-' + idx"
          :style="{ zIndex: idx === current ? 2 : 1, position: idx === current ? 'relative' : 'absolute' }"
        >
          <img :src="slide.img" :alt="'sneaker ' + slide.number" />
        </div>
      </div>
      <div class="slider-right">
        <div class="slider-nav">
          <button
            v-for="(slide, idx) in slides"
            :key="slide.id"
            :class="['slider-dot', { active: idx === current }]"
            @click="goTo(idx)"
            :style="{ borderColor: idx === current ? slides[current].accent : '#222' }"
          >
            {{ idx + 1 }}
          </button>
        </div>
        <button class="slider-next" @click="next">+</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap');

.top-slider {
  width: 99vw;
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  transition: background 0.5s;
}
.curve-bg {
  position: absolute;
  left: 0;
  top: 0;
  width: 80vw;
  height: auto;
  min-height: 480px;
  z-index: 0;
  pointer-events: none;
  user-select: none;
}
.slider-content {
  position: relative;
  z-index: 1;
  display: flex;
  width: 100vw;
  max-width: 1100px;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 0;
}
.slider-left {
  flex: 1 1 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding-left: 2vw;
}
.slide-number {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1.2rem;
  color: #222;
}
.slide-title.slide-title ::v-deep * {
    font-family: "Inter", sans-serif;
    font-size: 7.5rem;
    font-weight: 900 !important;
    line-height: 5rem;
    letter-spacing: -2px;
    text-transform: uppercase;
}
.slider-center {
  flex: 2 1 0;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  min-height: 320px;
}
.nike-bg-img-wrapper {
  position: absolute;
  left: 50%;
  top: 50%;
  border-radius: 30px;
  opacity: 0.8;
  transform: translate(-50%, -50%);
  width: 260px;
  height: 420px;
  z-index: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  overflow: hidden;
}g
.nike-bg-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 24px;
  background: #D9D9D9;
  overflow: hidden;
}
.nike-bg-texts {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  z-index: 1;
  pointer-events: none;
}
.nike-bg-text {
  font-size: 3.2rem;
  font-weight: 900;
  letter-spacing: -2px;
  opacity: 0.7;
  user-select: none;
  text-align: center;
  line-height: 1.1;
  text-shadow: 0 2px 8px rgba(0,0,0,0.04);
  transition: color 0.5s;
}
.slide-img {
  width: 420px;
  height: 260px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  transition: z-index 0.2s;
}
.slide-img img {
  width: 420px;
  height: 260px;
  object-fit: contain;
  filter: drop-shadow(0 8px 32px rgba(0,0,0,0.18));
}
.slider-right {
  flex: 0 0 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  padding-right: 2vw;
}
.slider-nav {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}
.slider-dot {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: 2px solid #222;
  background: #fff;
  color: #222;
  font-size: 1.2rem;
  font-weight: 700;
  cursor: pointer;
  transition: border 0.3s, color 0.3s;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
}
.slider-dot.active {
  border: 2.5px solid var(--accent, #222);
  color: var(--accent, #222);
}
.slider-next {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  padding-bottom: 0.2rem;
  border: none;
  background: #fff;
  color: #222;
  font-size: 2rem;
  font-weight: 900;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  transition: background 0.2s, color 0.2s;
}
.slider-next:hover {
  background: #222;
  color: #fff;
}
@media (max-width: 900px) {
  .slider-content {
    flex-direction: column;
    align-items: center;
    padding: 1rem 0;
  }
  .slider-left, .slider-right {
    padding: 0;
    align-items: center;
  }
  .slide-title {
    font-size: 2.1rem;
    line-height: 2.2rem;
  }
  .slide-img, .slide-img img {
    width: 260px;
    height: 160px;
  }
  .nike-bg-img-wrapper {
    width: 120px;
    height: 180px;
  }
  .nike-bg-text {
    font-size: 1.2rem;
  }
}
</style>
