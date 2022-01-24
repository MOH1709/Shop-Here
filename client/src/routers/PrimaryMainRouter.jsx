import { Home, Cart, Messages } from "../screens/mainScreen";

export default function PrimaryMainRouter({ location }) {
  let component = <Home />;

  switch (location) {
    case "/messages":
      component = <Messages />;
      break;
    case "/cart":
      component = <Cart />;
      break;
    default:
  }

  return component;
}
