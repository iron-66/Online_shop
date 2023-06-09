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

    removeFromFavorites(state, product) {
      let list = state.favoriteProducts;
      let index = -1;
      for (let i = 0; i < list.length; i++) {
        if (list[i].title === product.title) {
          index = i
        }
      }
      if (index !== -1) {
        state.favoriteProducts.splice(index, 1);
      }
      localStorage.setItem('favoriteProducts', JSON.stringify(state.favoriteProducts));
    },

    addToCart(state, product) {
      state.cartProducts.push(product);
      localStorage.setItem('cartProducts', JSON.stringify(state.cartProducts));
    },

    removeFromCart(state, product) {
      let list = state.cartProducts;
      let index = -1;
      for (let i = 0; i < list.length; i++) {
        if (list[i].title === product.title) {
          index = i
        }
      }
      if (index !== -1) {
        state.cartProducts.splice(index, 1);
      }
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
