<template>
  <div class="animation-container">
    <div v-for="n in 100" :key="n" class="circle-container">
      <div class="circle"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FadingLightsAnimation",
  data() {
    return {
      color: "hsl(180, 100%, 40%)",
    };
  },
};
</script>

<style lang="scss" scoped>

$primary-color:#dbdbdb; //#F5F5F5 //#c9c9c9; 
$primary-color-darker: #a6a6a6;

.animation-container {
  width: 0%;
}

// Animation
$particleBaseSize: 16;

.circle-container {
  $particleNum: 100;
  $particleColor: hsl(180, 100%, 40%);
  transform: translateX(-2 * $particleBaseSize + px);
  padding: 0;
  animation-iteration-count: infinite;
  animation-timing-function: linear;

  .circle {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    mix-blend-mode: screen;
    background-image: radial-gradient(hsl(180, 100%, 80%), hsl(180, 100%, 80%) 10%, hsla(180, 100%, 80%, 0) 56%);

    animation: fadein-frames 200ms infinite, scale-frames 2s infinite;

    @keyframes fade-frames {
      0% {
        opacity: 1;
      }

      50% {
        opacity: 0.7;
      }

      100% {
        opacity: 1;
      }
    }

    @keyframes scale-frames {
      0% {
        transform: scale3d(0.4, 0.4, 1);
      }

      50% {
        transform: scale3d(2.2, 2.2, 1);
      }

      100% {
        transform: scale3d(0.4, 0.4, 1);
      }
    }
  }

  @for $i from 1 through $particleNum {
    &:nth-child(#{$i}) {
      $circleSize: random($particleBaseSize);
      width: $circleSize + px;
      height: $circleSize + px;

      $startPositionY: random(10) + 100;
      $framesName: "move-frames-" + $i;
      $moveDuration: 28000 + random(9000) + ms;

      animation-name: #{$framesName};
      animation-duration: $moveDuration;
      animation-delay: random(37000) + ms;

      @keyframes #{$framesName} {
        from {
          transform: translate3d(#{random(100) + vw}, #{$startPositionY + vh}, 0);
        }

        to {
          transform: translate3d(#{random(100) + vw}, #{- $startPositionY - random(30) + vh}, 0);
        }
      }

      .circle {
        animation-delay: random(4000) + ms;
      }
    }
  }
}
</style>
