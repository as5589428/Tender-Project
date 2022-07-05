import { Outlet } from "react-router-dom";

import { useAuthContext } from "context/AuthProvider";
import { SubNavigation } from "components/Navigation";

const styles = {
  container: { marginTop: 70, padding: "0 20px 0 20px" },
  heading: { color: "#d63e2f" },
};

const SecuredContentPage = ({ allowedRoles }) => {
  const { auth } = useAuthContext();

  return (
    <>
      <div style={styles.container}>
        <SubNavigation allowedRoles={allowedRoles} />

        <h1>
          Welcome <span style={styles.heading}>{auth?.name}</span>
        </h1>

        <p>
          There are many variations of passages of Lorem Ipsum available, but
          the majority have suffered alteration in some form, by injected
          humour, or randomised words which don't look even slightly believable.
          If you are going to use a passage of Lorem Ipsum, you need to be sure
          there isn't anything embarrassing hidden in the middle of text. All
          the Lorem Ipsum generators on the Internet tend to repeat predefined
          chunks as necessary, making this the first true generator on the
          Internet. It uses a dictionary of over 200 Latin words, combined with
          a handful of model sentence structures, to generate Lorem Ipsum which
          looks reasonable. The generated Lorem Ipsum is therefore always free
          from repetition, injected humour, or non-characteristic words etc.
        </p>
      </div>
    </>
  );
};

export default SecuredContentPage;
