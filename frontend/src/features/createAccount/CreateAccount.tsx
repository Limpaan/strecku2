import { CreateAccountErrorPanel } from "./CreateAccountErrorPanel";
import { parseJwt } from "../../common/utilities/parseJwt";
import { CreateAccountForm } from "./CreateAccountForm";

export const CreateAccount = () => {
  const query = new URLSearchParams(window.location.search);
  const token = query.get("token");

  if (!token) {
    return (
      <CreateAccountErrorPanel
        title={"Invalid token"}
        message={"The token is invalid or missing. Please try to sign up again"}
      />
    );
  }
  const tokenPayload = parseJwt(token);
  const email = tokenPayload?.email;
  if (!email) {
    return (
      <CreateAccountErrorPanel
        title={"Invalid token"}
        message={"The token is invalid or missing. Please try to sign up again"}
      />
    );
  }

  return <CreateAccountForm email={email} token={token} />;
};
