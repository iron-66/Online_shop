<template>
  <div class="contacts">
    <h2 class="contacts-heading">Контакты</h2>
    <p class="contacts-name">Федянин Михаил Сергеевич</p>
    <p class="contacts-address">г. Екатеринбург, ул. Мира 32</p>
    <div class="contacts-social">
      <img src="@/assets/telegram.png" alt="Telegram" class="contacts-icon" />
      <p class="contacts-username">@iron66</p>
      <img src="@/assets/vk.png" alt="VK" class="contacts-icon" />
      <p class="contacts-username">iron_66</p>
    </div>
    <p class="contacts-project">Сайт создан в рамках итогового проекта для курса по TypeScript</p>
    <p class="contacts-year">2023</p>
  </div>
</template>
  
<style scoped>
.contacts {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #434343;
  font-family: 'Rounded Mplus 1c', sans-serif;
}

.contacts-heading {
  font-size: 48px;
  margin-bottom: 10px;
}

.contacts-name,
.contacts-address,
.contacts-username,
.contacts-project,
.contacts-year {
  font-size: 30px;
  margin-bottom: 10px;
}

.contacts-social {
  display: flex;
  align-items: center;
  margin: 30px 40px 30px 0px;
}

.contacts-username {
  margin: 0px 10px;
}

.contacts-icon {
  width: 41px;
  height: 41px;
  margin-left: 40px;
}

</style>