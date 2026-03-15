import { useCartStore } from "@/store/cart-store";
import { useCheckoutStore } from "@/store/checkout-store";

export const generateMessage = () => {
  const { name, address } = useCheckoutStore((state) => state);
  const { cart } = useCartStore((state) => state);

  let orderProducts = [];
  for (let item of cart) {
    orderProducts.push(`${item.quantity} x ${item.product.name}`);
  }

  return `📦 *NOVO PEDIDO*

👤 *Dados do Cliente*
• *Nome:* ${name}
• *Endereço:* ${address.street}, ${address.number} ${address.complement}
• *Bairro:* ${address.district}
• *Cidade:* ${address.city}/${address.state}

━━━━━━━━━━━━━━━

🧾 *Pedido*
${orderProducts.join("\n")}

━━━━━━━━━━━━━━━
✅ Pedido gerado pelo site`;
};
