<template>
  <section>
    <h1 class="text-center">Не найдено</h1>
    <h4 class="text-center mx-5 my-5">
      К сожалению, раздел, к которому вы обратились, не существует.
    </h4>
    <div class="text-center">
      <button :to="{ name: 'home' }" :outlined="true" class="my-5">
        На главную страницу
      </button>
    </div>
  </section>
</template>
