import { CompleteOrderForm } from "./components/CompleteOrderForm";
import { SelectedCoffees } from "./components/SelectedCoffees";
import { CompleteOrderContainer } from "./styles";
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, FormProvider } from 'react-hook-form'
import { useNavigate } from "react-router-dom";
import { useCart } from "../../hooks/useCart";

type ConfirmOrderFormData = OrderData

export type OrderData = zod.infer<typeof confirmOrderFormValidationSchema>

enum PaymentMethods {
  credit = "credit",
  debit = "debit",
  money = "money"
}

const confirmOrderFormValidationSchema = zod.object({
  cep: zod.string().min(8, 'Informe o CEP'),
  street: zod.string().min(3, 'Informe nome da Rua'),
  number: zod.string().min(1, 'Informe Número'),
  complement: zod.string(),
  district: zod.string().min(3, 'Informe o Bairro'),
  city: zod.string().min(3, 'Informe a Cidade'),
  uf: zod.string().min(2, 'Informe o UF'),
  paymentMethod: zod.nativeEnum(PaymentMethods, {
    errorMap: () => {
      return {
        message: "Informe o método de pagamento"
      }
    }
  })
})

export function CompletedOrder() {
  const confirmOrderForm = useForm<ConfirmOrderFormData>({
    resolver: zodResolver(confirmOrderFormValidationSchema)
  })

  const { cleanCart } = useCart()
  const { handleSubmit } = confirmOrderForm
  const navigate = useNavigate()

  function handleConfirmOrder(data: ConfirmOrderFormData) {
    navigate('/orderConfirmed', {
      state: data
    })
    cleanCart()
  }

  return (
    <FormProvider {...confirmOrderForm}>
      <CompleteOrderContainer 
        className="container"
        onSubmit={handleSubmit(handleConfirmOrder)}
      > 
        <CompleteOrderForm />
        <SelectedCoffees />
      </CompleteOrderContainer>
    </FormProvider>
  )
}