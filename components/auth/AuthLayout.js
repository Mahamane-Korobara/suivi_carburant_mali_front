import Image from 'next/image';
import { Page, Card, Header, Title, FooterDiv } from "@/components/Styles_pages/FormStyles";

export default function AuthLayout({ title, children, footer, wide = false }) {
  return (
    <Page>
      <Header>
        <Image src="/images/logo2.svg" alt="Logo" width={20} height={20} color='white' />
        KARBU - Suivi. Alerte. Réponse
      </Header>

      <Card $wide={wide}>
        {title && <Title>{title}</Title>}
        {children}
      </Card>

      {footer && <FooterDiv>{footer}</FooterDiv>}
    </Page>
  );
}