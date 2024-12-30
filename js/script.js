const prices = {
    "Bakso Biasa": 10000,
    "Bakso Jumbo": 15000,
    "Bakso Spesial": 20000,
    "Bakso Beranak": 25000
  };

  const cart = [];

  function selectMenu(menu) {
    if (cart.some(item => item.menu === menu)) {
      Swal.fire({
        icon: 'warning',
        title: 'Menu Sudah Dipilih',
        text: `${menu} sudah ada di keranjang!`,
      });
      return;
    }

    const quantity = 1;
    const price = prices[menu] * quantity;

    cart.push({ menu, quantity, price });
    document.getElementById(`btn-${menu}`).enabled = true;
    renderCart();
  }

  function renderCart() {
    const cartList = document.getElementById('cart-list');
    const totalPrice = document.getElementById('total-price');

    if (cart.length === 0) {
      cartList.innerHTML = '<li class="list-group-item text-center">Keranjang Kosong</li>';
      totalPrice.textContent = '0';
      return;
    }

    cartList.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
      total += item.price;
      const listItem = document.createElement('li');
      listItem.className = 'list-group-item d-flex justify-content-between align-items-center';
      listItem.innerHTML = `
        ${item.menu} x${item.quantity} <span>Rp ${item.price}</span>
        <div>
          <button class="btn btn-sm btn-success me-2" onclick="incrementQuantity(${index})">+</button>
          <button class="btn btn-sm btn-warning" onclick="decrementQuantity(${index})">-</button>
        </div>
      `;
      cartList.appendChild(listItem);
    });

    totalPrice.textContent = total;
  }

  function incrementQuantity(index) {
    cart[index].quantity++;
    cart[index].price = cart[index].quantity * prices[cart[index].menu];
    renderCart();
  }

  function decrementQuantity(index) {
    if (cart[index].quantity > 1) {
      cart[index].quantity--;
      cart[index].price = cart[index].quantity * prices[cart[index].menu];
    } else {
      document.getElementById(`btn-${cart[index].menu}`).disabled = false;
      cart.splice(index, 1);
    }
    renderCart();
  }

  function checkout() {
    if (cart.length === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Keranjang Kosong',
        text: 'Tambahkan menu ke keranjang terlebih dahulu!'
      });
      return;
    }

    Swal.fire({
      icon: 'success',
      title: 'Pembayaran Berhasil',
      text: 'Terima kasih telah berbelanja!'
    }).then(() => {
      cart.forEach(item => {
        document.getElementById(`btn-${item.menu}`).disabled = false;
      });
      cart.length = 0;
      renderCart();
    });
  }