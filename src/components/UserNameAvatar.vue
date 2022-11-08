<template>
  <section v-if="userData" class="user-data">
    <section class="user-avatar">
      <div class="user-avatar__container">
        <img
          v-if="userData.image"
          class="user-avatar__image"
          alt="Аватар"
          :src="'data:image/jpeg;base64,' + userData.image"
        />

        <IconCabinet
          v-else
          class="user-avatar__placeholder"
          width="90"
          height="90"
        />
      </div>
      <input
        v-show="false"
        id="fileField"
        type="file"
        accept="image/x-png,image/jpeg"
        :disabled="readOnly"
        @change="pickImage"
      />
      <label for="fileField" class="user-avatar__label font-13-regular">
        Загрузить фото
      </label>
    </section>
    <section class="user-info">
      <p class="user-info__name font-24-regular">
        {{ userData.fio }}
      </p>
      <p class="user-info__id font-14-regular-caps">
        ID: {{ userData.id4Life }}
      </p>
      <DepartmentIconTitle
        class="user-info__department"
        :department-name="userData.departmentName"
      />
    </section>
  </section>
</template>

<script>
import DepartmentIconTitle from '@/components/DepartmentIconTitle.vue'
import IconCabinet from '@/components/icons/IconCabinet.vue'
import Compressor from 'compressorjs'
export default {
  name: 'UserNameAvatar',
  components: {
    DepartmentIconTitle,
    IconCabinet
  },
  props: {
    readOnly: {
      type: Boolean,
      default: false
    },
    infoSource: {
      type: String,
      default: 'user'
    },
    backRoute: {
      type: String,
      default: ''
    },
    backRouteProps: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  computed: {
    userData() {
      if (this) {
        return this.$store.getters[`${this.infoSource}/userData`]
      } else {
        return undefined
      }
    }
  },
  methods: {
    pickImage(event) {
      const file = event.target.files[0]
      const thisStore = this.$store
      const dispatchParams = `${this.infoSource}/setUserImage`
      new Compressor(file, {
        quality: 0.9,
        maxWidth: 300,
        maxHeight: 300,
        success(result) {
          const fileReader = new FileReader()
          fileReader.readAsDataURL(result)
          fileReader.onloadend = () => {
            const base64String = fileReader.result
            const base64StringNoTags = base64String.substr(
              base64String.indexOf(',') + 1
            )
            thisStore.dispatch(dispatchParams, base64StringNoTags)
          }
        },
        error(err) {
          console.log(err.message)
        }
      })
    }
  }
}
</script>

<style scoped>
.user-data {
  display: flex;
  align-items: center;
  padding: 0 20px;
}
.user-avatar__container {
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.user-avatar__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}
.user-avatar__placeholder {
  color: var(--gray-1);
}
.user-avatar__label {
  color: var(--gray-1);
  display: block;
  text-align: center;
  margin-top: 10px;
}
.user-info {
  margin-left: 20px;
}
.user-info__name {
  color: var(--black-1);
}
.user-info__id {
  color: var(--black-1);
  margin-top: 8px;
}
.user-info__department {
  margin-top: 8px;
}
</style>
