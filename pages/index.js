import Image from 'next/image';
import {
  Page,
  Card,
  Header,
  Formulaire,
  Title,
  Input,
  CheckboxContainer,
  Checkbox,
  SubmitButton,
  Text,
  FooterDiv,
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
          <Text><Link href="/modif_mot_de_passe">Mot de passe oublié ?</Link></Text>
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
    // <Page>
    //   <Header>
    //     <Image src="/images/logo.png" alt="Logo" width={20} height={20} />
    //     RED PRODUCT
    //   </Header>
    //   <Card>

    //     <Title>Connectez-vous en tant que Admin</Title>

    //     <Formulaire>
    //       <Input type="email" placeholder="E-mail" />
    //       <Input type="password" placeholder="Mot de passe" />

    //       <CheckboxContainer>
    //         <Checkbox type="checkbox" />
    //         Gardez-moi connecté
    //       </CheckboxContainer>

    //       <SubmitButton type="submit">Se connecter</SubmitButton>
    //     </Formulaire>
    //   </Card>

    //   <FooterDiv>
    //       <Text><Link href="/modif_mot_de_passe">Mot de passe oublié ?</Link></Text>
    //       <Text>Vous n&apos;avez pas de compte ? <Link href="/inscription">S&apos;inscrire</Link></Text>
    //   </FooterDiv>
    // </Page>
  );
}
