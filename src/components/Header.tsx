import { useLivepeerProvider } from "@livepeer/react";

function Header() {
  const livepeerProvider = useLivepeerProvider();
  const providerName = livepeerProvider.getConfig()
    ? livepeerProvider.getConfig().name
    : "None";
  return <div>Connected via {providerName}</div>;
}

export default Header;
