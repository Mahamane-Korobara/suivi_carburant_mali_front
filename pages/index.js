import {
  Formulaire,
  Input,
  SubmitButton,
  Text,
  Link,
} from "@/components/FormStyles";
import AuthLayout from "@/components/AuthLayout";


export default function Home() {
  return (
    <AuthLayout
      title="Connectez-vous avec vos indentifiants"

      // Si l'on veut mettre d'autres balise dans le footer c'est avec des acolades et comme la 
      // balise FooterDiv dans AuthLayout.js on peut le faire ainsi <> contenue </>
      footer={
        <>
          <Text>Vous n&apos;avez pas de compte ? <Link href="/inscription">S&apos;inscrire</Link></Text>
        </>
      }
    >
      {/* Comme le children est embriquer dans Card on le fais comme ça */}
      <Formulaire>
        <Input type="email" placeholder="E-mail" />
        <Input type="password" placeholder="Mot de passe" />

        {/* <CheckboxContainer>
          <Checkbox type="checkbox" />
          Gardez-moi connecté
        </CheckboxContainer> */}

        <SubmitButton type="submit">Se connecter</SubmitButton>
      </Formulaire>

    </AuthLayout>
  );
}
