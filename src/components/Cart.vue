<template>
  <div class="cart-list-overlay">
    <div class="cart-list">
      <h2 class="list-title">Корзина</h2>
      <ul class="body">
        <li v-for="(product, index) in cartProducts" :key="index">
          <h3 class = "title">{{ product.title }}</h3>
          <p class="product-price"><span class="currency-icon">$</span>{{ product.price }}</p>
        </li>
      </ul>
      <button class="close-button" @click="$emit('close')">Закрыть</button>
      <button class="сheckout-button" @click="notify">Оформить заказ</button>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { useStore } from 'vuex';

  interface Product {
    title: string;
    price: number;
    image: string;
  }

  export default defineComponent({
    methods: {
      notify(): void {
        const cartProd: Product[] = this.cartProducts;
        if (cartProd.length > 0) {
          alert('Спасибо за заказ!');
          window.location.reload();
        }
        else {
          alert('Для оформления заказа добавьте товары в корзину');
        }
      }
    },
    computed: {
      cartProducts(): Product[] {
        const store = useStore();
        return store.state.cartProducts;
      },
    },
  });
</script>

  
<style scoped>
.cart-list-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
}

.cart-list {
  background-color: #FFFFFF;
  width: 800px;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.list-title {
  text-align: center;
  margin-bottom: 20px;
  font-size: 30px;
  color: #434343;
}

.title {
  margin-left: 20px;
  margin-right: 50px;
}

.product-price {
  margin-right: 30px;
}

.product-actions {
  display: flex;
  justify-content: space-between;
}

.cart-list ul {
  list-style: none;
  padding: 0;
  margin: 0;
  max-height: 600px;
  overflow-y: auto;
}

.cart-list li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.cart-list .product-actions button {
  padding: 10px 15px;
  background-color: #D9D9D9;
  color: #434343;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.cart-list .product-actions button:hover {
  background-color: #a7a7a7;
}

.cart-list button {
  margin-top: 20px;
}

.сheckout-button,
.close-button {
  margin-top: auto;
  padding: 10px 15px;
  font-size: 30px;
  background-color: #D9D9D9;
  font-family: 'Rounded Mplus 1c';
  color: #434343;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.close-button:hover {
  background-color: #a7a7a7;
}
</style>

  