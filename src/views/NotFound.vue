<template>
  <div class="wrap notFound text-center py-6">
    <div class="mb-3">
      <i class="bi bi-emoji-dizzy"></i>
    </div>
    <h2 class="mb-3">404找不到網頁</h2>
    <p>網址錯誤，請按下方按鈕回到首頁。</p>
    <div class="d-flex justify-content-center">
      <button type="button" class="btn btn-primary" @click="$router.push('/')">首頁</button>
    </div>
  </div>
</template>
