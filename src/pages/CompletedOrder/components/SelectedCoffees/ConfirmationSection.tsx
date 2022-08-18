import { Button } from "../../../../components/Button";
import { RegularText } from "../../../../components/Typography";
import { useCart } from "../../../../hooks/useCart";
import { formatMoney } from "../../../../utils/formatMoney";
import { ConfirmationSectionContainer } from "./styles";

const deliveryPrice = 3.50

export function ConfirmationSection() {
  const { cartQuantity, cartItemTotal } = useCart()
  const cartTotal = deliveryPrice + cartItemTotal
  
  const formattedItemsTotal = formatMoney(cartItemTotal) 
  const formattedDeliveryPrice = formatMoney(deliveryPrice)
  const formattedCartTotal = formatMoney(cartTotal)
  
  return (
    <ConfirmationSectionContainer>
      <div>
        <RegularText size="s">Total de itens</RegularText>
        <RegularText>R$ {formattedItemsTotal}</RegularText>
      </div>
      <div>
        <RegularText size="s">Entrega</RegularText>
        <RegularText>R$ {formattedDeliveryPrice}</RegularText>
      </div>
      <div>
        <RegularText 
          weight="700" 
          color="subtitle" 
          size="l"
        >
          Total
        </RegularText>
        <RegularText weight="700" color="subtitle" size="l">
          R$ {formattedCartTotal}
        </RegularText>
      </div>

      <Button
        text={'Confirmar Pedido'} 
        disabled={cartQuantity <= 0} 
        type="submit"
      />
    </ConfirmationSectionContainer>
  )
}