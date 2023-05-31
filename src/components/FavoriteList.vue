<template>
  <div class="favorite-list-overlay">
    <div class="favorite-list" :style="{ height: listHeight + 'px' }">
      <h2 class="list-title">Избранное</h2>
      <ul>
        <li v-for="product in favoriteProducts" :key="product.title">
          <p>{{ product.title }}</p>
          <p>{{ product.price }}</p>
          <div class="product-actions">
            <button @click="removeFromFavorites(product)">Удалить</button>
            <button>Добавить в корзину</button>
          </div>
        </li>
      </ul>
      <button class="close-button" @click="$emit('close')">Закрыть</button>
    </div>
  </div>
</template>
  
<script lang="ts">
import { defineComponent, ref, computed, watch } from 'vue';

interface Product {
  image: string;
  title: string;
  price: number;
}

export default defineComponent({
    name: 'FavoriteList',
    props: {
      favoriteProducts: {
        type: Array as () => Product[], // Добавление типа массива Product
        required: true,
      },
    },
    setup() {
        const favoriteProducts = ref<Product[]>([]);

        const removeFromFavorites = (product: Product) => {
          const index = favoriteProducts.value.findIndex((p) => p.title === product.title);
            if (index !== -1) {
              favoriteProducts.value.splice(index, 1);
            }
        };

        return {
            favoriteProducts,
            removeFromFavorites,
        };
    },
    computed: {
    listHeight(): number {
      const itemHeight = 40; // Высота одного элемента списка
      const padding = 20; // Отступы внутри списка
      const titleHeight = 40; // Высота заголовка
      const closeButtonHeight = 100; // Высота кнопки "Закрыть"

      const itemCount = this.favoriteProducts.length; // Количество элементов в списке
      const totalHeight =
        titleHeight + closeButtonHeight + padding + itemCount * itemHeight;

      return totalHeight;
    },
  },
});
</script>
  
<style scoped>
.favorite-list-overlay {
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

.favorite-list {
    background-color: #FFFFFF;
    width: 1000px;
    height: 600px;
    padding: 20px;
    border-radius: 8px;
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

.product-actions {
  display: flex;
  justify-content: space-between;
}

.favorite-list ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.favorite-list li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
}

.favorite-list .product-actions button {
    padding: 8px 16px;
    background-color: #D9D9D9;
    color: #434343;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.favorite-list .product-actions button:hover {
    background-color: #a7a7a7;
}

.favorite-list button {
    margin-top: 20px;
}

.close-button {
  margin-top: auto;
  padding: 8px 16px;
  font-size: 30px;
  background-color: #D9D9D9;
  font-family: 'Rounded Mplus 1c';
  color: #434343;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.close-button:hover {
  background-color: #a7a7a7;
}
</style>
  