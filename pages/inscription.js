import {
  Formulaire,
  FormGrid,
  GridInput,
  FullWidthInput,
  SubmitButton,
  Text,
  Link,
} from "@/components/FormStyles";
import AuthLayout from "@/components/AuthLayout";

export default function Inscription() {
  return (
    <AuthLayout
      title="Inscrivez votre station pour une meilleure expérience"
      wide={true}
      footer={
        <>
          <Text>
            Vous avez déjà un compte ? <Link href="/">Se connecter</Link>
          </Text>
          <Text>
            Vous êtes usager ? Accédez directement à votre <Link href="/dashboard">espace</Link>
          </Text>
        </>
      }
    >
      <Formulaire>
        <FormGrid>
          <GridInput type="text" placeholder="Nom de la station" name="name" />
          <GridInput type="text" placeholder="Nom du gérant" name="gerant_name" />

          <GridInput type="text" placeholder="Quartier" name="quartier" />
          <GridInput type="text" placeholder="Commune" name="commune" />

          <GridInput type="tel" placeholder="Téléphone" name="phone" />
          <GridInput type="email" placeholder="E-mail" name="email" />

          <GridInput type="number" step="0.000001" placeholder="Latitude" name="latitude" />
          <GridInput type="number" step="0.000001" placeholder="Longitude" name="longitude" />

          <FullWidthInput type="text" placeholder="Adresse complète" name="address" />
        </FormGrid>

        <SubmitButton type="submit">S&apos;inscrire</SubmitButton>
      </Formulaire>
    </AuthLayout>
  );
}