import styled from 'styled-components';

interface ButtonProps {
  getExchange: () => void;
}

export const Button = (props: ButtonProps): JSX.Element => {
  const Button = styled.button`
    background: white;
    color: primary;
    font-size: 0.7em;
    margin: 1em;
    padding: 0.25em 1em;
    border: 1px solid primary;
    border-radius: 3px;
  `;
  return (
    <Button
      className={Button}
      onClick={() => props.getExchange()}
      type="button"
    >
      Exchange
    </Button>
  );
};
