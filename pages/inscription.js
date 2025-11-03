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

        <Title>Inscrivez-vous en tant que Admin</Title>

        <Formulaire>
          <Input type="text" placeholder="Nom" />
          <Input type="email" placeholder="E-mail" />
          <Input type="password" placeholder="Mot de passe" />

          <CheckboxContainer>
            <Checkbox type="checkbox" />
            Accepter les termes et la politique
          </CheckboxContainer>

          <SubmitButton type="submit">S&apos;inscrire</SubmitButton>
        </Formulaire>
      </Card>

      <Text>
        Vous avez déjà un compte ? <Link href="/">Se connecter</Link>
      </Text>
    </Page>
  );
}
