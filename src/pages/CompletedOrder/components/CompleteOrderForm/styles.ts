import styled from "styled-components";
import { SectionBaseStyle } from "../../styles";

export const CompleteOrderFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 40rem;
`

export const FormSectionContainer = styled(SectionBaseStyle)`
  display: flex;
  flex-direction:column;
  gap: 2rem;
`

export const AddressFormContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 12.5rem 17.25rem 3.75rem;
  gap: 1rem 0.75rem;
  grid-auto-flow: dense;

  .cep {
    grid-row: 1/2;
    grid-column: 1/2;
  }

  .street {
    grid-row: 2/3;
    grid-column: 1/4;
  }

  .number {
    grid-row: 3/4;
    grid-column: 1/2;
  }

  .complement {
    grid-row: 3/4;
    grid-column: 2/4;
  }

  .district {
    grid-row: 4/5;
    grid-column: 1/2;
  }

  .city {
    grid-row: 4/5;
    grid-column: 2/3;
  }

  .uf {
    grid-row: 4/5;
    grid-column: 3/4;
  }
`

export const PaymentMethodOptionsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;

  > p {
    grid-column: span 3;
    color: ${props => props.theme.colors["base-error"]}
  }
`