<template>
  <v-container
    fill-height
    class="py-0 align-start"
    style="background-color: #eaf1ff"
  >
    <v-row>
      <TopNavigation name="Групповой объём" route="home" />
      <ProgressCircular v-if="isLoading" />
      <section v-else class="px-2 py-2 mx-2 my-3" style="width: 100%">
        <section
          class="px-1 py-2 mx-auto rounded-lg"
          style="max-width: 40rem; background-color: #fff"
        >
          <div class="px-1 mt-4 d-flex flex-nowrap">
            <p class="my-0 flex-grow-1" style="white-space: normal">
              Дистрибьютор
            </p>
            <p class="my-0 text-center">
              <span>Уровень </span>
              <v-icon
                color="green"
                @click="
                  $refs.downlineLPTree.updateAll(true)
                  levelLimit > 1 ? levelLimit-- : (levelLimit = 1)
                "
                >mdi-minus</v-icon
              >
              <span class="px-1">{{ levelLimit }}</span>

              <v-icon
                color="red"
                @click="
                  $refs.downlineLPTree.updateAll(true)
                  levelLimit < maxLevel ? levelLimit++ : (levelLimit = maxLevel)
                "
                >mdi-plus</v-icon
              >
            </p>
            <p class="my-0 text-center" style="width: 4rem">LP</p>
          </div>
          <v-row no-gutters class="justify-end">
            <p class="my-0 text-center">
              <span :class="totalLp.lp >= 100 ? 'green--text' : 'red--text'">{{
                totalLp.lp
              }}</span
              >/<span
                :class="totalLp.lpInReport >= 100 ? 'green--text' : 'red--text'"
                >{{ totalLp.lpInReport }}</span
              >
            </p>
          </v-row>
          <v-treeview
            ref="downlineLPTree"
            :items="limitedTree.children"
            item-text="name"
            item-key="id"
            dense
            open-all
          >
            <template #label="{ item }">
              <v-row
                no-gutters
                class="pl-1 flex-nowrap align-center text-body-2"
                style="width: 100%; border-bottom: 1px solid #eceff1"
                :style="
                  item.level % 2 === 0
                    ? 'border-left: 3px solid orange'
                    : 'border-left: 3px solid green'
                "
                @click="
                  $router.push({
                    name: 'downlineClientProfile',
                    params: { id: item.id, backRoute: 'downlineLP' }
                  })
                "
              >
                <v-col cols="8">
                  <p class="my-0" style="white-space: normal">
                    {{ item.name }}
                  </p>
                </v-col>
                <v-col cols="1">
                  <p class="my-0 text-center">
                    {{ item.level }}
                  </p>
                </v-col>
                <v-col cols="3">
                  <p class="my-0 text-right">
                    <span
                      :class="item.lp >= 100 ? 'green--text' : 'red--text'"
                      >{{ item.lp }}</span
                    >/<span
                      :class="
                        item.lpInReport >= 100 ? 'green--text' : 'red--text'
                      "
                      >{{ item.lpInReport }}</span
                    >
                  </p>
                </v-col>
              </v-row>
            </template>
          </v-treeview>
        </section>
      </section>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import TopNavigation from '@/components/TopNavigation.vue'
import ProgressCircular from '@/components/ProgressCircular.vue'
export default {
  components: {
    TopNavigation,
    ProgressCircular
  },
  data() {
    return {
      isLoading: false,
      levelLimit: 0
    }
  },
  computed: {
    ...mapState('user', ['downlineTree']),
    limitedTree() {
      const rows = []
      const scan = (tree, level) => {
        rows.push({
          id: tree.id,
          parent: tree.parent,
          level: level,
          name: tree.name,
          lp: tree.lp,
          lpInReport: tree.lpInReport,
          children: []
        })
        if (level < this.levelLimit && tree.children) {
          for (const el of tree.children) {
            scan(el, level + 1)
          }
        }
      }
      scan(this.downlineTree, 0)

      const idMapping = rows.reduce((acc, el, i) => {
        acc[el.id] = i
        return acc
      }, {})
      const root = rows[0]
      rows.forEach((el) => {
        if (el.parent != null) {
          const parentEl = rows[idMapping[el.parent]]
          parentEl.children = [...(parentEl.children || []), el]
        }
      })

      return root
    },
    totalLp() {
      let resultLp = 0
      let resultLpInReport = 0
      const scan = (tree) => {
        resultLp += tree.lp ? tree.lp : 0
        resultLpInReport += tree.lpInReport ? tree.lpInReport : 0
        if (tree.children) {
          for (const el of tree.children) {
            scan(el)
          }
        }
      }
      scan(this.limitedTree)
      return { lp: resultLp, lpInReport: resultLpInReport }
    },
    maxLevel() {
      let result = 0
      const scan = (tree, level) => {
        result = Math.max(result, level)
        if (tree.children) {
          for (const el of tree.children) {
            scan(el, level + 1)
          }
        }
      }
      scan(this.downlineTree, 0)
      return result
    }
  },
  created() {
    if (Object.keys(this.downlineTree).length === 0) {
      this.isLoading = true
      this.$store
        .dispatch('user/getDownlineTree')
        .then(() => {
          this.levelLimit = this.maxLevel
        })
        .finally(() => {
          this.isLoading = false
        })
    } else {
      this.levelLimit = this.maxLevel
    }
  }
}
</script>

<style lang="sass"></style>
