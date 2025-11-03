import Image from 'next/image';
import {
  Page,
  Card,
  Header,
  Formulaire,
  Title,
  Input,
  SubmitButton,
  Text,
  Link,
} from "@/components/FormStyles";


export default function Home() {
  return (
    <Page>
      <Header>
        <Image src="/images/logo.png" alt="Logo" width={20} height={20} />
        RED PRODUCT
      </Header>
      <Card>

        <Title>Mot de passe oublié ?</Title>
        <Text style={{ color: "black", display: "flex-start", fontSize: "0.8rem" }}> Entrez votre adresse e-mail ci-dessous et nous vous envoyons des instructions sur la fa&ccedil;on de modifier votre mot de passe.</Text>

        <Formulaire>
          <Input type="email" placeholder="votre e-mail" />

          <SubmitButton type="submit">Envoyer</SubmitButton>
        </Formulaire>
      </Card>
        <Text>
          Révenir à la <Link href="/">Connexion</Link>
        </Text>
    </Page>
  );
}
