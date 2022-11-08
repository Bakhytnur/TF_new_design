<template>
  <p class="department font-14-regular" :class="colorClass">
    <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#a)" fill="#fff">
        <path
          d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.5 31.5 0 0 1 8 14.58a31.491 31.491 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 1 1 10 0c0 .862-.305 1.867-.834 2.94ZM8 16s6-5.686 6-10A6 6 0 1 0 2 6c0 4.314 6 10 6 10Z"
          fill="currentColor"
        />
        <path
          d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4Zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="a">
          <path fill="#fff" d="M0 0h16v16H0z" />
        </clipPath>
      </defs>
    </svg>
    <span class="department__title"> {{ departmentName }} </span>
  </p>
</template>

<script>
export default {
  name: 'DepartmentIconTitle',
  props: {
    departmentName: {
      type: String,
      required: true
    },
    color: {
      type: String,
      default: 'blue'
    }
  },
  computed: {
    colorClass() {
      switch (this.color) {
        case 'blue':
          return 'department_blue'
        case 'white':
          return 'department_white'
        default:
          return 'department_blue'
      }
    }
  }
}
</script>

<style scoped>
.department {
  display: flex;
  align-items: center;
}
.department__title {
  margin-left: 5px;
}
.department_blue {
  color: var(--blue-1);
}
.department_white {
  color: var(--white-1);
}
</style>
