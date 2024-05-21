document.addEventListener("DOMContentLoaded", function () {
  //카트 아이콘
  let cartIcon = document.querySelector("#cart-icon");
  let cart = document.querySelector(".cart");
  let closeCart = document.querySelector("#close-cart");
  
  // 카트 열기
  cartIcon.onclick = () => {
      cart.classList.add("active");
  };
  
  // 카트 닫기
  closeCart.onclick = () => {
      cart.classList.remove("active");
  };
  
  // Cart Working JS
  if (document.readyState == 'loading') {
      document.addEventListener('DOMContentLoaded', ready);
  } else {
      ready();
  };
  
  //making Function
  function ready() {
      //장바구니 상품 제거
      var removeCartButtons = document.getElementsByClassName('cart-remove');
      console.log(removeCartButtons);
      for (var i = 0; i < removeCartButtons.length; i++) {
          var button = removeCartButtons[i];
          button.addEventListener('click', removeCartItem);
      }
      // 수량 변화
      var quantityInputs = document.getElementsByClassName('cart-quantity');
      for (var i = 0; i < quantityInputs.length; i++) {
          var input = quantityInputs[i];
          input.addEventListener("change", quantityChanged);
      }
      // 카트 추가
      var addCart = document.getElementsByClassName('add-cart');
      for (var i = 0; i < addCart.length; i++) {
          var button = addCart[i]
          button.addEventListener('click', addCartClicked);
      }
      //구매 버튼 작동
  document.getElementsByClassName('btn-buy')[0].addEventListener("click",buyButtonClicked);
  }
  // 주문 버튼
  function buyButtonClicked(){
      alert('주문하시겠습니까?');
      var cartContent = document.getElementsByClassName('cart-content')[0]
      while (cartContent.hasChildNodes()){
          cartContent.removeChild(cartContent.firstChild);
      }
      // 토탈 금액 초기화
      document.querySelector('.total-price').innerText = '$0';
  }
  
  //장바구니에서 상품 제거
  function removeCartItem(event) {
      var buttonClicked = event.target;
      buttonClicked.parentElement.remove();
      updatetotal();
  
      // 모든 항목을 삭제한 경우에는 토탈 금액을 0으로 설정
      if (document.getElementsByClassName('cart-box').length === 0) {
          document.getElementsByClassName('total-price')[0].innerText = '$0';
      }
  }
  
  // 수량 변화
  function quantityChanged(event) {
      var input = event.target
      if (isNaN(input.value) || input.value <= 0) {
          input.value = 1;
      }
      updatetotal();
  }
  // 장바구니 넣기
  function addCartClicked(event) {
      var button = event.target;
      var shopProducts = button.parentElement;
      var title = shopProducts.getElementsByClassName('product-title')[0].innerText;
      var price = shopProducts.getElementsByClassName('price')[0].innerText;
      var productImg = shopProducts.getElementsByClassName('product-img')[0].src;
      addProductToCart(title, price, productImg);
      updatetotal();
  }
  
  function addProductToCart(title, price, productImg) {
      // 이미 카트에 있는지 확인
      var cartItems = document.getElementsByClassName('cart-content')[0];
      var cartItemsNames = cartItems.getElementsByClassName('cart-product-title');
      for (var i = 0; i < cartItemsNames.length; i++) {
          if (cartItemsNames[i].innerText === title) {
              alert('이미 추가된 항목 입니다.');
              return; // 이미 추가된 경우 함수 종료
          }
      }
  
      // 카트에 없는 경우 제품 추가
      var cartShopBox = document.createElement('div');
      cartShopBox.classList.add('cart-box');
  
      var cartBoxContent = `
          <img src="${productImg}" alt="" class="cart-img">
          <div class="detail-box">
              <div class="cart-product-title">${title}</div>
              <div class="cart-price">${price}</div>
              <input type="number" value="1" class="cart-quantity">
          </div>
          <!-- Remove Cart -->
          <i class="fa-solid fa-trash-can cart-remove"></i>`;
      cartShopBox.innerHTML = cartBoxContent;
  
      cartItems.appendChild(cartShopBox); // 여기서 오류 발생
  
      var removeButton = cartShopBox.querySelector('.cart-remove');
      removeButton.addEventListener('click', removeCartItem);
  
      var quantityInput = cartShopBox.querySelector('.cart-quantity');
      quantityInput.addEventListener('change', quantityChanged);
  }
  
  
  //Update total
  function updatetotal() {
      var cartContent = document.getElementsByClassName('cart-content')[0]
      var cartBoxes = cartContent.getElementsByClassName('cart-box');
      var total = 0;
      if (cartBoxes.length > 0) {
          for (var i = 0; i < cartBoxes.length; i++) {
              var cartBox = cartBoxes[i];
              var priceElement = cartBox.getElementsByClassName('cart-price')[0];
              var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
              var price = parseFloat(priceElement.innerText.replace("$", ""));
              var quantity = quantityElement.value;
              total = total + (price * quantity);
          }
              // if price Contain some Cants Value
              total = Math.round(total * 100) / 100;
          
              document.getElementsByClassName('total-price')[0].innerText = '$' + total;
          }
  } 
  
  });
  
  