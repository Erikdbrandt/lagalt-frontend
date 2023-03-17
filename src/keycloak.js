import Keycloak from "keycloak-js";


const keycloak = new Keycloak("/keycloak.json");

export const initialize = () => {
  const config = {
    checkLoginIframe: false,
    onLoad: "check-sso",
    silentCheckSsoRedirectUri:
      window.location.origin + "/silent-check-sso.html",
  };
  return keycloak.init(config);
};

export default keycloak;
