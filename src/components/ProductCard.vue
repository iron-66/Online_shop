<template>
  <div class="product-card">
    <img :src="image" :alt="title" class="product-image" />
    <div class="product-content">
      <h3 class="product-title" >{{ title }}</h3>
      <p class="product-price"><span class="currency-icon">$</span>{{ price }}</p>
      <div class="product-actions">
        <button v-if="!isFavorite" class="add-to-favorites" @click="addToFav">Добавить в избранное</button>
        <button v-else class="remove-from-favorites" @click="removeFromFav">Удалить из избранного</button>
        <button v-if="!inCart" class="add-to-cart" @click="addCart">Добавить в корзину</button>
        <button v-else class="remove-from-cart" @click="removeCart">Удалить из корзины</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { mapMutations } from 'vuex';
  import FavoriteList from './FavoriteList.vue';

  interface Product {
    title: string;
    price: number;
    image: string;
  }

  export default defineComponent({
    components: {
      FavoriteList,
    },
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
        inCart: false,
      };
    },
    methods: {
      ...mapMutations(['addToFavorites', 'removeFromFavorites', 'addToCart', 'removeFromCart']),
      addToFav(): void {
        this.isFavorite = true;
        const product: Product = {
          title: this.title,
          price: this.price,
          image: this.image,
        };
        this.addToFavorites(product);
      },
      removeFromFav(): void {
        this.isFavorite = false;
        this.removeFromFavorites({
          title: this.title,
          price: this.price,
          image: this.image,
        });
      },
      addCart(): void {
        this.inCart = true;
        const product: Product = {
          title: this.title,
          price: this.price,
          image: this.image,
        };
        this.addToCart(product);
      },
      removeCart(): void {
        this.inCart = false;
        this.removeFromCart({
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  text-align: center;
  width: 470px;
  height: 535px;
  padding-bottom: 25px;
  background-color: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.product-image {
  height: auto;
  margin: auto;
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
.add-to-cart,
.remove-from-cart {
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

.product-title {
  margin: 10px;
}

.product-image img {
  max-width: 100%;
  max-height: 100%;
}
</style>
