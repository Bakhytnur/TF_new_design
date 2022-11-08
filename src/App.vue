<template>
  <div>
    <NotificationsList v-if="notificationsView" />
    <AppHeader v-if="isSignedIn" />

    <main>
      <div class="app-container">
        <transition name="router-view" mode="in-out">
          <router-view></router-view>
        </transition>
      </div>
      <canvas
        v-if="showCanvas"
        ref="myCanvas"
        width="500"
        height="200"
        style="border: 1px solid #000000"
      />
    </main>

    <AppFooter v-if="isSignedIn" />
  </div>
</template>

<script>
import fileOffer from 'raw-loader!@/assets/offer.html'
import AppHeader from '@/components/AppHeader'
import AppFooter from '@/components/AppFooter.vue'
import NotificationsList from '@/components/NotificationsList.vue'
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'App',
  components: {
    AppFooter,
    AppHeader,
    NotificationsList
  },
  data() {
    return {
      showCanvas: true
    }
  },
  computed: {
    ...mapGetters('user', ['isSignedIn']),
    ...mapState(['notificationsView'])
  },
  created() {
    this.clearCaches()
    this.$store.dispatch('loadOffer', fileOffer)
  },
  mounted() {
    let hash = ''
    try {
      const canvas = this.$refs.myCanvas
      hash = this.getCanvasHash(canvas)
    } finally {
      this.showCanvas = false
    }
    this.$store.dispatch('user/setClientHash', hash)
  },
  methods: {
    clearCaches() {
      caches.keys().then((cacheNames) => {
        Promise.all(
          cacheNames.map((cache) => {
            caches.delete(cache)
          })
        )
      })
    },
    getCanvasHash(canvas) {
      const ctx = canvas.getContext('2d')

      // ctx.fillStyle = 'rgb(255,0,255)'
      // ctx.beginPath()
      // ctx.rect(20, 20, 150, 100)
      // ctx.fill()
      // ctx.stroke()
      // ctx.closePath()
      // ctx.beginPath()
      // ctx.fillStyle = 'rgb(0,255,255)'
      // ctx.arc(50, 50, 50, 0, Math.PI * 2, true)
      // ctx.fill()
      // ctx.stroke()
      // ctx.closePath()

      // const txt = 'abz190#$%^@£éú'
      // ctx.textBaseline = 'top'
      // ctx.font = '17px "Arial 17"'
      // ctx.textBaseline = 'alphabetic'
      // ctx.fillStyle = 'rgb(255,5,5)'
      // ctx.rotate(0.03)
      // ctx.fillText(txt, 4, 17)
      // ctx.fillStyle = 'rgb(155,255,5)'
      // ctx.shadowBlur = 8
      // ctx.shadowColor = 'red'
      // ctx.fillRect(20, 12, 100, 5)

      // Text with lowercase/uppercase/punctuation symbols
      var txt =
        '❁ I Want me a Tasty Fruit Salad!\n\r <🍏🍎🍐🍊🍋🍌🍉🍇🍓🍈🍒🍑🍍🥝>'
      ctx.textBaseline = 'top'

      // The most common type
      ctx.font = "14px 'Arial'"
      ctx.textBaseline = 'alphabetic'
      ctx.fillStyle = '#f60'
      ctx.fillRect(125, 1, 62, 20)

      // Some tricks for color mixing to increase the difference in rendering
      ctx.fillStyle = '#069'
      ctx.fillText(txt, 2, 15)
      ctx.fillStyle = 'rgba(102, 204, 0, 0.7)'
      ctx.fillText(txt, 4, 17)

      // canvas blending
      // http://blogs.adobe.com/webplatform/2013/01/28/blending-features-in-canvas/
      // http://jsfiddle.net/NDYV8/16/
      ctx.globalCompositeOperation = 'multiply'
      ctx.fillStyle = 'rgb(255,0,255)'
      ctx.beginPath()
      ctx.arc(50, 50, 50, 0, Math.PI * 2, true)
      ctx.closePath()
      ctx.fill()
      ctx.fillStyle = 'rgb(0,255,255)'
      ctx.beginPath()
      ctx.arc(100, 50, 50, 0, Math.PI * 2, true)
      ctx.closePath()
      ctx.fill()
      ctx.fillStyle = 'rgb(255,255,0)'
      ctx.beginPath()
      ctx.arc(75, 100, 50, 0, Math.PI * 2, true)
      ctx.closePath()
      ctx.fill()
      ctx.fillStyle = 'rgb(255,0,255)'

      // canvas winding
      // http://blogs.adobe.com/webplatform/2013/01/30/winding-rules-in-canvas/
      // http://jsfiddle.net/NDYV8/19/
      ctx.arc(75, 75, 75, 0, Math.PI * 2, true)
      ctx.arc(75, 75, 25, 0, Math.PI * 2, true)
      ctx.fill('evenodd')

      const src = canvas.toDataURL()

      // SHA-256 encoding
      // const msgUint8 = new TextEncoder().encode(src)
      // crypto.subtle.digest('SHA-256', msgUint8).then((hashBuffer) => {
      //   const hashArray = Array.from(new Uint8Array(hashBuffer))
      //   const hashHex = hashArray
      //     .map((b) => b.toString(16).padStart(2, '0'))
      //     .join('')
      //   console.log(hashHex)
      // })

      let hash = 0
      for (let i = 0; i < src.length; i++) {
        const char = src.charCodeAt(i)
        hash = (hash << 5) - hash + char
        hash = hash & hash
      }

      return hash
    }
  }
}
</script>

<style scoped>
main {
  background: var(--blue-3);
  min-height: 100vh;
  display: flex;
  justify-content: center;
}
.router-view-enter-active,
.router-view-leave-active {
  position: fixed;
  width: 100%;
  background: var(--blue-3);
  min-height: var(--content-height);
  top: 0;
  /* top: var(--header-height); */
}
.router-view-enter-active {
  transition: transform 0.3s ease-in-out;
  z-index: 100;
  transform: translateX(100%);
}
.router-view-enter-to {
  z-index: 100;
  transform: translateX(0%);
}
.router-view-leave-active {
  z-index: -1;
}
.router-view-leave-to {
  z-index: -1;
}
</style>
