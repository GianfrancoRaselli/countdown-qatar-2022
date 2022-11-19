<template>
  <div class="content">
    <div
      class="animation-button element-tooltip"
      @click="
        () => {
          if (animations) pauseAnimations();
          else playAnimations();
        }
      "
    >
      <span class="tooltip" v-text="(animations ? 'Pause' : 'Play') + ' animations'" />
      <fa-icon icon="play" class="icon" v-if="!animations" />
      <fa-icon icon="pause" class="icon" v-else />
    </div>

    <div class="header">
      <img class="img" src="@/assets/logo.jpeg" />
    </div>

    <div class="countdown">
      <h1 class="title">Partido Inagural Copa del Mundo Qatar 2022</h1>

      <div class="elements">
        <CountdownElement title="Horas" :num="hours" />
        <CountdownElement title="Minutos" :num="minutes" />
        <CountdownElement title="Segundos" :num="seconds" />
      </div>
    </div>

    <img class="img cup-img" src="@/assets/cup.jpg" />
  </div>
</template>

<script>
import { animateCSS } from '@/helpers';
import CountdownElement from '@/components/CountdownElement';

export default {
  name: 'App',
  components: {
    CountdownElement,
  },
  data() {
    return {
      distance: 0,
      dateTo: new Date('2022-11-20T16:00:00+00:00'),
      intervalSubscription: null,
      animations: false,
      imgHeaderAnimationSubscription: null,
      titleAnimationSubscription: null,
    };
  },
  computed: {
    hours() {
      const days = Math.floor(this.distance / (1000 * 60 * 60 * 24));
      const hours = days * 24 + Math.floor((this.distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      if (hours < 10) return '0' + hours;
      return hours;
    },

    minutes() {
      const minutes = Math.floor((this.distance % (1000 * 60 * 60)) / (1000 * 60));
      if (minutes < 10) return '0' + minutes;
      return minutes;
    },

    seconds() {
      const seconds = Math.floor((this.distance % (1000 * 60)) / 1000);
      if (seconds < 10) return '0' + seconds;
      return seconds;
    },
  },
  methods: {
    playAnimations() {
      if (!this.imgHeaderAnimationSubscription)
        this.imgHeaderAnimationSubscription = setInterval(function () {
          animateCSS('.header .img', 'flip');
        }, 1000 * 10);
      if (!this.titleAnimationSubscription)
        setTimeout(
          function () {
            if (!this.titleAnimationSubscription && this.animations)
              this.titleAnimationSubscription = setInterval(function () {
                animateCSS('.countdown .title', 'bounceIn');
              }, 1000 * 10);
          }.bind(this),
          1000 * 3,
        );

      this.animations = true;
    },

    pauseAnimations() {
      if (this.imgHeaderAnimationSubscription) {
        clearInterval(this.imgHeaderAnimationSubscription);
        this.imgHeaderAnimationSubscription = null;
      }
      if (this.titleAnimationSubscription) {
        clearInterval(this.titleAnimationSubscription);
        this.titleAnimationSubscription = null;
      }

      this.animations = false;
    },
  },
  created() {
    // set animations
    this.playAnimations();

    // set countdown
    const computeDistanceFromNow = () => {
      const distance = this.dateTo.getTime() - new Date().getTime();
      if (distance < 0) this.distance = 0;
      return (this.distance = distance);
    };
    computeDistanceFromNow();
    this.intervalSubscription = setInterval(function () {
      computeDistanceFromNow();
    }, 1000);
  },
  unmounted() {
    if (this.imgHeaderAnimationSubscription) clearInterval(this.imgHeaderAnimationSubscription);
    if (this.titleAnimationSubscription) clearInterval(this.titleAnimationSubscription);
    if (this.intervalSubscription) clearInterval(this.intervalSubscription);
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Arvo:ital@1&display=swap');
@import '~bootstrap/dist/css/bootstrap.min.css';
@import 'animate.css';

* {
  box-sizing: border-box;
}

body {
  font-family: 'Arvo', serif;
}

.content {
  background: #bdc3c7; /* fallback for old browsers */
  background: -webkit-linear-gradient(to top, #2c3e50, #8f9193); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to top, #2c3e50, #8f9193); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  min-height: 100vh;
  height: 100%;
  width: 100%;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3rem;
}

.animation-button {
  user-select: none;
  position: fixed;
  top: 0.4rem;
  right: 0.4rem;
  height: 2.5rem;
  width: 2.5rem;
  border: 0.15rem solid;
  border-radius: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.animation-button:hover {
  cursor: pointer;
  background-color: rgba(131, 131, 131, 0.614);
}

.element-tooltip .tooltip {
  position: absolute;
  z-index: 1;
  top: 50%;
  transform: translateY(-50%);
  right: 130%;
  visibility: hidden;
  text-align: center;
  color: #fff;
  background-color: #555;
  width: max-content;
  padding: 0.3rem;
  border-radius: 0.3rem;
  opacity: 0;
  transition: opacity 0.3s;
}

.element-tooltip .tooltip::after {
  content: '';
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 100%;
  margin-left: -0.1rem;
  border-width: 0.4rem;
  border-style: solid;
  border-color: transparent transparent transparent #555;
}

.element-tooltip:hover .tooltip {
  visibility: visible;
  opacity: 1;
}

.img {
  user-select: none;
  border-radius: 0.8rem;
}

.header {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.header .img {
  height: 12rem;
  width: 25rem;
}

.countdown {
  text-align: center;
  color: rgb(255, 250, 245);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
}

.countdown .elements {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 2rem;
}

.cup-img {
  display: none;
}

@media (max-width: 700px) {
  html {
    font-size: 70%;
  }
}

@media (max-width: 400px) {
  .content {
    justify-content: start;
  }

  .cup-img {
    display: block;
    height: auto;
    width: 100%;
  }
}

@media (max-width: 300px) {
  .countdown .elements {
    flex-direction: column;
  }
}
</style>
