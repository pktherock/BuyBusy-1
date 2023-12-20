import { Card, Container } from "../../../components";

function Cart() {
  return (
    <Container>
      <div className="mx-auto grid w-full max-w-7xl items-center space-y-4 px-2 py-10 md:grid-cols-2 md:gap-6 md:space-y-0 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} />
        ))}
      </div>
    </Container>
  );
}

export default Cart;
