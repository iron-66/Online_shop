<template>
  <div id="app">
    <header class="site-header">
      <div class="wrapper header-wrapper">
        <a href="#" class="logo-text">IRON66</a>
        <nav class="nav">
          <a href="#">Главная</a>
          <a href="#" class="catalog">Каталог</a>
          <a href="#">Контакты</a>
        </nav>
        <div class="right-section">
          <a class="favorites" @click="toggleFavoriteList"><img src="@/assets/star-mark.png" width="51" height="51"></a>
          <a class="cart"><img src="@/assets/shopping-cart.png" width="58" height="58"></a>
          <div class="counter-circle"><div id="counter" class="counter">0</div></div>
        </div>
      </div>
    </header>
    <main>
      <router-view @add-to-favorites="addToFavorites" />
    </main>
    <FavoriteList v-if="isFavoriteListOpen" :favoriteProducts="favoriteProducts" @removeFromFavorites="removeFromFavorites" @close="toggleFavoriteList" />
  </div>
</template>

<script lang="ts">
  import { ref, computed, Ref } from 'vue';
  import FavoriteList from './components/FavoriteList.vue';

  interface Product {
    title: string;
    price: number;
    image: string;
  }

  export default {
    name: 'App',
    components: {
      FavoriteList,
    },
    setup() {
      const isFavoriteListOpen = ref(false);
      const favoriteProducts: Ref<Product[]> = ref([]);

      const toggleFavoriteList = () => {
        isFavoriteListOpen.value = !isFavoriteListOpen.value;
      };

      const addToFavorites = (product: Product) => {
        favoriteProducts.value.push(product);
      };

      const removeFromFavorites = (product: Product) => {
        const index = favoriteProducts.value.findIndex((p) => p.title === product.title);
        if (index !== -1) {
          favoriteProducts.value.splice(index, 1);
        }
      };

      return {
        isFavoriteListOpen,
        toggleFavoriteList,
        favoriteProducts,
        addToFavorites,
        removeFromFavorites,
      };
    },
  };
</script>

<style>
@font-face {
  font-family: 'Rounded Mplus 1c Light';
  src: url('@/assets/fonts/MPLUSRounded1c-Light.ttf') format('truetype');
}

@font-face {
  font-family: 'Rounded Mplus 1c';
  src: url('@/assets/fonts/MPLUSRounded1c-Regular.ttf') format('truetype');
}

#app {
  font-family: 'Rounded Mplus 1c';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #434343;
  background-color: #F5F5F5;
}

.site-header {
  font-family: 'Rounded Mplus 1c Light';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
}

.header-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  background-color: #ffffff;
  border: 1px solid #434343;
  padding: 0% 30px;
  height: 80px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.logo-text,
.nav,
.favorites {
  flex: 1;
}

.nav {
  font-size: 30px;
  display: inline-block;
  order: -1;
}

.nav a {
  text-decoration: none;
  color: #434343;
}

.catalog {
  margin: 0% 6%;
}

.logo-text {
  font-size: 48px;
  color: #434343;
  text-decoration: none;
}

.right-section {
  display: flex;
  align-items: center;
}

.cart {
  margin: 0px 30px;
}

.counter-circle {
  height: 55px;
  width: 55px;
  background-color: #F1F1F1;
  border: 1px solid #434343;
  border-radius: 50%;
  display: flex;
  font-size: 30px;

}

.counter {
  margin: auto;
}

body {
  margin: 0;
  padding: 0;
}
</style>
