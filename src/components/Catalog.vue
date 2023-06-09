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
            <option v-for="option in sortOptions" :value="option.value" :key="option.value">
              {{ option.label }}
            </option>
          </select>
        </div>
      </div>
      <div class="catalog-control">
        <div class="control-label">Фильтры</div>
        <div class="input-field">
          <!-- фильтры -->
        </div>
      </div>
    </div>
    <div class="product-catalog">
      <ProductCard
        v-for="(product, index) in displayedProducts"
        :key="index"
        :title="product.title"
        :price="product.price"
        :image="product.image"
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
      favoriteProducts: [] as Product[],
      searchText: '',
      sortOption: '',
      currentPage: 1,
      itemsPerPage: 9,
      sortOptions: [
        { value: 'alphabet', label: 'По возрастанию алфавита' },
        { value: 'alphabetDesc', label: 'По убыванию алфавита' },
        { value: 'price', label: 'По возрастанию цены' },
        { value: 'priceDesc', label: 'По убыванию цены' },
      ],
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

      if (!searchText) {
        return this.products;
      }

      return this.products.filter((product) =>
        product.title.toLowerCase().includes(searchText)
      );
    },
    getSortedProducts(products: Product[]): Product[] {
      switch(this.sortOption) {
        case 'alphabet':
          return products.sort((a, b) => a.title.localeCompare(b.title));
        case 'alphabetDesc':
          return products.sort((a, b) => b.title.localeCompare(a.title));
        case 'price':
          return products.sort((a, b) => a.price - b.price);
        case 'priceDesc':
          return products.sort((a, b) => b.price - a.price);
        default:
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
  },
  computed: {
    displayedProducts(): Product[] {
      const filteredProducts = this.getFilteredProducts();
      const sortedProducts = this.getSortedProducts(filteredProducts);

      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      const paginatedProducts = sortedProducts.slice(start, end);

      return paginatedProducts;
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
  margin-top: 100px;
  margin-bottom: 80px;
}

.block-name {
  display: flex;
  justify-content: center;
  font-size: 50px;
}

.catalog-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 50px 25px;
  font-size: 30px;
}

.catalog-control {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0px 15px;
}

.control-label {
  margin-bottom: 10px;
  font-family: 'Rounded Mplus 1c', sans-serif;
  font-size: 30px;
}

.input-field {
  background-color: #d9d9d9;
  width: 470px;
  height: 65px;
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

.product-catalog {
  display: grid;
  grid-template-columns: repeat(auto-fit, 470px);
  row-gap: 30px;
  column-gap: 30px;
  align-items: center;
  justify-content: center;
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
