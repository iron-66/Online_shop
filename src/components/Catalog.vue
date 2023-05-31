<template>
  <div class="catalog">
    <div class="catalog-header">
      <h2 class="block-name">КАТАЛОГ</h2>
    </div>
    <div class="catalog-controls">
      <div class="catalog-control">
        <div class="control-label">Поиск</div>
        <div class="input-field">
          <input type="text" v-model="searchText" class="search-input" placeholder="Введите название"/>
        </div>
      </div>
      <div class="catalog-control">
        <div class="control-label">Сортировка</div>
        <div class="input-field">
          <select v-model="sortOption" class="sort-menu">
            <option value="alphabet">По возрастанию алфавита</option>
      <option value="alphabetDesc">По убыванию алфавита</option>
      <option value="price">По возрастанию цены</option>
      <option value="priceDesc">По убыванию цены</option>
          </select>
        </div>
      </div>
      <div class="catalog-control">
        <div class="control-label">Фильтры</div>
        <div class="input-field">
          <!-- Добавьте фильтры по вашему выбору -->
        </div>
      </div>
    </div>
    <div class="product-row" v-for="(row, rowIndex) in displayedProductRows" :key="rowIndex">
      <ProductCard
        v-for="(product, cardIndex) in row"
        :key="cardIndex"
        :title="product.title"
        :price="product.price"
        :image="product.image"
        @add-to-favorites="addFavorite"
        @remove-from-favorites="removeFavorite"
      />
    </div>
    <div class="pagination">
      <button v-for="page in totalPages" :key="page" @click="changePage(page)" :class="{ active: currentPage === page }">
        {{ page }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import ProductCard from '../components/ProductCard.vue';

interface Product {
  title: string;
  price: number;
  image: string;
}

export default defineComponent({
  components: {
    ProductCard,
  },
  data() {
    return {
      products: [] as Product[],
      favorites: [] as string[],
      searchText: '',
      sortOption: '',
      currentPage: 1,
      itemsPerPage: 9,
    };
  },
  mounted() {
    this.fetchProducts();
  },
  methods: {
    fetchProducts() {
      fetch('https://fakestoreapi.com/products')
        .then((res) => res.json())
        .then((json) => {
          this.products = json;
        });
    },
    getFilteredProducts(): Product[] {
      const searchText = this.searchText.toLowerCase().trim();

      if (searchText === '') {
        return this.products;
      }

      return this.products.filter((product) =>
        product.title.toLowerCase().includes(searchText)
      );
    },
    getSortedProducts(products: Product[]): Product[] {
      if (this.sortOption === 'alphabet') {
        return products.sort((a, b) => a.title.localeCompare(b.title));
      } else if (this.sortOption === 'alphabetDesc') {
        return products.sort((a, b) => b.title.localeCompare(a.title));
      } else if (this.sortOption === 'price') {
        return products.sort((a, b) => a.price - b.price);
      } else if (this.sortOption === 'priceDesc') {
        return products.sort((a, b) => b.price - a.price);
      } else {
        return products;
      }
    },
    getPaginatedProductRows(): Product[][] {
      const filteredProducts = this.getFilteredProducts();
      const sortedProducts = this.getSortedProducts(filteredProducts);

      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      const paginatedProducts = sortedProducts.slice(start, end);

      const rows = [];
      let row = [];
      for (let i = 0; i < paginatedProducts.length; i++) {
        row.push(paginatedProducts[i]);
        if ((i + 1) % 3 === 0 || i === paginatedProducts.length - 1) {
          rows.push(row);
          row = [];
        }
      }

      return rows;
    },
    changePage(page: number): void {
      this.currentPage = page;
    },
    addFavorite(title: string) {
      this.favorites.push(title);
      localStorage.setItem('favorites', JSON.stringify(this.favorites));
    },
    removeFavorite(title: string) {
      const index = this.favorites.indexOf(title);
      if (index !== -1) {
        this.favorites.splice(index, 1);
        localStorage.setItem('favorites', JSON.stringify(this.favorites));
      }
    },
  },
  computed: {
    displayedProductRows(): Product[][] {
      const filteredProducts = this.getFilteredProducts();
      const sortedProducts = this.getSortedProducts(filteredProducts);

      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      const paginatedProducts = sortedProducts.slice(start, end);

      const rows = [];
      let row = [];
      for (let i = 0; i < paginatedProducts.length; i++) {
        row.push(paginatedProducts[i]);
        if ((i + 1) % 3 === 0 || i === paginatedProducts.length - 1) {
          rows.push(row);
          row = [];
        }
      }

      return rows;
    },
    totalPages(): number {
      const filteredProducts = this.getFilteredProducts();
      const sortedProducts = this.getSortedProducts(filteredProducts);
      return Math.ceil(sortedProducts.length / this.itemsPerPage);
    },
  },
});
</script>

<style scoped>
.catalog {
  align-items: center;
}

.catalog-header {
  margin-top: 104px;
  margin-bottom: 78px;
}

.block-name {
  display: flex;
  justify-content: center;
  font-size: 48px;
}

.catalog-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 57px 26px;
  font-size: 30px;
}

.catalog-control {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0px 26px;
}

.control-label {
  margin-bottom: 10px;
  font-family: 'Rounded Mplus 1c', sans-serif;
  font-size: 30px;
}

.input-field {
  background-color: #d9d9d9;
  width: 470px;
  height: 66px;
  margin-left: 10px;
}

.search-input {
  width: 95%;
  height: 100%;
  font-family: 'Rounded Mplus 1c', sans-serif;
  font-size: 30px;
  color: #434343;
  background-color: transparent;
  border: none;
  outline: none;
  padding-left: 10px;
}

.sort-menu {
  width: 95%;
  height: 100%;
  font-family: 'Rounded Mplus 1c', sans-serif;
  font-size: 30px;
  color: #434343;
  background-color: transparent;
  border: none;
  outline: none;
  padding-left: 10px;
}

.product-row {
  align-items: center;
  justify-content: center;
  display: flex;
  flex-wrap: wrap;
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 50px;
}

.pagination button {
  padding: 5px 10px;
  margin: 12px;
  background-color: #D9D9D9;
  font-family: 'Rounded Mplus 1c';
  font-size: 30px;
  color: #434343;
  border: none;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.pagination button.active {
  font-weight: bold;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
</style>
