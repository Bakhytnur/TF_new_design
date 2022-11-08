<template>
  <div class="content-frame">
    <TopNavigation title="Контроль структуры" route="home" />
    <section class="structure-control">
      <div class="structure-control__input-icon">
        <input
          class="structure-control__input font-12-regular"
          type="text"
          value="Введите фамилию или ID"
        />
      </div>
      <div class="line"></div>
      <ul class="structure-control-list__data-ul">
        <!--li
          v-for="partner in partnersList"
          :key="partner.id"
          class="structure-control-list__data-ul-li"
        >
          <PartnerItem
            :title="partner.title"
            :subtitle="partner.subtitle"
            :value="partner.value"
            :level="partner.level"
            :id="partner.id"
            :subpartners="partner.subpartners"
            :subpartners2="partner.subpartners"
            :items="limitedTree.children"
          />
        </li-->
        <li
          v-for="partner in downlineTree.children"
          :key="partner.id"
          class="structure-control-list__data-ul-li"
        >
          <PartnerItem
            :id="partner.id"
            :level="partner.level"
            :lp="lp"
            :lpInReport="partner.lpInReport"
            :name="partner.name"
            :parent="partner.parent"
            :subpartners="partner.children"
            :items="limitedTree"
          />
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import TopNavigation from '@/components/TopNavigation.vue'
import PartnerItem from '@/components/PartnerItem.vue'
export default {
  components: {
    TopNavigation,
    PartnerItem
  },
  data() {
    return {
      showCard: false,
      i: -2,
      j: 0,
      hideFirst: false,
      partnersList: [
        {
          id: 1,
          name: 'Васильева Софья',
          nId: '5569812',
          lp: '0 / 190',
          level: 1,
          children: [
            {
              id: 4,
              subid: 1,
              name: 'Кузьмина Анастасия',
              nId: '5569814',
              lp: '0 / 291',
              level: 2
            },
            {
              id: 5,
              subid: 1,
              name: 'Курнова Анастасия',
              nId: '5569814',
              lp: '0 / 292',
              level: 2
            }
          ]
        },
        {
          id: 2,
          name: 'Васильева Анастасия',
          nId: '5569814',
          lp: '0 / 290',
          level: 1,
          children: [
            {
              id: 6,
              subid: 2,
              name: 'Ванина Женя',
              nId: '5569817',
              lp: '0 / 293',
              level: 2,
              children: [
                {
                  id: 7,
                  subid: 2,
                  name: 'Ванина Елена',
                  nId: '5569818',
                  lp: '0 / 293',
                  level: 3,
                  children: [
                    {
                      id: 8,
                      subid: 2,
                      name: 'Ванина Мия',
                      nId: '5569819',
                      lp: '0 / 293',
                      level: 4
                    }
                  ]
                },
                {
                  id: 9,
                  subid: 3,
                  name: 'Ванина Валерия',
                  nId: '5569818',
                  lp: '0 / 293',
                  level: 3,
                  children: []
                }
              ]
            },
            {
              id: 10,
              subid: 2,
              name: 'Вернова Анастасия',
              nId: '5569814',
              lp: '0 / 294',
              level: 2
            }
          ]
        },
        {
          id: 3,
          name: 'Васильев Алексей',
          nId: '5569816',
          lp: '0 / 350',
          level: 1,
          children: [
            {
              id: 11,
              subid: 3,
              name: 'Ванина Женя',
              nId: '5569814',
              lp: '0 / 295',
              level: 2
            },
            {
              id: 12,
              subid: 3,
              name: 'Вернова Ира',
              nId: '5569814',
              lp: '0 / 296',
              level: 2
            }
          ]
        }
      ]
    }
  },
  computed: {
    ...mapState('user', ['distributorData']),
    ...mapState('user', ['downlineTree']),

    efficiencyRatio() {
      return Math.round(
        (100 * this.distributorData.activeClientsCount) /
          this.distributorData.clientsCount
      )
    },
    efficiencySubtitle() {
      if (this.efficiencyRatio < 33) {
        return 'Низкий КПД – ваши подписчики неохотно интересуются приложением, скорее узнайте у них, в чем заключаются трудности'
      } else if (this.efficiencyRatio < 81) {
        return 'Нормальный КПД. Продолжайте делиться приложением и улучшайте результат, чтобы максимум подписчиков владело ценной информацией и присоединялось к команде!'
      } else {
        return 'Отличный результат! Большинство Ваших подписчиков активно используют приложение, ускоряя Ваш прогресс в построении структуры!'
      }
    },
    hideFirstWindow() {
      switch (this.j) {
        case 1:
          return 1
        case 2:
          return 2
        case 3:
          return 3
        default:
          return 1
      }
    },
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
  methods: {
    openCard() {
      this.showCard = true
      this.j = this.j + 1
    },
    closeCard() {
      this.showCard = false
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

<style scoped>
.structure-control__input {
  width: 100%;
  color: var(--gray-1);
  /*border-bottom: 2px solid var(--gray-1);
  margin-bottom: 10px;*/
}
.structure-control {
  background: var(--white-1);
  box-shadow: 0px -2px 50px rgba(0, 0, 0, 0.1);
  border-radius: 20px 20px 0px 0px;
  min-height: calc(var(--content-height) - var(--top-nav-height));
  padding: 10px 20px;
}
.indicators__apps {
  margin-top: 20px;
}
.indicators__apps-title {
  color: var(--blue-1);
}
.line {
  border-bottom: 1px solid var(--gray-1);
  margin-top: 2px;
}
.structure-control-list__data-ul {
  list-style-type: none;
}
</style>
