import { createStore } from 'vuex';

interface Product {
  title: string;
  price: number;
  image: string;
}

export default createStore({
  state: {
    favoriteProducts: [] as Product[],
    cartProducts: [] as Product[],
  },
  mutations: {
    addToFavorites(state, product) {
      state.favoriteProducts.push(product);
      localStorage.setItem('favoriteProducts', JSON.stringify(state.favoriteProducts));
    },
    addToCart(state, product) {
      state.cartProducts.push(product);
      localStorage.setItem('cartProducts', JSON.stringify(state.cartProducts));
    },
    initializeStore(state) {
      const favoriteProducts = localStorage.getItem('favoriteProducts');
      if (favoriteProducts) {
        state.favoriteProducts = JSON.parse(favoriteProducts);
      }

      const cartProducts = localStorage.getItem('cartProducts');
      if (cartProducts) {
        state.cartProducts = JSON.parse(cartProducts);
      }
    }
  },
  actions: {
    initializeStore({ commit }) {
      commit('initializeStore');
    }
  }
});
