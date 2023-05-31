<template>
  <div class="product-card">
    <img :src="image" :alt="title" class="product-image" />
    <h3>{{ title }}</h3>
    <p class="product-price"><span class="currency-icon">$</span>{{ price }}</p>
    <div class="product-actions">
      <button v-if="!isFavorite" class="add-to-favorites" @click="addToFavorites">Добавить в избранное</button>
      <button v-else class="remove-from-favorites" @click="removeFromFavorites">Удалить из избранного</button>
      <button class="add-to-cart">Добавить в корзину</button>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    props: {
      title: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        isFavorite: false,
      };
    },
    methods: {
      addToFavorites() {
        this.isFavorite = true;
        this.$emit('add-to-favorites', {
          title: this.title,
          price: this.price,
          image: this.image,
        });
      },
      removeFromFavorites() {
        this.isFavorite = false;
        this.$emit('remove-from-favorites', {
          title: this.title,
          price: this.price,
          image: this.image,
        });
      },
    },
  });
</script>

<style scoped>
  .product-card {
    text-align: center;
    width: 470px;
    height: 537px;
    background-color: #ffffff;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    margin: 26px;
  }

  .product-image {
    height: auto;
    margin-top: 20px;
    max-width: 90%;
    max-height: 60%;
  }

  .product-price {
    font-weight: bold;
    margin-bottom: 10px;
  }

  .product-actions {
    display: flex;
    justify-content: center;
    gap: 10px;
  }

  .add-to-favorites,
  .remove-from-favorites,
  .add-to-cart {
    padding: 10px 20px;
    background-color: #D9D9D9;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-family: 'Rounded Mplus 1c';
    color: #434343;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 16px;
  }

  .product-image img {
    max-width: 100%;
    max-height: 100%;
  }
</style>
