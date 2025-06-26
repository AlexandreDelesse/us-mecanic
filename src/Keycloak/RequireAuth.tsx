import { useKeycloak } from "@react-keycloak/web";
import type { ReactNode } from "react";

export default function RequireAuth({ children }: { children: ReactNode }) {
  const { keycloak } = useKeycloak();

  if (!keycloak.authenticated) return keycloak.login();

  return { children };
}
